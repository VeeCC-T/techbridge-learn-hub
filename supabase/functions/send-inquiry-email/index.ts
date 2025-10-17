import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: InquiryRequest = await req.json();

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "TechBridge <onboarding@resend.dev>",
      to: ["info@techbridge.com"],
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation to user
    const userEmail = await resend.emails.send({
      from: "TechBridge <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting TechBridge!",
      html: `
        <h1>Thank you for contacting TechBridge!</h1>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Your message:</p>
        <p><em>${message}</em></p>
        <br>
        <p>Best regards,<br>The TechBridge Team</p>
      `,
    });

    console.log("Emails sent successfully:", { adminEmail, userEmail });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
