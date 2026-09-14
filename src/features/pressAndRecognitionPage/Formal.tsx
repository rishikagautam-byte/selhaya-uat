import { formalData, type FormalItem } from "./formalData";

/* ─────────────────────────────────────────────────────────────────────────────
   DESKTOP
   • Label   : h6 DM Sans 16px uppercase, center
   • Headline: 659×114, center, 2 lines, Silver h2 – 40px below label
   • Rows    : full viewport width, height 798px each
               odd  (1,3) → left  = image (50vw wide), right = content (50vw)
               even (2,4) → left  = content (50vw),    right = image  (50vw)
               content block: vertically centered, title 300px from top of cell,
               h2 Silver 32px then 40px gap then h5 DM Sans 20px left-aligned

   MOBILE / TABLET
   • Label   : h6 DM Sans 16px uppercase, left (20px padding)
   • Headline: h4 Silver 24px, left (20px padding)
   • Each item: image 329px wide, full bleed between 20px margins → responsive
               below image: title h4 Silver 24px (1 line), 20px gap, body h7(p) DM Sans 14px
───────────────────────────────────────────────────────────────────────────── */

// ── Desktop row ──────────────────────────────────────────────────────────────
function DesktopRow({ item, reverse }: { item: FormalItem; reverse: boolean }) {
  const imageBlock = (
    <div
      className="relative overflow-hidden"
      style={{ width: "50%", height: "798px", flexShrink: 0 }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );

  const contentBlock = (
    <div
      className="flex items-start"
      style={{
        width: "50%",
        height: "798px",
        flexShrink: 0,
        // content starts 300px from top of the cell
        paddingTop: "300px",
        paddingLeft: "60px",
        paddingRight: "60px",
      }}
    >
      <div className="flex flex-col">
        {/* Title — h2 Silver 32px */}
        <h2
          className="font-editorial"
          style={{
            fontSize: "32px",
            lineHeight: "1.2",
            color: "var(--color-primary-dark)",
          }}
        >
          {item.title}
        </h2>

        {/* 40px gap */}
        <div  />

        {/* Description — h5 DM Sans 20px */}
        <p
          className="dm-sans"
          style={{
            fontSize: "20px",
            lineHeight: "1",
            color: "var(--color-primary-dark)",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="flex w-full"
      style={{ height: "798px" }}
    >
      {reverse ? (
        <>
          {contentBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {contentBlock}
        </>
      )}
    </div>
  );
}

// ── Mobile / Tablet item ─────────────────────────────────────────────────────
function MobileItem({ item }: { item: FormalItem }) {
  return (
    <div className="w-full" style={{ marginBottom: "48px" }}>
      {/* Image — responsive width with 20px side margins, fixed ratio */}
      <div
        className="overflow-hidden w-full"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "329/379" }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title — h4 Silver 24px, 1 line, 20px top margin */}
      <div style={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "20px" }}>
        <h4
          className="font-editorial"
          style={{
            fontSize: "24px",
            lineHeight: "1.2",
            color: "var(--color-primary-dark)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </h4>

        {/* Description — DM Sans 14px, 20px top margin */}
        <p
          className="dm-sans"
          style={{
            fontSize: "14px",
            lineHeight: "1.5",
            color: "var(--color-primary-dark)",
            marginTop: "10px",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────
export default function Formal() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "var(--color-primary-light)" }}
    >
      {/* ════════════════════════════════════════
          DESKTOP  ≥ 1024px
      ════════════════════════════════════════ */}
      <div className="hidden lg:block">
        {/* Label */}
        <h6
          className="dm-sans uppercase text-center"
          style={{
            fontSize: "16px",
            lineHeight: "1",
            letterSpacing: "0.15em",
            color: "var(--color-primary-dark)",
            paddingTop: "80px",
          }}
        >
          Honours &amp; Institutional Recognition
        </h6>

        {/* Headline — 659×114, center, 2 lines, 40px below label */}
        <div
          className="mx-auto text-center"
          style={{
            width: "659px",
            maxWidth: "90%",
            marginTop: "40px",
          }}
        >
          <h2
            className="font-editorial"
            style={{
              fontSize: "clamp(28px, 2.8vw, 40px)",
              lineHeight: "1.35",
              color: "var(--color-primary-dark)",
              /* force 2 lines naturally — width constraint does it */
            }}
          >
            Formal acknowledgements of cultural contribution and industry
            leadership.
          </h2>
        </div>

        {/* Rows — 40px below headline */}
        <div style={{ marginTop: "40px" }}>
          {formalData.map((item) => (
            <DesktopRow
              key={item.id}
              item={item}
              // odd ids (1,3) → image left; even ids (2,4) → content left
              reverse={item.id % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE + TABLET  < 1024px
      ════════════════════════════════════════ */}
      <div className="block lg:hidden" style={{ paddingTop: "48px" }}>
        {/* Label */}
        <p
          className="dm-sans uppercase"
          style={{
            fontSize: "16px",
            lineHeight: "1",
            letterSpacing: "0.15em",
            color: "var(--color-primary-dark)",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          Honours &amp; Institutional Recognition
        </p>

        {/* Headline — h4 Silver 24px, 40px below label */}
        <h4
          className="font-editorial"
          style={{
            fontSize: "24px",
            lineHeight: "1.35",
            color: "var(--color-primary-dark)",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginTop: "16px",
          }}
        >
          Formal acknowledgements of cultural contribution and industry
          leadership.
        </h4>

        {/* Items — 40px below headline */}
        <div style={{ marginTop: "40px" }}>
          {formalData.map((item) => (
            <MobileItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}