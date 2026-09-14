import { useRef, useState, type TouchEvent } from "react";
import { editions } from "./editions";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');

  /* ── Section wrapper ── */
  .ex-section {
    width: 100%;
    background-color: #F5F0E8;
    padding: clamp(48px, 6vw, 80px) 0 clamp(48px, 6vw, 80px) 0;
  }

  /* ── Top text block ── */
  .ex-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    padding: 0 clamp(24px, 4vw, 64px);
    margin-bottom: clamp(32px, 4vw, 56px);
  }

  .ex-header-left {
    flex: 1;
  }

  .ex-heading {
    font-size: 32px;
    font-weight: 400;
    line-height: 1.28;
    color: #1a1208;
    margin: 0 0 clamp(16px, 2vw, 24px) 0;
    max-width: 560px;
  }

  .ex-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(12px, 1.1vw, 14px);
    font-weight: 300;
    line-height: 1.2;
    color: #6b5f50;
    max-width: 340px;
    margin: 0;
  }

  .ex-link {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(9px, 0.78vw, 11px);
    font-weight: 400;
    letter-spacing: 0.18em;
    color: #1a1208;
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-color: rgba(26,18,8,0.4);
    white-space: nowrap;
    transition: opacity 0.25s;
    flex-shrink: 0;
    align-self: flex-end;
    padding-bottom: 2px;
  }
  .ex-link:hover { opacity: 0.5; }

  /* ── Cards grid ── */
  .ex-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(12px, 1.4vw, 20px);
    padding: 0;
  }

  /* ── Single card ── */
  .ex-card {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;
    position: relative;
  }

  .ex-card-img-wrap {
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }

  .ex-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .ex-card:hover .ex-card-img-wrap img {
    transform: scale(1.04);
  }

  /* collection name inside card at bottom */
  .ex-card-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(9px, 0.78vw, 11px);
    font-weight: 400;
    letter-spacing: 0.2em;
    color: #EDE8E0;
    text-transform: uppercase;
    margin: 0;
    padding: clamp(14px, 2vw, 20px) clamp(14px, 1.8vw, 20px);
    background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%);
  }

  /* ── Tablet (≤1024px) ── */
  @media (max-width: 1024px) {
    .ex-card-img-wrap { height: 340px; }
  }

  /* ── Tablet portrait (≤860px): 2 columns ── */
  @media (max-width: 860px) {
    .ex-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .ex-card-img-wrap { height: 46vw; }
    .ex-header { flex-direction: column; align-items: flex-start; gap: 16px; }
    .ex-link { align-self: flex-start; }
  }

  /* ── Mobile (≤540px) ── */
  @media (max-width: 540px) {
    .ex-header {
      padding: 0 clamp(16px, 4vw, 24px);
      padding-left: calc(clamp(16px, 4vw, 24px) + 20px);
    }
    .ex-link {
      display: none;
    }
    .ex-heading {
      font-size: 26px;
      max-width: 100%;
      overflow: visible;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .ex-subtext {
      max-width: 100%;
      overflow: visible;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    /* ── Mobile slider wrapper ── */
    .ex-grid {
      display: none;
    }
    .ex-slider-outer {
      position: relative;
      overflow: hidden;
      width: 100%;
    }
    .ex-slider-track {
      display: flex;
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: transform;
    }
    .ex-slider-track .ex-card {
      flex: 0 0 100%;
      width: 100%;
    }
    .ex-slider-track .ex-card-img-wrap {
      width: 329px;
      height: 424px;
      margin: 0 auto;
    }

    /* ── Slide counter ── */
    .ex-slide-counter {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.18em;
      color: #6b5f50;
      text-align: left;
      padding-left: calc(clamp(16px, 4vw, 24px) + 20px);
      margin-top: 8px;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }

  /* ── Desktop: hide slider ── */
  @media (min-width: 541px) {
    .ex-slider-outer { display: none; }
    .ex-slide-counter { display: none; }
  }
`;

export default function Explore() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const total = editions.length;

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goTo = (index: number) => {
    if (index < 0 || index >= total) return;
    setCurrent(index);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left → next
        goTo(current < total - 1 ? current + 1 : current);
      } else {
        // swipe right → prev
        goTo(current > 0 ? current - 1 : current);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <style>{styles}</style>

      <section className="ex-section">

        {/* ── Header ── */}
        <div className="ex-header">
          <div className="ex-header-left">
            <h2 className="ex-heading font-editorial">
              A House of pure silk abayas shaped by
              heritage, presence, &amp; quiet authority.
            </h2>
            <p className="ex-subtext">
              Each edition is a study in fabric, silhouette, and intention 
              seasonless pieces created to move softly through time.
            </p>
          </div>
          <a href="/editions" className="ex-link">
            Explore The Editions →
          </a>
        </div>

        {/* ── Desktop Cards Grid ── */}
        <div className="ex-grid">
          {editions.map((edition) => (
            <a key={edition.id} href={edition.href} className="ex-card">
              <div className="ex-card-img-wrap">
                <img
                  src={edition.image}
                  alt={edition.name}
                  loading="lazy"
                />
                <h5 className="ex-card-name">{edition.name}</h5>
              </div>
            </a>
          ))}
        </div>

        {/* ── Mobile Slider ── */}
        <div
          className="ex-slider-outer"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="ex-slider-track"
            ref={trackRef}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {editions.map((edition) => (
              <a key={edition.id} href={edition.href} className="ex-card">
                <div className="ex-card-img-wrap">
                  <img
                    src={edition.image}
                    alt={edition.name}
                    loading="lazy"
                  />
                  <h5 className="ex-card-name">{edition.name}</h5>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Slide Counter (mobile only) ── */}
        <p className="ex-slide-counter">
          {current + 1}/{total}
        </p>

      </section>
    </>
  );
}