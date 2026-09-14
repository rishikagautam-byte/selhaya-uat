import React from "react";
import page2 from "../../assets/haya-images/page2.png";
import page3 from "../../assets/haya-images/page3.png";

interface VisualProps {
  downloadHref?: string;
  totalPages?: number;
  currentPages?: string;
}

const Visual: React.FC<VisualProps> = ({
  downloadHref = "/lookbook.pdf",
  totalPages = 32,
  currentPages = "2–3",
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = downloadHref;
    link.download = "Selhaya-Haya-Lookbook.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full" style={{ backgroundColor: "#E4DDCB" }}>

      {/* ══════════════════════════════════════
          DESKTOP (md+) — height 1005px
      ══════════════════════════════════════ */}
      <div
        className="hidden md:flex flex-col items-center justify-center w-full min-h-screen py-24 px-8"
      >
        {/* Title — h2 32px, one line, center */}
        <h2
          className="font-editorial text-[#281B13] text-center"
          style={{
            fontFamily: "'Silver Editorial', serif",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "1.3",
            whiteSpace: "nowrap",
          }}
        >
          A Visual Chronicle of Haya in Pure Silk
        </h2>

        {/* Content — 2 lines, center, DM Sans */}
        <p
          className="dm-sans text-[#281B13] text-center mt-4"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "1.55",
          }}
        >
          The Haya collection embodies Selhaya's signature dialogue
          <br />
          between structured tailoring and fluid femininity.
        </p>

        {/* Responsive Book Container */}
        <div
          className="mt-8 flex flex-col"
          style={{
            width: "min(90vw, calc(min(100vh - 300px, 650px) * (800 / 566)))",
            maxWidth: "1000px"
          }}
        >
          {/* Book spread */}
          <div
            className="flex w-full overflow-hidden relative"
            style={{
              aspectRatio: "800 / 566",
              borderRadius: "4px",
              boxShadow: "0 8px 32px rgba(64,44,31,0.18)",
            }}
          >
            {/* Left page */}
            <div className="flex-1 h-full overflow-hidden relative">
              <img
                src={page2}
                alt="Lookbook page 2"
                className="w-full h-full block"
                style={{ objectFit: "fill" }}
              />
            </div>

            {/* Right page */}
            <div className="flex-1 h-full overflow-hidden relative">
              <img
                src={page3}
                alt="Lookbook page 3"
                className="w-full h-full block"
                style={{ objectFit: "fill" }}
              />
            </div>
          </div>

          {/* Footer — pages left, download right */}
          <div className="flex items-center justify-between mt-4 w-full">
            {/* Pages indicator */}
            <p
              className="dm-sans text-[#281B13]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "0.04em",
              }}
            >
              PAGES | {currentPages} / {totalPages}
            </p>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="dm-sans text-[#281B13] flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "0.04em",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Download
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1v8M4 7l3 3 3-3M2 12h10"
                  stroke="#281B13"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE (below md) — height 598px
      ══════════════════════════════════════ */}
      <div
        className="flex md:hidden flex-col w-full"
        style={{ height: "598px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        {/* Top spacer — equal to bottom margin */}
        <div style={{ flex: 1 }} />

        {/* Title — h4 Silver Editorial 24px, 2 lines, center */}
        <h4
          className="font-editorial text-[#281B13] text-center"
          style={{
            fontFamily: "'Silver Editorial', serif",
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "1.35",
          }}
        >
          A Visual Chronicle of Haya
          <br />
          in Pure Silk
        </h4>

        {/* Book card area — download top-right, card below */}
        <div className="relative mt-5">
          {/* Download — top right above card */}
          <button
            onClick={handleDownload}
            className="dm-sans text-[#281B13] flex items-center gap-1 absolute right-0 top-0"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Download
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1v8M4 7l3 3 3-3M2 12h10"
                stroke="#281B13"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Book spread — 235px height, two pages flush together */}
          <div
            className="flex w-full overflow-hidden mt-6"
            style={{
              height: "235px",
              borderRadius: "3px",
              boxShadow: "0 4px 16px rgba(64,44,31,0.15)",
            }}
          >
            {/* Left page */}
            <div className="flex-shrink-0 overflow-hidden" style={{ width: "50%", height: "235px" }}>
              <img
                src={page2}
                alt="Lookbook page 2"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right page */}
            <div className="flex-shrink-0 overflow-hidden" style={{ width: "50%", height: "235px" }}>
              <img
                src={page3}
                alt="Lookbook page 3"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Pages indicator */}
        <p
          className="dm-sans text-[#281B13] mt-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.04em",
          }}
        >
          {currentPages} / {totalPages}
        </p>

        {/* Content — h7 DM Sans 14/auto, center, some margin below pages */}
        <p
          className="dm-sans text-[#281B13] text-center mt-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.55",
          }}
        >
          The Haya collection embodies Selhaya's signature dialogue between
          structured tailoring and fluid femininity.
        </p>

        {/* Bottom equal spacer */}
        <div style={{ flex: 1 }} />
      </div>

    </section>
  );
};

export default Visual;