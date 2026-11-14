import { Fragment, type ReactNode } from "react";

/** Inline: **strong** and *emphasis* — all the copy needs. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Strips inline Markdown markers, for plain-text contexts (titles, meta, aria). */
export function plain(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}

/** Renders a single line of inline Markdown. */
export function Inline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

/** Paragraph-level Markdown: blank-line separated paragraphs. */
export function Markdown({ source }: { source: string }) {
  return (
    <>
      {source
        .trim()
        .split(/\n\s*\n/)
        .map((para, i) => (
          <p key={i}>{inline(para.replace(/\s*\n\s*/g, " "))}</p>
        ))}
    </>
  );
}

/** First paragraph as plain text (for meta descriptions). */
export function firstParagraph(source: string) {
  return plain(source.trim().split(/\n\s*\n/)[0]);
}
