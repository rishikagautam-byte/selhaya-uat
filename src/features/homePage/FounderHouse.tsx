const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400&display=swap');

  /* ── Base layout ── */
  .fh-section {
    display: flex;
    width: 100%;
    height: 800px;
  }

  .fh-image-col {
    flex: 0 0 49.5%;
    position: relative;
    overflow: hidden;
  }

  .fh-content-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #2A1715;
    padding: clamp(44px, 6vw, 88px)
             clamp(28px, 4vw, 56px)
             clamp(44px, 5.5vw, 64px)
             clamp(36px, 5vw, 72px);
  }

  /* ── Typography ── */
  .fh-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(9px, 0.78vw, 11px);
    font-weight: 300;
    letter-spacing: 0.22em;
    color: #b5a99a;
    text-transform: uppercase;
    margin-bottom: clamp(20px, 2.5vw, 36px);
  }

  .fh-heading {
    font-size: 32px;
    font-weight: 400;
    line-height: 1.38;
    color: #EDE8E0;
    letter-spacing: 0.03em;
    white-space: nowrap;
    margin-bottom: clamp(24px, 2.8vw, 40px);
  }

  .fh-quote {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.78;
    color: #C8BFB4;
    max-width: clamp(230px, 26vw, 360px);
  }

  .fh-name {
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: #EDE8E0;
    text-transform: uppercase;
    margin-top: clamp(32px, 4vw, 48px);
    margin-bottom: clamp(12px, 1.5vw, 20px);
  }

  .fh-link {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(9px, 0.78vw, 11px);
    font-weight: 400;
    letter-spacing: 0.18em;
    color: #EDE8E0;
    text-transform: uppercase;
    text-decoration: underline;
    text-underline-offset: 5px;
    text-decoration-color: rgba(237,232,224,0.45);
    transition: opacity 0.3s ease;
  }

  .fh-link:hover { opacity: 0.6; }

  /* ── Laptop / small desktop (≤1024px) ── */
  @media (max-width: 1024px) {
    .fh-heading  { max-width: 100%; }
    .fh-quote    { max-width: 100%; }
    .fh-eyebrow,
    .fh-link     { font-size: 10px; }
  }

  /* ── Tablet portrait (≤860px): stack vertically ── */
  @media (max-width: 860px) {
    .fh-section {
      flex-direction: column;
      min-height: auto;
    }
    .fh-image-col {
      flex: none;
      width: 100%;
      height: 56vw;
      min-height: 260px;
      max-height: 500px;
    }
    .fh-content-col {
      flex: none;
      width: 100%;
      padding: 48px 36px 44px 36px;
    }
    .fh-eyebrow,
    .fh-link     { font-size: 11px; }
  }

  /* ── Mobile (≤540px) ── */
  @media (max-width: 540px) {
    .fh-image-col { height: 74vw; }
    .fh-content-col { padding: 36px 20px 36px 20px; }
  }
`;

export default function FounderHouse() {
  return (
    <>
      <style>{fontStyle}</style>

      <section className="fh-section">

        {/* ── LEFT: Image ── */}
        <div
          className="fh-image-col"
          style={{
            backgroundImage: "url('/images/founder/aisha.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label="Aisha Hossain"
        />

        {/* ── RIGHT: Content Panel ── */}
        <div className="fh-content-col">

          <p className="fh-eyebrow">The Founder</p>

          {/* font-editorial — same as footer headings */}
          <h2 className="fh-heading font-editorial">
            The Founder & The House
          </h2>

          <p className="fh-quote">
            "I imagined Selhaya for women whose presence speaks in silence — women
            who deserve to be seen, to belong, and to be remembered in a House
            that honors them, always on their terms."
          </p>

          {/* font-editorial — same as footer headings */}
          <p className="fh-name font-editorial">Aisha Hossain</p>

          <div style={{ flex: 1 }} />

          <a href="#" className="fh-link">
            Explore The House →
          </a>

        </div>
      </section>
    </>
  );
}