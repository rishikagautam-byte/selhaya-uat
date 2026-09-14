import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";

const PAGE_W = 350;
const PAGE_H = 500;

/* ─── Single page component — must use forwardRef for react-pageflip ─── */
interface PageProps {
  src: string;
  alt: string;
  pageNumber: number;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ src, alt, pageNumber }, ref) => (
    <div
      ref={ref}
      style={{
        width: PAGE_W,
        height: PAGE_H,
        overflow: "hidden",
        position: "relative",
        background: "#f5f0e8",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* subtle page number watermark */}
      <span
        style={{
          position: "absolute",
          bottom: "10px",
          left: pageNumber % 2 === 0 ? "auto" : "14px",
          right: pageNumber % 2 === 0 ? "14px" : "auto",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "10px",
          color: "rgba(40,27,19,0.4)",
          letterSpacing: "0.08em",
        }}
      >
        {pageNumber}
      </span>
    </div>
  )
);
Page.displayName = "Page";

/* ─── Spread pages data ─── */
const pages = Array.from({ length: 56 }, (_, i) => ({
  src: `/images/WaveOfLight/page_${String(i + 1).padStart(3, "0")}.jpg`,
  alt: "Waves of Light book",
  num: i === 0 ? 0 : i + 1,
}));

/* ─── Arrow Button ─── */
function ArrowBtn({ onClick, direction, label }: { onClick: () => void; direction: "prev" | "next"; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "12px",
        color: "#281B13",
        opacity: 0.55,
        flexShrink: 0,
        lineHeight: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "0.55")}
    >
      {direction === "prev" ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="#281B13" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="#281B13" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/* ─── Book component ─── */
function Books() {
  // Separate refs for desktop and mobile — CRITICAL: same ref on two instances breaks both
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const desktopRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mobileRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const leftPage = pages[currentPage];
  const rightPage = pages[currentPage + 1];

  let pageDisplay = "";
  if (currentPage === 0) {
    pageDisplay = "FRONT COVER";
  } else if (currentPage >= pages.length - 1) {
    pageDisplay = "BACK COVER";
  } else {
    pageDisplay = `PAGES | ${leftPage?.num ?? ""}–${rightPage?.num ?? ""}`;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdfs/Waves-of-Light.pdf"; // TODO: Add your Waves of Light PDF here
    link.download = "Selhaya-Waves-of-Light.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  // Desktop controls
  const goNextDesktop = () => desktopRef.current?.pageFlip()?.flipNext();
  const goPrevDesktop = () => desktopRef.current?.pageFlip()?.flipPrev();

  // Mobile controls
  const goNextMobile = () => mobileRef.current?.pageFlip()?.flipNext();
  const goPrevMobile = () => mobileRef.current?.pageFlip()?.flipPrev();

  return (
    <section className="bg-section-bg py-20">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-[32px] text-center">
          A Visual Chronicle of Waves of Light in Pure Silk
        </h2>

        <p className="text-[14px] text-center mt-1">
          The Waves of Light collection embodies Selhaya's signature dialogue
          <br />
          between structured tailoring and fluid femininity.
        </p>

        {/* ── DESKTOP flip-book (lg+) ── */}
        <div className="hidden lg:block mt-4">
          {/* Row: prev arrow | book | next arrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <ArrowBtn onClick={goPrevDesktop} direction="prev" label="Previous spread" />

            <div style={{ position: "relative" }}>
              <HTMLFlipBook
                ref={desktopRef}
                width={PAGE_W}
                height={PAGE_H}
                size="fixed"
                minWidth={PAGE_W}
                maxWidth={PAGE_W}
                minHeight={PAGE_H}
                maxHeight={PAGE_H}
                maxShadowOpacity={0.45}
                drawShadow={true}
                showCover={true}
                usePortrait={false}
                flippingTime={1000}
                startPage={0}
                startZIndex={0}
                autoSize={false}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={40}
                showPageCorners={true}
                disableFlipByClick={false}
                mobileScrollSupport={false}
                onFlip={onFlip}
                className=""
                style={{}}
              >
                {pages.map((p, i) => (
                  <Page key={i} src={p.src} alt={p.alt} pageNumber={p.num} />
                ))}
              </HTMLFlipBook>
            </div>

            <ArrowBtn onClick={goNextDesktop} direction="next" label="Next spread" />
          </div>

          {/* Desktop footer */}
          <div
            className="flex items-center justify-between mt-5"
            style={{ width: `${PAGE_W * 2}px`, margin: "20px auto 0" }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                letterSpacing: "0.04em",
              }}
            >
              {pageDisplay}
            </p>
            <button
              onClick={handleDownload}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#281B13",
                letterSpacing: "0.04em",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Download
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1v8M4 7l3 3 3-3M2 12h10" stroke="#281B13" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── MOBILE flip-book (below lg) ── */}
        <div className="lg:hidden mt-6 w-full px-6">

          {/* Row: prev arrow | book | next arrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <ArrowBtn onClick={goPrevMobile} direction="prev" label="Previous spread" />

            <HTMLFlipBook
              ref={mobileRef}
              width={150}
              height={250}
              size="fixed"
              minWidth={150}
              maxWidth={150}
              minHeight={250}
              maxHeight={250}
              maxShadowOpacity={0.45}
              drawShadow={true}
              showCover={true}
              usePortrait={false}
              flippingTime={1000}
              startPage={0}
              startZIndex={0}
              autoSize={false}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={40}
              showPageCorners={true}
              disableFlipByClick={false}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className=""
              style={{}}
            >
              {pages.map((p, i) => (
                <Page key={i} src={p.src} alt={p.alt} pageNumber={p.num} />
              ))}
            </HTMLFlipBook>

            <ArrowBtn onClick={goNextMobile} direction="next" label="Next spread" />
          </div>

          {/* Mobile footer */}
          <div 
            className="flex items-center justify-between mt-4"
            style={{ width: "300px", margin: "0 auto" }}
          >
            <p className="text-[13px]" style={{ letterSpacing: "0.04em" }}>
              {pageDisplay}
            </p>
            <button
              onClick={handleDownload}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "#281B13",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Download
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1v8M4 7l3 3 3-3M2 12h10" stroke="#281B13" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Books;
