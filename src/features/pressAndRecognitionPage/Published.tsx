import { motion, AnimatePresence } from "framer-motion";
import { usePublications } from "../../data/usePublications";
import type { PublicationItem } from "../../data/wordpressApi";

function CardContent({ item }: { item: PublicationItem }) {
  return (
    <a
      href={item.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden shrink-0 rounded-[4px] w-[240px] h-[340px] md:w-[317px] md:h-[452px] group cursor-pointer bg-black/5"
    >
      <img
        src={item.image}
        alt={item.title || "Publication background"}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
      />
    </a>
  );
}

function PublishedSkeleton() {
  return (
    <div className="w-full overflow-hidden flex marquee-container opacity-90">
      <div className="flex gap-5 shrink-0 animate-marquee pr-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={`pub-skel-1-${idx}`}
            className="relative overflow-hidden shrink-0 rounded-[4px] w-[240px] h-[340px] md:w-[317px] md:h-[452px] bg-primary-dark/[0.06] animate-shimmer border border-primary-dark/5 flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-15 select-none">
              <span className="font-editorial text-[22px] tracking-widest text-primary-dark uppercase">
                SELHAYA
              </span>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="h-4 w-3/4 bg-primary-dark/[0.1] rounded-sm animate-pulse" />
              <div className="h-3 w-1/2 bg-primary-dark/[0.07] rounded-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 shrink-0 animate-marquee pr-5" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={`pub-skel-2-${idx}`}
            className="relative overflow-hidden shrink-0 rounded-[4px] w-[240px] h-[340px] md:w-[317px] md:h-[452px] bg-primary-dark/[0.06] animate-shimmer border border-primary-dark/5 flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-15 select-none">
              <span className="font-editorial text-[22px] tracking-widest text-primary-dark uppercase">
                SELHAYA
              </span>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="h-4 w-3/4 bg-primary-dark/[0.1] rounded-sm animate-pulse" />
              <div className="h-3 w-1/2 bg-primary-dark/[0.07] rounded-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Published() {
  const { publications, loading } = usePublications();

  return (
    <section className="w-full bg-primary-light py-10 md:py-20 overflow-hidden">
      {/* Heading */}
      <div className="flex flex-col items-center w-full mb-10">
        <h2 className="font-editorial text-text text-center mx-auto px-5 text-[24px] md:text-[32px] max-w-4xl">
          Published reflections on Selhaya's cultural{" "}<br className="hidden lg:block" />{" "}positioning and creative
          philosophy.
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="pub-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <PublishedSkeleton />
          </motion.div>
        ) : publications.length === 0 ? (
          <motion.div
            key="pub-empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto px-6"
          >
            <p className="text-[14px] uppercase tracking-widest text-text/50 mb-2">
              Reflections &amp; Press
            </p>
            <h3 className="font-editorial text-[24px] md:text-[28px] text-text">
              Reflections will be published soon.
            </h3>
          </motion.div>
        ) : (
          <motion.div
            key="pub-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full overflow-hidden flex marquee-container"
          >
            <div className="flex gap-5 shrink-0 animate-marquee pr-5">
              {publications.map((item, idx) => (
                <CardContent key={`first-${item.id}-${idx}`} item={item} />
              ))}
            </div>
            <div className="flex gap-5 shrink-0 animate-marquee pr-5" aria-hidden="true">
              {publications.map((item, idx) => (
                <CardContent key={`second-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}