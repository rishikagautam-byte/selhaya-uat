"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/* ─── Per-product slide content (3 slides each) ─────────────────────────── */
type SlideContent = { title: string; body: string };

const productSlides: Record<string, SlideContent[]> = {
  "amara-flame": [
    {
      title: "The Santorini Hour",
      body: "Amara Flame began with the last hour of a Santorini day, when white stone, sea and sky are warmed by the same amber light.That fleeting change in colour shaped the palette of the edition.",
    },
    {
      title: "Gold Zari on Silk",
      body: "Gold zari is worked by hand onto the pure silk crepe robe.The embroidery catches the light as the fabric moves, set against the softer glow of the champagne silk dress.",
    },
    {
      title: "After Sunset",
      body: "Amara Flame belongs to destination dinners, summer celebrations and evenings by the water.It is made for the hour when daylight fades, candles are lit and gold begins to glow.",
    },
  ],
  "sabi": [
    {
      title: "An Anniversary\n in Sabi Sands",
      body: "Sabi was conceived during the Founder’s anniversary journey to Sabi Sands.Game drives revealed the Big Five within their natural habitat, while the dry landscape changed colour beneath the afternoon sun. Evenings ended in deep gold and red, with the reserve stretching far beyond the horizon.The experience inspired an edition shaped by wonder, stewardship and respect for the earth’s creatures.",
    },
    {
      title: "The Markings of the Wild",
      body: "The custom giraffe print gives the silk satin dress its distinctive character, recalling the animals encountered across the reserve.Across the linen robe, geometric patterns are woven into the sleeves and back. The detail offers a subtle nod to African decorative traditions while giving the garment depth from every view.",
    },
    {
      title: "Into the Reserve",
      body: "Sabi was imagined for the world of private safari lodges, from dawn game drives and afternoons overlooking the reserve to sundowners and dinners beneath open skies.The linen robe feels natural within the rugged landscape, while the giraffe-print silk satin brings a note of glamour to the journey.",
    },
  ],
  "ziya-blue": [
    {
      title: "Where Two\n Oceans Meet",
      body: "Ziya Blue is cut from the drama of deep water. Cobalt silk meets champagne silk in an edition of cool colour, clean lines and luminous polish.",
    },
    {
      title: "The Motion\n of Water",
      body: "Wave-like motifs travel across the cobalt blue silk crepe, giving the robe the rhythm and force of water in motion.The champagne silk satin beneath catches the light through each step, echoing the shimmer that appears when the sun meets the ocean.",
    },
    {
      title: "Blue Against\n the Sun",
      body: "Ziya Blue was imagined for overwater villas in the Maldives, private beach resorts and dinners beside the sea.Under strong sunlight, the cobalt becomes vivid against pale sand, stone and sky. After dusk, the same blue deepens into something richer and more dramatic.",
    },
  ],
  "sakura": [
    {
      title: "Kyoto in Spring",
      body: "Sakura was conceived during the Founder’s honeymoon in Japan, after time spent among Kyoto’s gardens, bamboo groves and verdant landscapes.The brief flowering of the cherry blossom shaped the meaning of the edition: renewal, beauty and the beginning of a new chapter.",
    },
    {
      title: "Blossoms in Thread",
      body: "Cherry blossom motifs are embroidered by hand across blush pink silk crepe, giving the robe the feeling of petals scattered across fabric.The ivory silk satin dress beneath brings light to the palette, allowing the blush pink and floral work to remain soft and luminous.",
    },
    {
      title: "Among Gardens",
      body: "Sakura was imagined for the Japanese cherry blossom season, walks through bamboo groves, botanical gardens and luxury journeys surrounded by nature.It is a robe for the woman who wishes to dress as beautifully and femininely as the landscape around her.",
    },
  ],
  "rina-lemon": [
    {
      title: "A Celebration on\n Lake Garda",
      body: "Rina Lemon was born from the Founder’s destination wedding on Lake Garda.Lemon trees, sunlit water, historic villas and the happiness of gathering in one of Italy’s most beautiful landscapes shaped the mood of the edition. It carries the colour and warmth of that day into silk.",
    },
    {
      title: "Vines and Lemons",
      body: "Delicate vine embroidery travels across the front and back of the yellow silk crepe robe, recalling the climbing greenery of lakeside villas.Beneath it, a custom lemon print was created for the silk satin dress, making the inner layer the visual heart of the edition.",
    },
    {
      title: "An Italian Summer",
      body: "Rina Lemon was imagined for Mediterranean sunshine, lunches at Italian villas, luxury stays beside the water and evening walks along European coastal promenades.Against pale stone, blue water and summer light, the yellow silk and lemon print come fully alive.",
    },
  ],
  "malika-drape": [
    {
      title: "Named for\n a Queen",
      body: "Malika means queen.The edition grew from the Founder’s love of London luxury, from afternoons in Knightsbridge to evenings in Mayfair, and the women who treat dressing as an expression of self-possession.That world was translated into one decisive colour: red.",
    },
    {
      title: "Flowers After\n Dark",
      body: "Tonal red petals are embroidered along the silk crepe and edged in black.Their dark centres and shadowed outlines give the flowers a nocturnal beauty, bringing femininity to the robe while preserving its sharper character.",
    },
    {
      title: "The Entrance",
      body: "Malika Drape was imagined for afternoons in Knightsbridge, Mayfair lunches, hotel lounges, formal receptions and dinners after dark.The red silk announces the wearer before she speaks. The long drape and dark floral detail keep the effect elegant, controlled and unforgettable.",
    },
  ],
  "sharifa-cut": [
    {
      title: "The Power\nBlazer Reimagined",
      body: "Sharifa Cut began with one of the most recognised symbols of professional authority: the black blazer.The edition keeps the discipline and polish of formal tailoring, but carries it into a longer, more feminine silhouette. It was created for the woman who wants strength and elegance to feel entirely natural together.",
    },
    {
      title: "Vines in Black",
      body: "Black silk crepe is framed with silk satin lapels and traced with a hand-embroidered vine motif.The embroidery carries a subtle sparkle that becomes visible as the wearer moves, adding richness to the robe without overwhelming its tailored form.",
    },
    {
      title: "The Boardroom \n and Beyond",
      body: "Sharifa Cut was imagined for City boardrooms, private offices, formal presentations, members’ clubs and evening receptions.It is made for occasions where a woman wants to feel assured and composed, while remaining unmistakably elegant and feminine.",
    },
  ],
  "safa-bloom": [
    {
      title: "Kew, Remembered",
      body: "Safa Bloom grew from the Founder’s childhood in London, her enduring love of flowers and the city’s great parks.Kew Gardens holds particular meaning as the place of her engagement. Its glasshouses, ordered landscapes and extraordinary plant life shaped a robe that carries the memory of that garden beyond the day itself.",
    },
    {
      title: "An English \nGarden in Zari",
      body: "Leaf-patterned metal zari is worked by hand across the raw shantung silk.\nThe embroidery follows the forms of leaves and climbing plants, drawing from the harmony found in English gardens, where careful design allows nature to flourish.",
    },
    {
      title: "The Garden\n Invitation",
      body: "Safa Bloom was imagined for garden parties, flower shows, afternoon teas and summer lunches across London and the English countryside.",
    },
  ],
  "noor-flow": [
    {
      title: "Afternoon Tea\n in London",
      body: "Noor Flow grew from afternoons spent with close friends and family, where tea was served slowly, conversation continued beyond the last pour and dressing beautifully was part of the pleasure.The robe carries the warmth of those gatherings into a piece made for the rituals of London social life.",
    },
    {
      title: "Before the\n Flower Opens",
      body: "Floral buds are embroidered along the front panels in tones close to the ivory silk itself.Their form becomes visible through texture and changing light, capturing the delicate beauty of a flower just before it opens.",
    },
    {
      title: "The London\n Afternoon",
      body: "Noor Flow was imagined for afternoon tea in Mayfair, private lunches, garden salons and summer receptions that continue into evening. Against fine china, pale interiors and late afternoon light, the ivory silk feels entirely at home.",
    },
  ],
  "yaqeen": [
    {
      title: "The Day of Arafah",
      body: "Yaqeen was created in honour of Dhul Hijjah and the Day of Arafah, a day of prayer, mercy and return to Allah.Its name means certainty. The edition honours the assurance that faith can bring, especially when the future has not yet revealed itself.",
    },
    {
      title: "Vines and Pearls",
      body: "Flowing vines are embroidered across the blush silk, their form recalling growth, continuity and life unfolding over time.Pearls are sewn by hand into the composition. Their soft lustre becomes visible with movement, giving the robe the finish of jewellery while allowing the beauty of the silk to remain central.",
    },
    {
      title: "For Days of Meaning",
      body: "Yaqeen was imagined for Eid al-Adha, nikah ceremonies, family celebrations and occasions that become part of a family’s history.The satin catches the light, the pearls illuminate the blush silk and the chiffon completes the ensemble with a delicate final layer. It is a piece for a day remembered not only in photographs, but in the stories told afterwards.",
    },
  ],
  "tatiana": [
    {
      title: "The Meaning\n of Izzah",
      body: "Tatiana was created around izzah, dignity and honour rooted in self-respect.It honours the woman who has passed through difficult seasons without surrendering her standards, her femininity or her sense of worth. Her strength is not performed for others. It has become part of the way she carries herself."

    },
    {
      title: "A Collar\n of Petals",
      body: "Petals are individually applied by hand around the neckline, forming a sculptural floral border against the dark ruby silk.Their layered form draws the eye towards the face and gives the cape a ceremonial finish, like a rose opening at the point where the garment begins.",
    },
    {
      title: "The Ruby Evening",
      body: "Tatiana was imagined for formal dinners, wedding celebrations, theatre evenings and receptions in grand hotel rooms.As daylight fades, the dark ruby silk becomes richer and deeper. The flowing cape and petal neckline complete the look, allowing one colour to carry the entire evening.",
    },
  ],
  "seraphina": [
    {
      title: "Gardens Beneath\n Which Rivers Flow",
      body: "Seraphina began with the Qur’anic image of gardens beneath which rivers flow, a vision of beauty after perseverance and reward beyond what can be seen.Within Rose of Resilience, the garden becomes a symbol of renewal. The petals speak of what patience can preserve until it is ready to bloom.",
    },
    {
      title: "Petals, Placed\n by Hand",
      body: "Each three-dimensional petal is shaped and applied by hand across the silk organza.Their placement gives the shoulders and upper robe a soft sculptural form, while the sheer fabric keeps the effect light. Beneath it, the silk jacquard adds woven pattern and lustre, revealed gradually as the wearer moves.",
    },
    {
      title: "An Occasion in Bloom",
      body: "Seraphina was imagined for garden receptions, wedding celebrations, spring gatherings and evenings where romance sets the tone.Against pale interiors, flowering terraces and candlelit rooms, the blush silk and petalwork reveal their full beauty.",
    },
  ],
  "clara": [
    {
      title: "The Discipline\n of Sabr",
      body: "Within Rose of Resilience, Clara represents sabr: patience not as surrender, but as the discipline of remaining composed while life changes around you.The edition honours the woman who has endured without allowing hardship to define her. Her strength is seen in her judgement, her manners and the way she continues to carry herself.",
    },
    {
      title: "The Tailored Line",
      body: "Raw silk gives Clara its softly structured form, allowing the lapels and full-length silhouette to remain precise without becoming rigid.The silk lining adds weight and ease, while the blush colour softens the traditional language of the formal coat.",
    },
    {
      title: "Composed from\n Day to Evening",
      body: "Clara was imagined for formal lunches, gallery viewings, patron gatherings and elegant occasions that continue into evening.Worn over tonal silk, a column dress or refined tailoring, it creates a look that feels considered from first arrival to final farewell.",
    },
  ],
  "halime": [
    {
      title: "The Light Within",
      body: "Halime was shaped by the idea that light is not something granted by circumstance. It can remain within us, even when the world around us changes.Within Rose of Resilience, the deep pink represents a woman who has lived through difficulty without allowing it to take away her colour, warmth or joy.",
    },
    {
      title: "Transparency and Depth",
      body: "The outer cape is cut from silk organza, allowing air and light to move through the fabric.Beneath it, silk jacquard carries the colour with greater richness. The contrast between the two surfaces gives Halime its dimension: one silk almost weightless, the other luminous and assured.",
    },
    {
      title: "In Full Colour",
      body: "Halime was imagined for wedding celebrations, summer receptions, destination gatherings and evenings when colour should lead the look.",
    },
  ],
  "farhana": [
    {
      title: "After Hardship, Renewal",
      body: "Farhana draws from the Qur’anic promise that ease accompanies hardship.The vine became its central symbol because growth often begins before it can be seen. Beneath the surface, roots are forming, direction is changing and life is preparing to emerge again.",
    },
    {
      title: "Growth Without\n a Pattern",
      body: "Vine motifs are sewn by hand along an asymmetrical path across the salmon raw silk.The leaves and buds do not repeat in a rigid sequence. They climb, turn and open at different points, allowing the embroidery to feel alive against the structured fabric.",
    },
    {
      title: "A New Chapter\n in Colour",
      body: "Farhana was imagined for wedding lunches, garden receptions, destination gatherings and celebrations that mark a new beginning.The salmon raw silk becomes warmer in sunlight, while the organza sleeves move lightly around the hands. It is a robe for occasions filled with optimism, conversation and the pleasure of dressing in colour again.",
    },
  ],
};

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface StructuredProps {
  images?: string[];
  slug?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const Structured: React.FC<StructuredProps> = ({ images, slug }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mobileSwiper, setMobileSwiper] = useState<any>(null);

  useEffect(() => {
    if (mobileSwiper && !mobileSwiper.destroyed && mobileSwiper.activeIndex !== currentIndex) {
      mobileSwiper.slideTo(currentIndex);
    }
  }, [currentIndex, mobileSwiper]);

  const slides = (slug && productSlides[slug]) || productSlides["amara-flame"];
  const totalSlides = images && images.length > 0 ? images.length : slides.length;

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const curImage = images?.[currentIndex] || "";
  const curContent = slides[currentIndex] || slides[0];
  const curIndex = `${currentIndex + 1}`;
  const curTotal = `${totalSlides}`;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit:  (dir: number) => ({ x: dir < 0 ? "100%" : "-100%" }),
  };

  return (
    <section className="structured-outer">
      <div className="structured-sticky">
        {/* Desktop Layout */}
        <div className="structured-desktop-layout">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 1.6, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              {/* ── IMAGE (no blur, no filter, crisp full-cover) ── */}
              <img
                src={curImage}
                alt={curContent.title}
                className="structured-bg__img"
                draggable={false}
                decoding="async"
              />
              <div className="structured-bg__overlay" />

              {/* DESKTOP counter */}
              <div className="structured-counter--desktop font-editorial ">
                <span className="structured-counter__current">{curIndex}</span>
                <span className="structured-counter__sep">/</span>
                <span className="structured-counter__total">{curTotal}</span>
              </div>

              {/* DESKTOP title */}
              <div className="structured-left--desktop">
                <h2 className="structured-left__title">
                  {curContent.title.split("\n").map((line, i, arr) => (
                    <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                  ))}
                </h2>
              </div>

              {/* DESKTOP body */}
              <div className="structured-right--desktop">
                <p className="structured-right__body">{curContent.body}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swiper Layout */}
        <div className="structured-mobile-layout">
          <Swiper
            onSwiper={setMobileSwiper}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            className="h-full w-full"
            slidesPerView={1}
            loop={false}
          >
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const img = images?.[idx] || "";
              const slide = slides[idx] || slides[0];
              return (
                <SwiperSlide key={idx} className="w-full h-full relative">
                  <img
                    src={img}
                    alt={slide.title}
                    className="structured-bg__img"
                    draggable={false}
                    decoding="async"
                  />
                  <div className="structured-bg__overlay" />

                  {/* MOBILE title */}
                  <div className="structured-mobile-title">
                    <h2 className="structured-mobile-title__text">
                      {slide.title.split("\n").map((line, i, arr) => (
                        <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                      ))}
                    </h2>
                  </div>

                  {/* MOBILE body + counter */}
                  <div className="structured-mobile-bottom">
                    <p className="structured-mobile-bottom__body">{slide.body}</p>
                    <span className="structured-mobile-bottom__counter">{idx + 1}/{totalSlides}</span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            className="structured-nav-btn structured-nav-btn--left"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {currentIndex < totalSlides - 1 && (
          <button
            className="structured-nav-btn structured-nav-btn--right"
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      <style>{`
        /* ── OUTER SECTION ── */
        .structured-outer {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          background: #000;
        }
        .structured-sticky {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .structured-desktop-layout {
          display: block;
          width: 100%;
          height: 100%;
        }
        .structured-mobile-layout {
          display: none;
          width: 100%;
          height: 100%;
        }

        /* ── IMAGE: full cover, no blur, no filter ── */
        .structured-bg__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          pointer-events: none;
          /* CRITICAL: no filter, no transform that causes blur */
          image-rendering: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* ── OVERLAY ── */
        .structured-bg__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.15) 0%,
            rgba(0,0,0,0.02) 45%,
            rgba(0,0,0,0.60) 100%
          );
          pointer-events: none;
        }

        /* ── NAV BUTTONS ── */
        .structured-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(250, 247, 242, 0.92);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          transition: background 0.2s ease, transform 0.2s ease;
          color: #281B13;
        }
        .structured-nav-btn:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.06);
        }
        .structured-nav-btn:active {
          transform: translateY(-50%) scale(0.94);
        }
        .structured-nav-btn--left  { left: 32px; }
        .structured-nav-btn--right { right: 32px; }

        /* ── DESKTOP COUNTER ── */
        .structured-counter--desktop {
          position: absolute;
          top: 100px;
          right: 100px;
          display: flex;
          align-items: baseline;
          gap: 2px;
          z-index: 10;
          pointer-events: none;
        }
        .structured-counter__current,
        .structured-counter__sep,
        .structured-counter__total {
          font-size: 32px;
          color:white;
        }

        /* ── DESKTOP TITLE (left-bottom) ── */
        .structured-left--desktop {
          position: absolute;
          bottom: 80px;
          left: 100px;
          max-width: 500px;
          z-index: 10;
          pointer-events: none;
        }
        .structured-left__title {
          font-size: 40px;
          font-weight: 400;
          color: #fff;
          margin: 0;
          white-space: pre-line;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }

        /* ── DESKTOP BODY (right-bottom) ── */
        .structured-right--desktop {
          position: absolute;
          bottom: 80px;
          right: 100px;
          max-width: 340px;
          z-index: 10;
          pointer-events: none;
        }
        .structured-right__body {
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255,255,255,0.88);
          margin: 0;
          text-shadow: 0 1px 6px rgba(0,0,0,0.25);
        }

        /* ── MOBILE hidden by default ── */
        .structured-mobile-title,
        .structured-mobile-bottom { display: none; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .structured-desktop-layout { display: none !important; }
          .structured-mobile-layout { display: block !important; }
          .structured-mobile-layout .swiper { width: 100%; height: 100%; }

          .structured-nav-btn { width: 44px; height: 44px; }
          .structured-nav-btn--left  { left: 16px; }
          .structured-nav-btn--right { right: 16px; }

          .structured-counter--desktop,
          .structured-left--desktop,
          .structured-right--desktop { display: none; }

          .structured-mobile-title {
            display: block;
            position: absolute;
            top: 40px;
            left: 24px;
            right: 24px;
            z-index: 10;
            pointer-events: none;
          }
          .structured-mobile-title__text {
            font-size: 30px;
            font-weight: 400;
            line-height: 1.25;
            color: #fff;
            margin: 0;
            text-shadow: 0 2px 10px rgba(0,0,0,0.35);
          }
          .structured-mobile-bottom {
            display: flex;
            flex-direction: column;
            gap: 14px;
            position: absolute;
            bottom: 48px;
            left: 24px;
            right: 24px;
            z-index: 10;
            pointer-events: none;
          }
          .structured-mobile-bottom__body {
            font-family: "DM Sans", sans-serif;
            font-size: 14px;
            font-weight: 300;
            line-height: 1.6;
            color: rgba(255,255,255,0.88);
            margin: 0;
            text-shadow: 0 1px 6px rgba(0,0,0,0.3);
          }
          .structured-mobile-bottom__counter {
            font-size: 20px;
            color: rgba(255,255,255,0.60);
          }
        }
      `}</style>
    </section>
  );
};

export default Structured;