import lastImg from "../../assets/press/lastSec.png"

const DARK_BG_DESKTOP = "#2D1F1D";
const DARK_BG_MOBILE = "#281B13";
const BTN_BG = "#E4DDCB";
const ADVISORY_LINK = "/advisory"; // replace with real route


export default function Reflect() {
  return (
    <section className="w-full">

      {/* ══════════════════════════════════════════
          DESKTOP ≥ 1024px  — unchanged
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex w-full" style={{ minHeight: "643px" }}>

        {/* Left — image 50% */}
        <div className="relative overflow-hidden" style={{ width: "50%" }}>
          <img
            src= {lastImg}
            alt="Selhaya cultural alliances"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right — dark panel */}
        <div
          className="flex flex-col"
          style={{
            width: "50%",
            backgroundColor: DARK_BG_DESKTOP,
            paddingTop: "100px",
            paddingLeft: "60px",
            paddingRight: "60px",
            paddingBottom: "60px",
          }}
        >
          <h2
            className="font-editorial"
            style={{
              fontSize: "32px",
              lineHeight: "1.25",
              color: "var(--color-primary-light)",
              textAlign: "left",
            }}
          >
            Press documents recognition. <br /> Cultural Alliances reflect <br />
            participation.
          </h2>

          <div style={{ height: "20px" }} />

          <p
            className="dm-sans"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "1.6",
              color: "var(--color-secondary-1)",
              textAlign: "left",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
              overflow: "hidden",
            }}
          >
            Beyond editorial acknowledgment, Selhaya operates within <br />
            diplomatic, ministerial, and international cultural platforms where <br />
            fashion becomes representation — a language of heritage, dialogue,
            and{" "}<br />modern identity.
          </p>

          <div style={{ height: "360px" }} />

          <div>
            <a
              href={ADVISORY_LINK}
              className="bg-secondary-1 dm-sans inline-block uppercase lg:mb-10 text-[16px] py-2 px-4 rounded-full"
            >
              Explore Cultural Advisory
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE + TABLET < 1024px
          bg: #281B13 (full section, no outer padding bg)
      ══════════════════════════════════════════ */}
      <div
        className="block lg:hidden"
        style={{
          backgroundColor: DARK_BG_MOBILE,
          padding: "20px",
        }}
      >
        {/* Single dark card — same bg so it blends, rounded for card feel */}
        <div
          style={{
            backgroundColor: DARK_BG_MOBILE,
            borderRadius: "8px",
            paddingTop: "40px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "40px",
          }}
        >
          {/* Title */}
          <h2
            className="font-editorial text-center"
            style={{
              fontSize: "32px",
              lineHeight: "1.25",
              color: "var(--color-primary-light)",
            }}
          >
            Press documents recognition. <br />Cultural Alliances reflect{" "}
            participation.
          </h2>

          <div style={{ height: "20px" }} />

          {/* Body */}
          <p
            className="dm-sans text-center"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "1.6",
              color: "var(--color-secondary-1)",
            }}
          >
            Beyond editorial acknowledgment, Selhaya operates within
            diplomatic, ministerial, and international cultural platforms where
            fashion becomes representation — a language of heritage, dialogue,
            and modern identity.
          </p>

          {/* Image — 155×176, centered */}
          <div className="flex justify-center" style={{ marginTop: "24px" }}>
            <div
              className="overflow-hidden"
              style={{
                width: "155px",
                height: "176px",
                flexShrink: 0,
                borderRadius: "4px",
              }}
            >
              <img
                src={lastImg}
                alt="Selhaya cultural alliances"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Extra line */}
          <p
            className="dm-sans text-center"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "1.6",
              color: "var(--color-secondary-1)",
              marginTop: "20px",
            }}
          >
            Each engagement is considered individually, shaped by context,
            protocol, and purpose.
          </p>

          {/* CTA */}
          <div className="flex justify-center" style={{ marginTop: "24px" }}>
            <a
              href={ADVISORY_LINK}
              className="dm-sans inline-block"
              style={{
                backgroundColor: BTN_BG,
                color: "#000000",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                padding: "12px 24px",
                borderRadius: "999px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Explore Cultural Advisory
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}