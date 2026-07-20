import { ImageResponse } from "next/og";
import { site, hero } from "@/content/site";

export const alt = `${site.name} — SaaS, Marketplace & Booking Platform Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          color: "#1c1b18",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#92400e", letterSpacing: 4, textTransform: "uppercase" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 64, marginTop: 24, lineHeight: 1.15, maxWidth: 1000 }}>
          {hero.headline}
        </div>
        <div style={{ fontSize: 64, color: "#92400e", lineHeight: 1.15 }}>{hero.subHeadline}</div>
        <div style={{ fontSize: 26, marginTop: 32, color: "#6b675e" }}>
          Software Engineer ✦ DevOps Engineer ✦ Debugger
        </div>
      </div>
    ),
    { ...size }
  );
}
