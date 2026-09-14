import { useRef, useState } from "react";
import { motion } from "framer-motion";
import discoverWave from "../../assets/haya-images/discover/wave.png";
import discoverHeritage from "../../assets/haya-images/discover/heritage1.png";

// All 4 collections — Haya uses the navbar image (public folder)
const ALL_COLLECTIONS = [
  {
    id: 1,
    name: "Waves of Light",
    image: discoverWave,
    href: "/selhaya-collections/waves-of-light",
  },
  {
    id: 2,
    name: "Rose of Resilience",
    // Using the navbar/public image for Rose of Resilience
    image: "/images/navbar/selhayaCollections/rose.png",
    href: "/selhaya-collections/rose-of-resilience",
  },
  {
    id: 3,
    name: "Heritage",
    image: discoverHeritage,
    href: "/selhaya-collections/heritage",
  },
  {
    id: 4,
    name: "Haya",
    // Using the navbar image as requested by user
    image: "/images/navbar/selhayaCollections/haya1.png",
    href: "/selhaya-collections/haya",
  },
];

export type CollectionName = "Waves of Light" | "Rose of Resilience" | "Heritage" | "Haya";

type DiscoverProps = {
  /** Pass the current page's collection name to exclude it from the list. Always shows 3 cards. */
  exclude?: CollectionName;
};

export default function Discover({ exclude }: DiscoverProps) {
  // Filter out the current page's collection, always 3 cards
  const collections = ALL_COLLECTIONS.filter((c) => c.name !== exclude).slice(0, 3);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const gap = 32;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(newIndex);
  };

  return (
    <div className="w-full bg-choclate-brown text-primary-light py-16 px-6 md:px-12 md:h-screen md:overflow-hidden md:flex md:flex-col md:justify-center">
      <div className="max-w-7xl mx-auto w-full md:h-[80vh] md:max-h-[850px] flex flex-col md:min-h-0">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:shrink-0"
        >
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-[14px] md:text-[36px] w-full md:w-1/2 editorial-heading leading-tight"
          >
            Journey through the Selhaya Collections
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full md:w-1/2 flex flex-col items-center justify-between md:items-end gap-3"
          >
            <p className="text-[14px] text-left md:max-w-[340px] text-white">
             Each collection opens a different world of the House: heritage, travel, ceremony and the private rituals of dress. Made in pure silk, natural fibres and limited releases, Selhaya pieces are created to be desired, worn and kept within a personal archive.
            </p>
          <a  href="/the-selhaya-editions"
  className="hidden md:flex luxury-label text-primary-light  md:py-0 underline underline-offset-4 hover:opacity-60 transition-opacity shrink-0"
>
  Explore All Collections →
</a>
          </motion.div>
        </motion.div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible hide-scrollbar mt-12 pb-4 md:pb-0 md:flex-1 md:min-h-0"
        >
          {collections.map((col, index) => (
            <motion.a
              href={col.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.15 }}
              key={col.id}
              className="flex-none w-[78vw] sm:w-[60vw] md:w-auto snap-start flex flex-col group cursor-pointer md:h-full md:min-h-0 no-underline"
            >
              {/* Image */}
              <div className="aspect-[3/4] md:aspect-auto md:flex-1 md:min-h-0 overflow-hidden bg-primary-dark mb-4">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Label */}
              <div className="space-y-2 md:shrink-0">
                <h3 className="text-[22px] editorial-subheading text-primary-light">
                  {col.name}
                </h3>
                <span className="luxury-label text-[9px] md:text-[13px] text-primary-light underline underline-offset-1 hover:opacity-60 transition-opacity block">
                  Explore Collection →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Dot indicators — mobile only */}
        <div className="flex justify-center gap-2 md:hidden">
          {collections.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i
                ? "bg-primary-light scale-125"
                : "bg-secondary-2 opacity-50"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}