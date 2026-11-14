/**
 * The two marks of the site's through-line, drawn as simple line icons that
 * inherit their color from the surrounding text.
 *   ✦ Sparkle: With AI, the reach to understand more.
 *   ⚖ Balance scale: With experience, the judgment to trust what it finds.
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5l1.7 5.1a2.2 2.2 0 0 0 1.7 1.7l5.1 1.7-5.1 1.7a2.2 2.2 0 0 0-1.7 1.7L12 20.5l-1.7-5.1a2.2 2.2 0 0 0-1.7-1.7L3.5 12l5.1-1.7a2.2 2.2 0 0 0 1.7-1.7z" />
    </svg>
  );
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4v16M8 20h8M4.5 7.5h15" />
      <path d="M4.5 7.5 2.2 13.5M4.5 7.5l2.3 6M2.2 13.5a2.3 2.3 0 0 0 4.6 0Z" />
      <path d="M19.5 7.5l-2.3 6M19.5 7.5l2.3 6M17.2 13.5a2.3 2.3 0 0 0 4.6 0Z" />
    </svg>
  );
}
