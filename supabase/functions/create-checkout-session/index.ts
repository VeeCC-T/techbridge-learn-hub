import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COURSE_PRICES = {
  beginner: { amount: 250, name: "Beginner" },
  intermediate: { amount: 350, name: "Intermediate" },
  advanced: { amount: 550, name: "Advanced" },
};

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[${timestamp}] [CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user?.email) {
      logStep("Authentication failed", { error: userError?.message });
      throw new Error("User not authenticated");
    }

    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const { user_email, user_name, level_id } = await req.json();
    const courseLevel = level_id?.toLowerCase();

    if (!courseLevel || !COURSE_PRICES[courseLevel as keyof typeof COURSE_PRICES]) {
      throw new Error("Invalid course level");
    }

    const levelInfo = COURSE_PRICES[courseLevel as keyof typeof COURSE_PRICES];
    logStep("Course level validated", { level: courseLevel, amount: levelInfo.amount });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    let customerId;
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing Stripe customer", { customerId });
      }
    } catch (error: any) {
      logStep("Could not list customers (continuing anyway)", { error: error.message });
    }

    // Get app base URL from request origin
    const origin = req.headers.get("origin") || Deno.env.get("APP_BASE_URL") || "http://localhost:5173";
    
    logStep("Creating Stripe checkout session", { origin });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Hub365 ${levelInfo.name} Course`,
              description: `12-week ${courseLevel} level software development course`,
            },
            unit_amount: levelInfo.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/courses`,
      metadata: {
        user_id: user.id,
        user_email: user_email || user.email,
        user_name: user_name || user.user_metadata?.full_name || user.email,
        level_id: courseLevel,
      },
    });

    logStep("Checkout session created successfully", { 
      sessionId: session.id,
      amount: session.amount_total 
    });

    // Log the session creation in payments_log
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseAdmin.from("payments_log").insert({
      user_id: user.id,
      event_type: "checkout_session_created",
      stripe_session_id: session.id,
      amount: levelInfo.amount * 100,
      currency: "usd",
      status: "pending",
      metadata: {
        level: courseLevel,
        user_email: user.email,
        user_name: user_name
      }
    });

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    logStep("ERROR", { message: error.message, stack: error.stack });
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});