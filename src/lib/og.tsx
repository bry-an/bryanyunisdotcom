import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared look for social share cards: the site's light palette and type. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const C = { bg: "#f4efe6", ink: "#1c1a17", ink2: "#4a443c", muted: "#6a6257", accent: "#b8461b", rule: "#d5cbba" };

/** Cached so the share-card routes can prerender at build time (Cache Components). */
async function fontBytes() {
  "use cache";
  const dir = join(process.cwd(), "src/assets/fonts");
  const [serif, sans] = await Promise.all([
    readFile(join(dir, "InstrumentSerif-Regular.ttf")),
    readFile(join(dir, "Inter-Medium.otf")),
  ]);
  return { serif: new Uint8Array(serif), sans: new Uint8Array(sans) };
}

/** The cache hands back plain bytes; the renderer wants ArrayBuffers. */
export const toArrayBuffer = (b: Uint8Array) =>
  b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

async function fonts() {
  const { serif, sans } = await fontBytes();
  return [
    { name: "Instrument Serif", data: toArrayBuffer(serif), style: "normal" as const, weight: 400 as const },
    { name: "Inter", data: toArrayBuffer(sans), style: "normal" as const, weight: 500 as const },
  ];
}

export async function shareCard({
  eyebrow,
  title,
  subtitle,
  titleSize = 92,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  titleSize?: number;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: C.bg,
          color: C.ink,
          fontFamily: "Inter",
          borderBottom: `14px solid ${C.accent}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: C.muted }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", width: 64, height: 4, background: C.ink }} />
          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 34, lineHeight: 1.3, color: C.accent, maxWidth: 960 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: C.ink2 }}>
          <span>Bryan Yunis</span>
          <span>bryanyunis.com</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
