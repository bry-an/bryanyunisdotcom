"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNAVAILABLE =
  "The contact form is unavailable right now. Please reach out on LinkedIn instead.";

/**
 * Sends a contact message to the owner's inbox via Resend.
 * The destination address lives only in CONTACT_TO_EMAIL on the server; it is never rendered.
 * Spam defenses: hidden honeypot field + Vercel BotID.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim().slice(0, 200),
    email: String(formData.get("email") ?? "").trim().slice(0, 320),
    message: String(formData.get("message") ?? "").trim().slice(0, 5000),
  };

  // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "Thanks. Your message is on its way." };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!values.name) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  if (values.message.length < 10) fieldErrors.message = "Please write a slightly longer message.";
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    return { status: "error", message: UNAVAILABLE, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "bryanyunis.com <contact@bryanyunis.com>";
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { status: "error", message: UNAVAILABLE, values };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: values.email,
    subject: `bryanyunis.com: message from ${values.name}`,
    text: `${values.message}\n\n— ${values.name} <${values.email}>`,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return { status: "error", message: UNAVAILABLE, values };
  }

  return { status: "success", message: "Thanks. Your message is on its way, and I'll reply by email." };
}
