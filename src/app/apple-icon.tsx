import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { toArrayBuffer } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: the favicon's "By" monogram (Safari ignores SVG icons). */
async function serifFont() {
  "use cache";
  return new Uint8Array(await readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Regular.ttf")));
}

export default async function AppleIcon() {
  const serif = toArrayBuffer(await serifFont());
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1a17",
          color: "#f4efe6",
          fontFamily: "Instrument Serif",
          fontSize: 118,
          paddingBottom: 12,
        }}
      >
        B<span style={{ color: "#e39a73" }}>y</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
