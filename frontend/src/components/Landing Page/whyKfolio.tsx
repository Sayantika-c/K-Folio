export default function WhyKfolio() {
  return (
    <>
      <style>{`
        /* =====================
           COLLAGE LAYOUT
           ===================== */
        .why-collage {
          position: relative;
          width: 100%;
          height: 540px;
          z-index: 1;
        }

        .collage-item {
          position: absolute;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;

          border: 2px solid rgba(255,255,255,0.12);
          box-shadow: 0 10px 30px rgba(0,0,0,0.45);

          transform: rotate(var(--tilt));
          animation: floatSoft var(--float-time) ease-in-out infinite;

          transition:
            transform 0.4s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.3s ease;
        }

        .collage-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Floating animation */
        @keyframes floatSoft {
          0% {
            transform: translate(0, 0) rotate(var(--tilt));
          }
          50% {
            transform: translate(6px, -14px) rotate(calc(var(--tilt) + 1.2deg));
          }
          100% {
            transform: translate(0, 0) rotate(var(--tilt));
          }
        }


        .collage-item:hover {
          transform: scale(1.12) rotate(0deg);
          z-index: 10;
          box-shadow: 0 25px 60px rgba(96,165,250,0.45);
        }

        /* =====================
           IMAGE POSITIONS
           ===================== */

        /* Top-left (sports) */
        .item-1 {
          width: 200px;
          height: 150px;
          top: 60px;
          left: 0px;
          --tilt: -14deg;
          --float-time: 6.5s;
          z-index: 1;
        }

        /* Top-center (campus building) */
        .item-2 {
          width: 320px;
          height: 190px;
          top: 10px;
          left: 260px;
          --tilt: -4deg;
          --float-time: 7.2s;
          z-index: 2;
        }

        /* CENTER — MAIN FOCUS (student with laptop) */
        .item-3 {
          width: 260px;
          height: 320px;
          top: 170px;
          left: 220px;
          --tilt: 4deg;
          --float-time: 6.2s;
          z-index: 5;
        }

        /* Bottom-right (library) */
        .item-4 {
          width: 200px;
          height: 220px;
          bottom: 0;
          left: 420px;
          --tilt: 6deg;
          --float-time: 7.8s;
          z-index: 2;
        }

        /* Bottom-left (graduation) */
        .item-5 {
          width: 200px;
          height: 180px;
          bottom: 0;
          left: 80px;
          --tilt: 6deg;
          --float-time: 7.5s;
          z-index: 1;
        }

        /* =====================
           JOIN BUTTON BORDER
           ===================== */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          overflow: "hidden",                // 🔑 prevents footer overlap
          minHeight: "100vh",
          padding: "120px 100px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          alignItems: "center",
          gap: "80px",
          color: "white",
          background: "linear-gradient(135deg, #0b0f2a, #050816)",
        }}
      >
        {/* LEFT — Image Collage */}
        <div className="why-collage">
          <div className="collage-item item-1">
            <img src="/WhyKfolio3.jpg" alt="Sports" />
          </div>

          <div className="collage-item item-2">
            <img src="/WhyKfolio5.svg" alt="Campus" />
          </div>

          <div className="collage-item item-3">
            <img src="/WhyKfolio6.svg" alt="Student with laptop" />
          </div>

          <div className="collage-item item-4">
            <img src="/WhyKfolio4.svg" alt="Library" />
          </div>

          <div className="collage-item item-5">
            <img src="/WhyKfolio7.jpg" alt="Graduation" />
          </div>
        </div>

        {/* RIGHT — Content */}
        <div style={{ maxWidth: "520px", zIndex: 1 }}>
          <img
            src="/WhyKfolio.svg"
            alt="Why K-Folio"
            style={{ width: "492px", height: "345px", marginBottom: "24px" }}
          />

          <p
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            College is full of moments that never make it to social media.
            K-Folio is where those moments live. Shared easily, seen by the
            right people, and free from the noise of generic platforms.
          </p>

          {/* Join Now Button with glowing animated border */}
          <button
        style={{
          position: "relative",
          display: "inline-flex",
          padding: "1px",
          borderRadius: "999px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: "-1000%",
            background:
              "conic-gradient(from 90deg at 50% 50%, #E2CBFF 0%, #393BB2 50%, #E2CBFF 100%)",
            animation: "spin 2s linear infinite",
          }}
        />

        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            height: "48px",
            padding: "0 22px",
            borderRadius: "999px",
            background: "#030b2d",
            color: "white",
            fontSize: "14px",
            fontWeight: 500,
            backdropFilter: "blur(24px)",
          }}
        >
          Join Now!
          <span style={{ fontSize: "16px", transform: "translateY(1px)" }}>→</span>
        </span>
      </button>


        </div>
      </section>
    </>
  );
}
