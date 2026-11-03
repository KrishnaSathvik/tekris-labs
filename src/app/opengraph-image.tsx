import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/layout/LogoMark";
import { SHARE_IMAGE, SITE_NAME } from "@/lib/site";

export const alt = SHARE_IMAGE.alt;
export const size = { width: SHARE_IMAGE.width, height: SHARE_IMAGE.height };
export const contentType = "image/png";

const INK = "#0a0a0a";
const MUTED = "#525252";

export default async function OpengraphImage() {
  const assets = join(process.cwd(), "assets");
  const [bold, medium, regular, mono, art] = await Promise.all([
    readFile(join(assets, "fonts/Geist-Bold.ttf")),
    readFile(join(assets, "fonts/Geist-Medium.ttf")),
    readFile(join(assets, "fonts/Geist-Regular.ttf")),
    readFile(join(assets, "fonts/GeistMono-Medium.ttf")),
    readFile(join(assets, "og-art.jpg")),
  ]);
  const artSrc = `data:image/jpeg;base64,${art.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#ffffff",
          fontFamily: "Geist",
          color: INK,
        }}
      >
        <img
          src={artSrc}
          alt=""
          width={640}
          height={640}
          style={{ position: "absolute", right: -40, top: -5 }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 760,
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, #ffffff 0%, #ffffff 78%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 680,
            height: "100%",
            padding: "72px 0 64px 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LogoMark className="" width={40} height={28} style={{ color: INK }} />
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.6 }}>
              {SITE_NAME}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: -4.5,
                lineHeight: 1,
              }}
            >
              <span style={{ marginRight: 16 }}>Tekris</span>
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #4f46e5, #7c3aed 55%, #0369a1)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Labs
              </span>
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: -0.9,
                lineHeight: 1.2,
              }}
            >
              Thoughtful software, built for real use.
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 23,
                fontWeight: 400,
                color: MUTED,
                lineHeight: 1.45,
                maxWidth: 540,
              }}
            >
              AI tools, developer products, and practical software designed to solve real problems.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 20,
              fontWeight: 500,
              color: MUTED,
              letterSpacing: 0.4,
            }}
          >
            tekrislabs.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
