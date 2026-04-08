import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Artemis II Live Tracker — NASA Moon Mission 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #040e24 0%, #0b3d91 60%, #061f4a 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Star dots */}
        {[
          [8,12],[18,55],[28,8],[42,75],[55,30],[68,88],[78,15],[88,62],[95,40],
          [12,88],[33,44],[50,92],[72,5],[85,77],[96,25],
        ].map(([x, y], i) => (
          <div key={i} style={{
            position: "absolute", left: `${x}%`, top: `${y}%`,
            width: 3, height: 3, borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
          }} />
        ))}

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            background: "rgba(74,158,255,0.15)",
            border: "1px solid rgba(74,158,255,0.4)",
            borderRadius: "4px", padding: "6px 16px",
            color: "#22c55e", fontSize: "14px", letterSpacing: "0.2em",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            MISSION ACTIVE
          </div>
          <div style={{ color: "rgba(200,211,232,0.5)", fontSize: "13px", letterSpacing: "0.15em" }}>
            NASA · ARTEMIS PROGRAM · APRIL 2026
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ color: "rgba(200,211,232,0.6)", fontSize: "18px", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            First Crewed Lunar Flyby Since Apollo 17 · 1972
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <span style={{
              fontSize: "96px", fontWeight: 900, color: "white",
              letterSpacing: "-2px", lineHeight: 1,
              textShadow: "0 0 40px rgba(74,158,255,0.8)",
            }}>
              ARTEMIS
            </span>
            <span style={{
              fontSize: "96px", fontWeight: 900,
              color: "#4a9eff", letterSpacing: "-2px", lineHeight: 1,
              textShadow: "0 0 40px rgba(74,158,255,1)",
            }}>
              II
            </span>
          </div>
          <div style={{ color: "#4a9eff", fontSize: "24px", letterSpacing: "0.1em" }}>
            LIVE TRACKER — REAL-TIME TELEMETRY
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "LAUNCH", val: "APR 1" },
            { label: "SPLASHDOWN", val: "APR 10" },
            { label: "CREW", val: "4 ASTRONAUTS" },
            { label: "DISTANCE", val: "252,760 MI" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(74,158,255,0.1)",
              border: "1px solid rgba(74,158,255,0.25)",
              borderRadius: "4px", padding: "12px 20px",
              display: "flex", flexDirection: "column", gap: "4px",
            }}>
              <div style={{ color: "rgba(107,127,160,0.9)", fontSize: "11px", letterSpacing: "0.2em" }}>{s.label}</div>
              <div style={{ color: "white", fontSize: "18px", fontWeight: 700, letterSpacing: "0.05em" }}>{s.val}</div>
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end" }}>
            <div style={{ color: "rgba(107,127,160,0.6)", fontSize: "13px" }}>kjrlabs.in</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
