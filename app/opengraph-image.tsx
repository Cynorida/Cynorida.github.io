import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Cynorida: managed detection and response, run in the open";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const svg = await readFile(join(process.cwd(), "public/brand/logo.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0b0d10",
          backgroundImage:
            "radial-gradient(circle at 88% 18%, rgba(245, 150, 70, 0.55), transparent 38%), radial-gradient(circle at 76% 70%, rgba(222, 86, 98, 0.4), transparent 40%), radial-gradient(circle at 98% 92%, rgba(27, 109, 133, 0.55), transparent 40%)",
          color: "#f4f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logo} width={Math.round(64 * (3648 / 836))} height={64} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "76px", lineHeight: 1, letterSpacing: "-2.5px", maxWidth: "820px" }}>
            Threat detection and response, run in the open.
          </div>
          <div style={{ fontSize: "28px", color: "#b9bec7", maxWidth: "820px" }}>
            Analysts on shift 24/7/365. Every step visible in a console your team shares with ours.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
