const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
`;

export default function House() {
  return (
    <>
      <style>{fontStyle}</style>
      <section
        className="w-full flex items-center justify-center font-['DM_Sans',sans-serif]"
        style={{
          backgroundColor: "#D4C9B8",
          minHeight: "472px",
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-16 w-full">
          {/* Heading — font-editorial same as footer headings */}
          <h1
            className="font-editorial mb-8 text-center"
            style={{
              fontSize: "clamp(36px, 10vw, 52px)",
              lineHeight: "1.1",
              fontWeight: 400,
              color: "#2D1F1D",
              letterSpacing: "0.02em",
            }}
          >
            Selhaya
          </h1>

          {/* Paragraph — DM Sans same as footer body text */}
          <p
            className="text-center"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 2vw, 16px)",
              lineHeight: "1.85",
              color: "#2D1F1D",
              maxWidth: "480px",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            The House was created to redefine the abaya through pure silk, quiet
            structure, and timeless craftsmanship. Rooted between British
            refinement and Middle Eastern elegance, Selhaya exists to create
            garments of presence designed to be worn, remembered, and kept.
          </p>
        </div>
      </section>
    </>
  );
}