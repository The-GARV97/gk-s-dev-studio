import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { NeuButton, NeuChip, NeuSurface, SectionHeading } from "@/components/neu/Neu";
import { Reveal, Screen } from "@/components/Screen";
import { profile } from "@/data/portfolio";
import { contactSchema, type ContactInput } from "@/lib/contact.schema";
import { submitContactMessage } from "@/lib/contact.functions";
import { useAppMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const socialIcons: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        {hint ? <span className="text-[11px] text-muted-foreground">{hint}</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
      <AnimatePresence>
        {error ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-destructive"
            role="alert"
          >
            <AlertCircle className="size-3.5" aria-hidden />
            {error}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </label>
  );
}

const inputClass =
  "neu-inset w-full rounded-2xl bg-input px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground";

export function ContactScreen() {
  const { reduced } = useAppMotion();
  const send = useServerFn(submitContactMessage);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [lastSent, setLastSent] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    const signature = `${values.email}|${values.subject}|${values.message}`.toLowerCase();
    if (signature === lastSent) {
      setStatus("error");
      setFeedback("You already sent this message. Change something before sending again.");
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const result = await send({ data: values });
      if (result.ok) {
        setStatus("success");
        setFeedback("Message received. I'll get back to you soon.");
        setLastSent(signature);
        reset();
      } else if (result.code === "duplicate") {
        setStatus("error");
        setFeedback("This exact message was already submitted.");
      } else {
        setStatus("error");
        setFeedback("Too many messages in a short window. Please try again in a few minutes.");
      }
    } catch {
      setStatus("error");
      setFeedback("Something went wrong sending your message. Please try again.");
    }
  };

  const busy = status === "sending" || isSubmitting;

  return (
    <Screen>
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk about your problem."
          description="Tell me what you're building and where it's stuck. Contact details below are editable placeholders."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <NeuSurface padded="lg">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    className={inputClass}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>

              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject")}
                  className={inputClass}
                  placeholder="What's this about?"
                  aria-invalid={!!errors.subject}
                />
              </Field>

              <Field label="Message" hint="20–2000 characters" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={6}
                  className={cn(inputClass, "resize-none")}
                  placeholder="Describe the problem, the constraints, and what a good outcome looks like."
                  aria-invalid={!!errors.message}
                />
              </Field>

              {/* Honeypot field — hidden from humans, catches simple bots */}
              <div className="hidden" aria-hidden>
                <label>
                  Company
                  <input {...register("company")} tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <NeuButton type="submit" variant="primary" size="lg" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden />
                      Send message
                    </>
                  )}
                </NeuButton>

                <AnimatePresence mode="wait">
                  {status === "success" || status === "error" ? (
                    <motion.p
                      key={status + feedback}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      aria-live="polite"
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        status === "success" ? "text-signal-foreground dark:text-signal" : "text-destructive",
                      )}
                    >
                      {status === "success" ? (
                        <CheckCircle2 className="size-4" aria-hidden />
                      ) : (
                        <AlertCircle className="size-4" aria-hidden />
                      )}
                      {feedback}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </form>
          </NeuSurface>
        </Reveal>

        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <NeuSurface padded="lg">
              <h2 className="text-lg font-semibold tracking-tight">Direct</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="neu-inset flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:text-primary"
                  >
                    <Mail className="size-4 text-primary" aria-hidden />
                    <span className="font-mono text-xs sm:text-sm">{profile.email}</span>
                  </a>
                </li>
                <li className="neu-inset flex items-center gap-3 rounded-2xl px-4 py-3">
                  <MapPin className="size-4 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{profile.location}</span>
                </li>
              </ul>
            </NeuSurface>

            <NeuSurface padded="lg" className="flex-1">
              <h2 className="text-lg font-semibold tracking-tight">Elsewhere</h2>
              <ul className="mt-4 space-y-3">
                {profile.socials.map((social) => {
                  const Icon = socialIcons[social.label] ?? Send;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="neu-inset flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm transition-colors hover:text-primary"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="size-4 text-primary" aria-hidden />
                          {social.label}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {social.handle}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <NeuChip>{profile.status.toLowerCase()}</NeuChip>
                <NeuChip>replies within a few days</NeuChip>
              </div>
            </NeuSurface>
          </div>
        </Reveal>
      </div>
    </Screen>
  );
}
