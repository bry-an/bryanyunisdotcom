"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import styles from "./ContactForm.module.css";

const initial: ContactState = { status: "idle" };

/**
 * Wraps the Server Action so a failed bot-check script (ad blockers, network errors)
 * degrades to a friendly message instead of tripping the error boundary.
 */
async function submit(prev: ContactState, formData: FormData): Promise<ContactState> {
  try {
    return await sendContact(prev, formData);
  } catch {
    return {
      status: "error",
      message: "Your message couldn't be sent. Please try again, or reach out on LinkedIn.",
      values: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      },
    };
  }
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submit, initial);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <p className={styles.success} role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          name="name"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
        />
        {errors.name && <p id="cf-name-err" className={styles.err}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
        />
        {errors.email && <p id="cf-email-err" className={styles.err}>{errors.email}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        {errors.message && <p id="cf-message-err" className={styles.err}>{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill every field. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.actions}>
        <button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}
