import { createHash } from "crypto";

import type { ContactInput } from "./contact.schema";

export type ContactResult = { ok: true } | { ok: false; code: "duplicate" | "rate_limited" };

function fingerprintOf(input: ContactInput) {
  return createHash("sha256")
    .update(
      [input.email.toLowerCase(), input.subject.toLowerCase(), input.message.trim()].join("::"),
    )
    .digest("hex");
}

const RATE_WINDOW_MINUTES = 5;
const RATE_LIMIT = 3;

export async function saveContactMessage(input: ContactInput): Promise<ContactResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const email = input.email.trim().toLowerCase();
  const clientHint = createHash("sha256").update(email).digest("hex").slice(0, 32);
  const since = new Date(Date.now() - RATE_WINDOW_MINUTES * 60_000).toISOString();

  const { count, error: countError } = await supabaseAdmin
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("client_hint", clientHint)
    .gte("created_at", since);

  if (countError) throw new Error("Could not verify submission rate");
  if ((count ?? 0) >= RATE_LIMIT) return { ok: false, code: "rate_limited" };

  const { error } = await supabaseAdmin.from("contact_messages").insert({
    name: input.name.trim(),
    email,
    subject: input.subject.trim(),
    message: input.message.trim(),
    fingerprint: fingerprintOf({ ...input, email }),
    client_hint: clientHint,
  });

  if (error) {
    if (error.code === "23505") return { ok: false, code: "duplicate" };
    throw new Error("Could not save your message");
  }

  return { ok: true };
}
