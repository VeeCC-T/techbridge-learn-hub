# Hub365 Stripe Payment System - Setup Guide

## Overview
The Hub365 payment system is now production-ready with Stripe integration, automated enrollment processing, email confirmations, and comprehensive logging.

## 🚀 What's Been Implemented

### Backend (Edge Functions)
1. **create-checkout-session** - Creates Stripe Checkout sessions for course enrollment
2. **stripe-webhook** - Handles Stripe webhook events (payment confirmation, enrollment creation, email sending)
3. **verify-session** - Verifies payment status and retrieves enrollment data

### Database
- **enrollments** table - Enhanced with session tracking, Zoom registration, and email confirmation flags
- **payments_log** table - Comprehensive logging of all payment events
- Proper indexes and RLS policies for security

### Frontend
- Updated enrollment flow with single "Enroll" button per level
- New payment success page with polling for webhook completion
- Opens Stripe Checkout in new tab for better UX

## 📋 Required Setup Steps

### 1. Stripe Webhook Configuration
**CRITICAL**: You must set up a Stripe webhook endpoint to receive payment events.

#### Production Setup:
1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "+ Add endpoint"
3. Enter your webhook URL: `https://xlumyobcdjmhwymverhr.supabase.co/functions/v1/stripe-webhook`
4. Select these events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. **Copy the "Signing secret"** (starts with `whsec_`)

#### Add the Webhook Secret:
You need to add the `STRIPE_WEBHOOK_SECRET` to your Lovable Cloud secrets:
1. The secret has already been requested but you need to provide the value
2. Paste the webhook signing secret from Stripe (the `whsec_` value)

#### Development/Testing:
For local testing with Stripe CLI:
```bash
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
# Copy the webhook signing secret shown
```

### 2. Current Configuration Status

✅ **Already Configured:**
- STRIPE_SECRET_KEY
- RESEND_API_KEY (for emails)
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

⚠️ **Needs Configuration:**
- STRIPE_WEBHOOK_SECRET (see above)

### 3. Zoom Integration (Optional - Phase 2)
The system includes placeholders for Zoom registration. To enable:
1. Set up Zoom OAuth app or JWT app
2. Add secrets: `ZOOM_API_KEY`, `ZOOM_API_SECRET`
3. Update webhook handler to call Zoom API for meeting registration
4. For now, static Zoom links are used per level

### 4. Email Configuration
Currently using Resend with the existing API key. Emails sent:
- **Welcome Email** - Sent immediately after successful payment
- Includes course details, Zoom link, and next steps
- Sent to user's email address

To switch to SendGrid (optional):
1. Add `SENDGRID_API_KEY` secret
2. Update the webhook handler to use SendGrid SDK instead of Resend

## 🧪 Testing the Payment Flow

### Test Mode (Before Production)
1. Use Stripe test mode keys
2. Test card: `4242 4242 4242 4242`, any future expiry, any CVV
3. Check that:
   - Checkout session opens in new tab
   - Payment completes successfully
   - Webhook is called (check edge function logs)
   - Enrollment is created in database
   - Email is sent
   - Success page shows enrollment details

### Monitoring
Check logs in:
- **Edge Function Logs**: Lovable Cloud → Functions → View logs
- **Payments Log Table**: Query `payments_log` table for all events
- **Stripe Dashboard**: Events tab to see webhook delivery status

## 📊 Database Schema

### enrollments table (enhanced)
- `id` - UUID primary key
- `user_id` - References auth.users
- `course_level` - beginner/intermediate/advanced
- `payment_status` - pending/paid
- `amount_paid` - Amount in cents
- `stripe_session_id` - Checkout session ID
- `stripe_payment_intent_id` - Payment intent ID
- `zoom_link` - Zoom meeting link
- `zoom_reg_id` - Zoom registration ID (future)
- `confirmation_email_sent` - Boolean flag
- `zoom_registered` - Boolean flag
- `enrolled_at` - Timestamp

### payments_log table (new)
- `id` - UUID primary key  
- `user_id` - References auth.users
- `enrollment_id` - References enrollments
- `event_type` - Type of event (checkout_session_created, checkout_completed, payment_succeeded, etc.)
- `stripe_event_id` - Stripe event ID
- `stripe_session_id` - Session ID
- `stripe_payment_intent_id` - Payment intent ID
- `amount` - Amount in cents
- `currency` - Currency code
- `status` - succeeded/failed/pending
- `metadata` - JSONB for additional data
- `error_message` - Error details if failed
- `created_at` - Timestamp

## 🔒 Security Features

1. **RLS Policies**: All tables have proper row-level security
2. **JWT Verification**: Checkout and verify endpoints require authentication
3. **Webhook Signature Verification**: Stripe webhook validates request signatures
4. **Secure Secrets**: All API keys stored in Lovable Cloud secrets
5. **Input Validation**: All user inputs validated before processing

## 🐛 Troubleshooting

### Webhook Not Firing
- Check Stripe Dashboard → Webhooks → Event logs
- Verify webhook URL is correct
- Ensure `verify_jwt = false` is set for stripe-webhook in config.toml

### Enrollment Not Created
- Check edge function logs for errors
- Verify metadata is being passed correctly from checkout
- Check RLS policies on enrollments table

### Email Not Sending
- Check Resend dashboard for delivery status
- Verify RESEND_API_KEY is valid
- Check edge function logs for email errors
- Emails don't fail the webhook - enrollment still created

### Payment Success Page Shows "Processing"
- This means webhook hasn't completed yet (normal for first few seconds)
- Check webhook was received by Stripe
- Verify no errors in stripe-webhook edge function logs

## 🚀 Next Steps / Phase 2

1. **PayPal Integration** (if needed)
   - Add PayPal SDK
   - Create paypal-checkout edge function
   - Update frontend to show PayPal button option

2. **Zoom Auto-Registration**
   - Obtain Zoom API credentials
   - Implement meeting registration in webhook
   - Store zoom_reg_id for tracking

3. **Admin Dashboard** (basic structure created)
   - View all enrollments
   - Process refunds
   - View payment logs
   - Student management

4. **Advanced Features**
   - Installment plans
   - Coupon codes
   - Referral system
   - Course bundle discounts

## 📞 Support

For issues or questions:
- Email: info@hub365.com
- Check edge function logs in Lovable Cloud
- Review Stripe Dashboard for payment events

---

## Quick Reference: Edge Function URLs

- Create Checkout: `https://xlumyobcdjmhwymverhr.supabase.co/functions/v1/create-checkout-session`
- Stripe Webhook: `https://xlumyobcdjmhwymverhr.supabase.co/functions/v1/stripe-webhook` ⚠️ Use this for Stripe webhook config
- Verify Session: `https://xlumyobcdjmhwymverhr.supabase.co/functions/v1/verify-session`

**Remember**: Always use HTTPS URLs for production webhooks!