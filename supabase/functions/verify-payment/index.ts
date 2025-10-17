import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ZOOM_LINKS = {
  beginner: "https://zoom.us/j/beginner-class",
  intermediate: "https://zoom.us/j/intermediate-class",
  advanced: "https://zoom.us/j/advanced-class",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid" && session.metadata) {
      const courseLevel = session.metadata.courseLevel;
      const amountPaid = session.amount_total || 0;

      // Check if enrollment already exists
      const { data: existingEnrollment } = await supabaseClient
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_level", courseLevel)
        .single();

      if (!existingEnrollment) {
        // Create enrollment record
        const { error: enrollError } = await supabaseClient
          .from("enrollments")
          .insert({
            user_id: user.id,
            course_level: courseLevel,
            payment_status: "completed",
            stripe_payment_intent_id: session.payment_intent as string,
            amount_paid: amountPaid,
            zoom_link: ZOOM_LINKS[courseLevel as keyof typeof ZOOM_LINKS],
          });

        if (enrollError) {
          console.error("Error creating enrollment:", enrollError);
          throw enrollError;
        }
      }

      return new Response(JSON.stringify({ 
        success: true, 
        courseLevel,
        zoomLink: ZOOM_LINKS[courseLevel as keyof typeof ZOOM_LINKS]
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false,
        message: "Payment not completed"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
