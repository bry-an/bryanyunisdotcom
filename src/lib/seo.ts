import type { Metadata } from "next";
import headshot from "@/assets/headshot.jpg";
import { gateless, site } from "@/content/profile";
import { plain } from "@/lib/markdown";

/**
 * Page-level `openGraph` replaces the layout's (Next merges metadata shallowly),
 * so every page spreads this base to keep site name and locale.
 */
export const baseOpenGraph = {
  siteName: site.name,
  locale: "en_US",
} satisfies Metadata["openGraph"];

/** Trim to a search-snippet length (~160 chars) on a word boundary. */
export function clip(text: string, max = 160): string {
  const t = plain(text).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max - 1)).replace(/[,;:.\s]+$/, "") + "…";
}

export const abs = (path: string) => new URL(path, site.url).toString();

/* ── Structured data (schema.org JSON-LD) ──────────────────── */

export const ids = {
  person: abs("/#person"),
  website: abs("/#website"),
};

export const personLd = {
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  url: site.url,
  image: abs(headshot.src),
  description: plain(site.description),
  jobTitle: "Technical Lead, Customer Experience",
  worksFor: { "@type": "Organization", name: gateless.name, url: gateless.url },
  sameAs: [site.linkedin],
  knowsAbout: [
    "Software architecture",
    "Product engineering",
    "AI-assisted software development",
    "Distributed systems",
    "Expert systems",
    "Mortgage underwriting technology",
    "Systems integration",
    "Clojure",
    "Svelte",
    "TypeScript",
    "Node.js",
  ],
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  description: plain(site.description),
  inLanguage: "en-US",
  author: { "@id": ids.person },
  publisher: { "@id": ids.person },
};

/** Serialize for a <script type="application/ld+json">, escaping `<` per the Next.js guide. */
export function ldJson(graph: object[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
