import { ImageResponse } from "next/og";

export const alt = "Apti Test - Know Your Potential";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "50px 60px",
          backgroundColor: "#0A0F1D",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26, 115, 232, 0.25) 0%, rgba(10, 15, 29, 0) 70%)",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "#1A73E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
                Apti<span style={{ color: "#38BDF8" }}>Test</span>
              </span>
              <span style={{ fontSize: "12px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>
                Know Your Potential
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(26, 115, 232, 0.15)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38BDF8",
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            #WtsUrAptitude
          </div>
        </div>

        {/* Main Content Hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#38BDF8",
              fontSize: "15px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Fast 2-Minute Cognitive & Vocational Evaluation
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#F8FAFC",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Discover Your Mind Archetype & Ideal Stream
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              lineHeight: 1.4,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Benchmark your logical, spatial, and numerical strengths. Find your optimal +2 Higher Secondary academic stream (Science, Commerce, or Humanities).
          </p>
        </div>

        {/* Bottom Feature Badges & URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {["Science", "Commerce", "Humanities", "16 Mind Archetypes"].map((item, idx) => (
              <span
                key={idx}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#CBD5E1",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#38BDF8",
              letterSpacing: "0.5px",
            }}
          >
            ur.aptitude.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
