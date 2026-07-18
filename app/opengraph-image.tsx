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
          background: "#0b0b10",
          color: "#ececf1",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#c8a96e", letterSpacing: 4, textTransform: "uppercase" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 64, marginTop: 24, lineHeight: 1.15, maxWidth: 1000 }}>
          {hero.headline}
        </div>
        <div style={{ fontSize: 64, color: "#c8a96e", lineHeight: 1.15 }}>{hero.subHeadline}</div>
        <div style={{ fontSize: 26, marginTop: 32, color: "#9c9ca8" }}>
          NestJS · Next.js · PostgreSQL · Redis · Docker · React Native
        </div>
      </div>
    ),
    { ...size }
  );
}
