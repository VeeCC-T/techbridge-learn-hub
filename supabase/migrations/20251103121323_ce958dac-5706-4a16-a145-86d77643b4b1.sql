-- Create payments_log table for tracking all payment events
CREATE TABLE IF NOT EXISTS public.payments_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  stripe_event_id text,
  stripe_session_id text,
  stripe_payment_intent_id text,
  amount integer,
  currency text DEFAULT 'usd',
  status text NOT NULL,
  metadata jsonb,
  error_message text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create index on stripe_session_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_log_session_id ON public.payments_log(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_payments_log_user_id ON public.payments_log(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_log_created_at ON public.payments_log(created_at DESC);

-- Enable RLS on payments_log
ALTER TABLE public.payments_log ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment logs
CREATE POLICY "Users can view their own payment logs"
  ON public.payments_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- Add zoom_reg_id column to enrollments if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'enrollments' 
    AND column_name = 'zoom_reg_id'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN zoom_reg_id text;
  END IF;
END $$;

-- Add session_id column to enrollments for tracking
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'enrollments' 
    AND column_name = 'stripe_session_id'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN stripe_session_id text;
  END IF;
END $$;

-- Create index on stripe_session_id
CREATE INDEX IF NOT EXISTS idx_enrollments_session_id ON public.enrollments(stripe_session_id);

-- Update enrollments table to add more detailed status tracking
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'enrollments' 
    AND column_name = 'confirmation_email_sent'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN confirmation_email_sent boolean DEFAULT false;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'enrollments' 
    AND column_name = 'zoom_registered'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN zoom_registered boolean DEFAULT false;
  END IF;
END $$;