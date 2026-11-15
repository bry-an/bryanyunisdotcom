import type { ReactNode } from "react";

/** Off-site link: opens in a new tab and says so to screen readers. */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
