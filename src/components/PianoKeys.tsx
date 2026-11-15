import type { CSSProperties } from "react";
import styles from "./PianoKeys.module.css";

const OCTAVES = 3;
const WHITE = OCTAVES * 7;
// Black keys sit after C, D, F, G, A in each octave.
const BLACK_AFTER = [0, 1, 3, 4, 5];

/**
 * Decorative keyboard: white keys with accent-colored "black" keys.
 * Horizontal by default; the parent can turn it vertical (see .vertical),
 * where it stretches to fill whatever length it's given.
 */
export function PianoKeys({ className }: { className?: string }) {
  const black: number[] = [];
  for (let o = 0; o < OCTAVES; o++) for (const i of BLACK_AFTER) black.push(o * 7 + i + 1);

  return (
    <div
      className={`${styles.keys} ${className ?? ""}`}
      style={{ "--n": WHITE } as CSSProperties}
      aria-hidden="true"
    >
      {Array.from({ length: WHITE }, (_, i) => (
        <span key={`w${i}`} className={styles.white} />
      ))}
      {black.map((i) => (
        <span key={`b${i}`} className={styles.black} style={{ "--p": i / WHITE } as CSSProperties} />
      ))}
    </div>
  );
}
