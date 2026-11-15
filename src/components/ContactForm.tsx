"use client";

import { useActionState, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import styles from "./ContactForm.module.css";

type Field = "name" | "email" | "message";
type Control = HTMLInputElement | HTMLTextAreaElement;

const initial: ContactState = { status: "idle" };

/** Same wording as the server's checks, so client and server errors read alike. */
const MESSAGES: Record<Field, string> = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  message: "Please write a slightly longer message.",
};

const isField = (n: string): n is Field => n === "name" || n === "email" || n === "message";

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
  const formRef = useRef<HTMLFormElement>(null);

  // Client-side verdicts from native validation, applied only after interaction
  // (:user-invalid). `null` means "checked and fine", which also clears a stale
  // server error once the visitor fixes the field.
  // Verdicts are tagged with the action result they belong to, so a fresh server
  // result supersedes them without a reset effect.
  const [verdicts, setVerdicts] = useState<{
    for: ContactState;
    v: Partial<Record<Field, string | null>>;
  }>({ for: initial, v: {} });
  const client = verdicts.for === state ? verdicts.v : {};
  const setField = (f: Field, value: string | null) =>
    setVerdicts((prev) => ({ for: state, v: { ...(prev.for === state ? prev.v : {}), [f]: value } }));
  const [announcement, setAnnouncement] = useState("");
  const announceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const server = state.fieldErrors ?? {};
  const errorFor = (f: Field) => (client[f] !== undefined ? client[f] ?? undefined : server[f]);

  // After a server-side rejection, move focus to the first rejected field so its
  // error is read out.
  useEffect(() => {
    if (state.fieldErrors) {
      formRef.current?.querySelector<Control>('[aria-invalid="true"]')?.focus();
    }
  }, [state]);

  useEffect(() => () => clearTimeout(announceTimer.current), []);

  /** Flags a field the browser now considers :user-invalid (never clears). */
  function flag(el: Control, announce: boolean) {
    if (!isField(el.name) || !el.matches(":user-invalid")) return;
    const name = el.name;
    if (announce && !errorFor(name)) {
      // One polite region; wait so it doesn't talk over the field that gets focus next.
      clearTimeout(announceTimer.current);
      setAnnouncement("");
      const label = el.labels?.[0]?.textContent ?? "";
      announceTimer.current = setTimeout(() => setAnnouncement(`${label}: ${MESSAGES[name]}`), 500);
    }
    setField(name, MESSAGES[name]);
  }

  // Show/announce on blur, clear while typing once the value passes, and mark every
  // failing field when a submit is blocked (the browser focuses the first one).
  const onBlur = (e: SyntheticEvent<HTMLFormElement>) => flag(e.target as Control, true);
  const onInput = (e: SyntheticEvent<HTMLFormElement>) => {
    const el = e.target as Control;
    if (isField(el.name) && errorFor(el.name) && !el.matches(":user-invalid")) {
      setField(el.name, null);
    }
  };
  const onInvalid = (e: SyntheticEvent<HTMLFormElement>) => flag(e.target as Control, false);

  const status = state.status === "idle" ? "" : (state.message ?? "");

  return (
    <div className={styles.wrap}>
      {state.status !== "success" && (
        <form
          ref={formRef}
          action={formAction}
          className={styles.form}
          onBlur={onBlur}
          onInput={onInput}
          onInvalidCapture={onInvalid}
        >
          <div className={styles.field}>
            <label htmlFor="cf-name">Name</label>
            <input
              id="cf-name"
              name="name"
              autoComplete="name"
              required
              maxLength={200}
              defaultValue={state.values?.name}
              aria-invalid={errorFor("name") ? true : false}
              aria-describedby={errorFor("name") ? "cf-name-err" : undefined}
            />
            {errorFor("name") && <p id="cf-name-err" className={styles.err}>{errorFor("name")}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-email">Email</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              required
              maxLength={320}
              defaultValue={state.values?.email}
              aria-invalid={errorFor("email") ? true : false}
              aria-describedby={errorFor("email") ? "cf-email-err" : undefined}
            />
            {errorFor("email") && <p id="cf-email-err" className={styles.err}>{errorFor("email")}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              rows={6}
              required
              minLength={10}
              maxLength={5000}
              defaultValue={state.values?.message}
              aria-invalid={errorFor("message") ? true : false}
              aria-describedby={errorFor("message") ? "cf-message-err" : undefined}
            />
            {errorFor("message") && (
              <p id="cf-message-err" className={styles.err}>{errorFor("message")}</p>
            )}
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
          </div>
        </form>
      )}

      {/* Always in the page, so both errors and the success message are announced. */}
      <p className={state.status === "success" ? styles.success : styles.status} role="status">
        {status}
      </p>
      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
