"use client";

import { useEffect } from "react";
import { SYSTEM_SCHEME, THEME_KEY as KEY } from "@/lib/theme";
import styles from "./SiteHeader.module.css";

type Override = "light" | "dark" | null;

const meta = () => document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
const systemDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const parse = (v: string | null): Override => (v === "light" || v === "dark" ? v : null);

/** What the visitor sees right now: the override if there is one, else the system. */
function renderedDark() {
  const v = parse(meta()?.content ?? null);
  return v ? v === "dark" : systemDark();
}

function apply(value: Override) {
  const m = meta();
  if (m) m.content = value ?? SYSTEM_SCHEME;
}

/**
 * Two-state toggle over three stored states (system / light / dark): it flips what's
 * on screen, and flipping back to the system's scheme clears the override instead of
 * pinning it. Which icon and label show is decided by CSS, so nothing depends on
 * hydration and it stays right when the system preference changes.
 */
export function ThemeToggle() {
  // Keep tabs in sync when the override changes elsewhere.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY || e.key === null) apply(parse(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const wantDark = !renderedDark();
    // Matching the system means the visitor is undoing their adjustment: forget it.
    const value: Override = wantDark === systemDark() ? null : wantDark ? "dark" : "light";
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch {}
    apply(value);
  }

  return (
    <button type="button" className={styles.themeToggle} onClick={toggle}>
      {/* Moon: shown in light mode */}
      <span className={styles.moon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
        </svg>
        <span className="visually-hidden">Switch to dark theme</span>
      </span>
      {/* Sun: shown in dark mode */}
      <span className={styles.sun}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
        <span className="visually-hidden">Switch to light theme</span>
      </span>
    </button>
  );
}
