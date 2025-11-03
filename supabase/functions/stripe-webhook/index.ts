import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const ZOOM_LINKS = {
  beginner: "https://zoom.us/j/beginner-class",
  intermediate: "https://zoom.us/j/intermediate-class", 
  advanced: "https://zoom.us/j/advanced-class"
};

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[${timestamp}] [STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

  try {
    logStep("Webhook received");

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No stripe signature found");
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    let event: Stripe.Event;

    if (webhookSecret) {
      // Verify webhook signature in production
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        logStep("Webhook signature verified", { eventType: event.type });
      } catch (err: any) {
        logStep("Webhook signature verification failed", { error: err.message });
        return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      // For development without webhook secret
      event = JSON.parse(body);
      logStep("WARNING: Processing webhook without signature verification", { eventType: event.type });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        logStep("Processing checkout.session.completed", { sessionId: session.id });

        const metadata = session.metadata;
        if (!metadata?.user_id || !metadata?.level_id) {
          throw new Error("Missing required metadata");
        }

        const userId = metadata.user_id;
        const levelId = metadata.level_id;
        const userEmail = metadata.user_email;
        const userName = metadata.user_name;
        const amountPaid = session.amount_total || 0;
        const zoomLink = ZOOM_LINKS[levelId as keyof typeof ZOOM_LINKS] || "";

        // Check if enrollment already exists
        const { data: existingEnrollment } = await supabaseAdmin
          .from("enrollments")
          .select("id")
          .eq("user_id", userId)
          .eq("course_level", levelId)
          .single();

        let enrollmentId: string;

        if (existingEnrollment) {
          // Update existing enrollment
          const { data: updated, error: updateError } = await supabaseAdmin
            .from("enrollments")
            .update({
              payment_status: "paid",
              amount_paid: amountPaid,
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent as string,
              zoom_link: zoomLink,
              enrolled_at: new Date().toISOString(),
            })
            .eq("id", existingEnrollment.id)
            .select()
            .single();

          if (updateError) throw updateError;
          enrollmentId = updated.id;
          logStep("Updated existing enrollment", { enrollmentId });
        } else {
          // Create new enrollment
          const { data: newEnrollment, error: insertError } = await supabaseAdmin
            .from("enrollments")
            .insert({
              user_id: userId,
              course_level: levelId,
              payment_status: "paid",
              amount_paid: amountPaid,
              stripe_session_id: session.id,
              stripe_payment_intent_id: session.payment_intent as string,
              zoom_link: zoomLink,
            })
            .select()
            .single();

          if (insertError) throw insertError;
          enrollmentId = newEnrollment.id;
          logStep("Created new enrollment", { enrollmentId });
        }

        // Log payment success
        await supabaseAdmin.from("payments_log").insert({
          user_id: userId,
          enrollment_id: enrollmentId,
          event_type: "checkout_completed",
          stripe_event_id: event.id,
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          amount: amountPaid,
          currency: session.currency || "usd",
          status: "succeeded",
          metadata: {
            level: levelId,
            user_email: userEmail,
            user_name: userName
          }
        });

        // Send confirmation email
        try {
          await resend.emails.send({
            from: "Hub365 <onboarding@resend.dev>",
            to: [userEmail],
            subject: "Welcome to Hub365 - Your Enrollment is Confirmed!",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #4F46E5;">Welcome to Hub365, ${userName}!</h1>
                <p>Congratulations! Your enrollment in the <strong>${levelId.charAt(0).toUpperCase() + levelId.slice(1)}</strong> course has been confirmed.</p>
                
                <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0;">Course Details</h2>
                  <p><strong>Level:</strong> ${levelId.charAt(0).toUpperCase() + levelId.slice(1)}</p>
                  <p><strong>Duration:</strong> 12 weeks</p>
                  <p><strong>Schedule:</strong> Mon, Wed, Fri - 90 mins each</p>
                  <p><strong>Amount Paid:</strong> $${(amountPaid / 100).toFixed(2)}</p>
                </div>

                <div style="background-color: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h2 style="margin-top: 0; color: #4F46E5;">Join Your Live Classes</h2>
                  <p>Click the button below to access your Zoom classroom:</p>
                  <a href="${zoomLink}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0;">
                    Open Zoom Classroom
                  </a>
                  <p style="font-size: 14px; color: #6B7280;">Zoom Link: ${zoomLink}</p>
                </div>

                <h3>What's Next?</h3>
                <ul style="color: #374151;">
                  <li>Check your email for course materials and schedule details</li>
                  <li>Join the Zoom link 5 minutes before your first class</li>
                  <li>Access recorded sessions and assignments in your dashboard</li>
                </ul>

                <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                  If you have any questions, reply to this email or contact us at 
                  <a href="mailto:info@hub365.com">info@hub365.com</a>
                </p>

                <p style="margin-top: 30px;">
                  Best regards,<br>
                  The Hub365 Team
                </p>
              </div>
            `,
          });

          // Mark email as sent
          await supabaseAdmin
            .from("enrollments")
            .update({ confirmation_email_sent: true })
            .eq("id", enrollmentId);

          logStep("Confirmation email sent", { to: userEmail });
        } catch (emailError: any) {
          logStep("Email sending failed", { error: emailError.message });
          // Don't fail the webhook if email fails
        }

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep("Processing payment_intent.succeeded", { 
          paymentIntentId: paymentIntent.id 
        });

        // Log the successful payment
        await supabaseAdmin.from("payments_log").insert({
          event_type: "payment_succeeded",
          stripe_event_id: event.id,
          stripe_payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: "succeeded",
          metadata: paymentIntent.metadata
        });

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep("Processing payment_intent.payment_failed", { 
          paymentIntentId: paymentIntent.id 
        });

        // Log the failed payment
        await supabaseAdmin.from("payments_log").insert({
          event_type: "payment_failed",
          stripe_event_id: event.id,
          stripe_payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: "failed",
          error_message: paymentIntent.last_payment_error?.message || "Payment failed",
          metadata: paymentIntent.metadata
        });

        break;
      }

      default:
        logStep("Unhandled event type", { eventType: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    logStep("ERROR in webhook handler", { 
      message: error.message, 
      stack: error.stack 
    });

    // Log the error
    try {
      await supabaseAdmin.from("payments_log").insert({
        event_type: "webhook_error",
        status: "failed",
        error_message: error.message,
        metadata: { stack: error.stack }
      });
    } catch (logError) {
      logStep("Failed to log error", { error: logError });
    }

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});