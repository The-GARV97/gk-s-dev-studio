import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  subject: z.string().trim().min(3, "Add a short subject").max(150, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more (20 characters minimum)")
    .max(2000, "Message is too long"),
  // Honeypot: must stay empty. Bots usually fill it in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
