CREATE TABLE public.contact_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  fingerprint text NOT NULL,
  client_hint text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX contact_messages_fingerprint_key ON public.contact_messages (fingerprint);
CREATE INDEX contact_messages_client_hint_created_at_idx ON public.contact_messages (client_hint, created_at DESC);

GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (false);