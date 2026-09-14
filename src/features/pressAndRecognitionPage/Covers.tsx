import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import { usePressArticles } from "../../data/usePressArticles";

function CoversSkeletonMobile() {
  return (
    <div className="block md:hidden mt-10 w-full overflow-hidden px-6">
      <div className="flex flex-col w-full">
        {/* Cover Image Skeleton */}
        <div className="relative overflow-hidden w-full aspect-[4/3] bg-primary-dark/[0.06] rounded-[2px] animate-shimmer">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
            <span className="font-editorial text-[20px] tracking-widest text-primary-dark uppercase">
              SELHAYA
            </span>
          </div>
        </div>

        {/* Title & Page number skeleton */}
        <div className="flex items-start justify-between mt-5 w-full">
          <div className="h-6 w-2/3 bg-primary-dark/[0.08] animate-pulse rounded-sm" />
          <div className="h-4 w-10 bg-primary-dark/[0.08] animate-pulse rounded-sm shrink-0 ml-4 mt-1" />
        </div>

        {/* Action link skeleton */}
        <div className="mt-3 w-full">
          <div className="h-4 w-28 bg-primary-dark/[0.08] animate-pulse rounded-sm" />
        </div>
      </div>
    </div>
  );
}

function CoversSkeletonDesktop() {
  return (
    <div className="hidden md:flex flex-col items-center max-w-6xl mx-auto mt-10 px-10 xl:px-[120px] w-full">
      <div className="grid grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-[40px] w-full">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={`skel-cover-${idx}`} className="flex flex-col w-full">
            {/* Image placeholder */}
            <div className="relative overflow-hidden w-full aspect-[4/3] bg-primary-dark/[0.06] rounded-[2px] animate-shimmer">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none">
                <span className="font-editorial text-[22px] tracking-widest text-primary-dark uppercase">
                  SELHAYA
                </span>
              </div>
            </div>

            {/* Title & Date bar placeholder */}
            <div className="flex items-center justify-between mt-5 w-full">
              <div className="h-6 w-3/5 bg-primary-dark/[0.08] animate-pulse rounded-sm" />
              <div className="h-3.5 w-20 bg-primary-dark/[0.08] animate-pulse rounded-sm shrink-0 ml-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-16 flex items-center justify-center gap-6">
        <div className="h-4 w-20 bg-primary-dark/[0.06] animate-pulse rounded-sm" />
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 bg-primary-dark/[0.09] animate-pulse rounded-full" />
          <div className="h-6 w-6 bg-primary-dark/[0.05] animate-pulse rounded-full" />
        </div>
        <div className="h-4 w-16 bg-primary-dark/[0.06] animate-pulse rounded-sm" />
      </div>
    </div>
  );
}

export default function Covers() {
  const { articles, loading } = usePressArticles();

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const desktopItems = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="py-20 bg-primary-light">
      <div className="flex flex-col items-center w-full">
        {/* Label */}
        <p className="text-[16px] md:mb-6 uppercase text-text">
          International Covers
        </p>

        {/* Headline */}
        <h4 className="font-editorial text-text text-center mt-4 mx-auto px-5 text-[24px] md:text-[32px]">
          Selhaya establishes authority through{" "}<br className="hidden lg:block" />{" "}presence alone. No captions. No commentary.{" "}<br className="hidden lg:block" />{" "}The covers speak without interpretation.
        </h4>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="covers-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <CoversSkeletonMobile />
            <CoversSkeletonDesktop />
          </motion.div>
        ) : articles.length === 0 ? (
          <motion.div
            key="covers-empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto px-6"
          >
            <p className="text-[14px] uppercase tracking-widest text-text/50 mb-2">
              Press &amp; Recognition
            </p>
            <h3 className="font-editorial text-[24px] md:text-[28px] text-text">
              Covers will be published soon.
            </h3>
          </motion.div>
        ) : (
          <motion.div
            key="covers-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* ── Mobile View (Swiper) ── */}
            <div className="block md:hidden mt-10 w-full overflow-hidden">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
              >
                {articles.map((article, idx) => (
                  <SwiperSlide key={article.id}>
                    <a
                      href={article.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col w-full px-6"
                    >
                      <div className="w-full overflow-hidden bg-black/5 rounded-[2px]">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="flex items-start justify-between mt-5 w-full">
                        <h4 className="font-editorial text-left text-[24px] leading-none text-text">
                          {article.title}
                        </h4>
                        <span className="dm-sans text-right shrink-0 ml-4 text-[14px] mt-1 text-text">
                          {idx + 1}/{articles.length}
                        </span>
                      </div>
                      <div className="mt-2 w-full">
                        <span className="dm-sans underline underline-offset-4 text-left block text-[16px] font-medium text-text mt-2">
                          READ ARTICLE &rarr;
                        </span>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ── Desktop View (Grid) ── */}
            <div className="hidden md:flex flex-col items-center max-w-6xl mx-auto mt-10 px-10 xl:px-[120px]">
              <div className="grid grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-[40px] w-full">
                {desktopItems.map((article) => (
                  <a
                    href={article.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={article.id}
                    className="cursor-pointer flex flex-col w-full group"
                  >
                    <div className="overflow-hidden w-full bg-black/5 rounded-[2px]">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-5 w-full">
                      <h4 className="text-[24px] font-editorial text-text group-hover:opacity-80 transition-opacity">
                        {article.title}
                      </h4>
                      <span className="text-right shrink-0 ml-4 text-[12px] uppercase tracking-wide text-text">
                        {article.date}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-6 dm-sans text-[14px] text-text">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`font-editorial transition-opacity ${
                      currentPage === 1
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:opacity-70 cursor-pointer"
                    }`}
                  >
                    &larr; Previous
                  </button>
                  <div className="flex items-center gap-3">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? "font-medium"
                              : "opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                          }
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`font-editorial transition-opacity ${
                      currentPage === totalPages
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:opacity-70 cursor-pointer"
                    }`}
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}