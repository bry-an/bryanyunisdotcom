import { Inline } from "@/lib/markdown";

export function Topics({ items, label = "Topics" }: { items: string[]; label?: string }) {
  return (
    <ul className="topics" aria-label={label}>
      {items.map((t) => (
        <li key={t}>
          <Inline text={t} />
        </li>
      ))}
    </ul>
  );
}
