import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HeroSection from "../../HeroSection";
import HouseQuietlyGives from "../../global/HouseQuitelyGives";
import { useJournalArticles } from "../../../data/useWordPressJournal";
import JournalSkeleton from "./JournalSkeleton";
import SEO from "../../SEO";
import { SEO_CONFIG } from "../../../config/seo";

const exploreMore = [
    { title: "Maison milestones", href: "/journal/maison-milestones", image: "/images/journal/philosophy.png" },
    { title: "The House & Collections", href: "/journal/the-house-and-collections", image: "/images/journal/house.png" },
    { title: "Founder Notes", href: "/journal/founder-notes", image: "/images/journal/founder.png" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12 },
    }),
};

export default function CoutureAndCraftPage() {
    const { articles, loading } = useJournalArticles("couture-and-craft");
    const [currentPage, setCurrentPage] = useState(1);
    const ARTICLES_PER_PAGE = 4;

    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const currentArticles = articles.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

    return (
        <>
            <SEO
                title={SEO_CONFIG.coutureAndCraft.title}
                description={SEO_CONFIG.coutureAndCraft.description}
                canonical={SEO_CONFIG.coutureAndCraft.canonical}
                type="article"
            />
            <HeroSection
                image="/images/journal/hero.png"
                title="Thoughts Carried Through Heritage"
                desktopText={<>Reflections that weave past and present into  timeless conversation.</>}
                mobileText="Reflections that weave past and present into timeless conversation."
            />

            {/* Category label */}
            <section className="bg-primary-light pt-16 pb-4 px-6 text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[16px] uppercase mb-10"
                >
                    Journals
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-[32px] capitalize"
                >
                    Couture &amp; Craft
                </motion.h2>
            </section>

            {/* Articles grid */}
            <section className="bg-primary-light py-10 px-6 md:px-12 lg:px-20">
                {loading ? (
                    <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-6 md:gap-y-14 max-w-5xl mx-auto">
                        <JournalSkeleton count={4} />
                    </div>
                ) : articles.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <p className="text-[14px] uppercase tracking-widest text-text/50 mb-4">Couture &amp; Craft</p>
                        <h3 className="text-[28px] md:text-[36px] text-text">Our journal is coming soon.</h3>
                    </motion.div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-6 md:gap-y-14 max-w-5xl mx-auto">
                            {currentArticles.map((article, i) => (
                                <motion.article
                                    key={article.slug}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="flex flex-col gap-4 group"
                                >
                                    <Link to={`/journal/read/${article.slug}`} className="overflow-hidden block">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="aspect-[4/3] w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </Link>
                                    <div className="flex flex-col gap-6">
                                        <span className="hidden md:block text-[12px]">
                                            {article.date}
                                        </span>
                                        <Link to={`/journal/read/${article.slug}`}>
                                            <h2 className="text-[12px] md:text-[24px] leading-snug text-text line-clamp-2">
                                                {article.title}
                                            </h2>
                                        </Link>
                                        <Link to={`/journal/read/${article.slug}`}>
                                            <span className="hidden md:block text-[20px] underline hover:scale-105 transition-transform duration-700 block w-fit">Enter</span>
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        {/* Pagination numbers */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-4 mt-16 dm-sans">
                                <span
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className={`flex items-center justify-center w-8 h-8 text-[14px] cursor-pointer rounded-full ${currentPage === 1 ? 'text-primary-dark/30 pointer-events-none' : 'text-primary-dark hover:bg-primary-dark/10'}`}
                                >
                                    {'<'}
                                </span>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                    <span
                                        key={num}
                                        onClick={() => setCurrentPage(num)}
                                        className={`flex items-center justify-center w-8 h-8 rounded-full text-[14px] cursor-pointer transition-colors ${num === currentPage ? "bg-primary-dark text-primary-light" : "text-primary-dark hover:bg-primary-dark/10"}`}
                                    >
                                        {num}
                                    </span>
                                ))}
                                <span
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className={`flex items-center justify-center w-8 h-8 text-[14px] cursor-pointer rounded-full ${currentPage === totalPages ? 'text-primary-dark/30 pointer-events-none' : 'text-primary-dark hover:bg-primary-dark/10'}`}
                                >
                                    {'>'}
                                </span>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Explore More */}
            <section className="bg-choclate-brown py-24 px-6 md:px-12 lg:px-20 text-primary-light">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-[32px] uppercase mb-10"
                >
                    Thoughts carried through heritage
                </motion.h3>
                <div className="hidden sm:grid sm:grid-cols-3 gap-6">
                    {exploreMore.map((item, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-col gap-3 group"
                        >
                            <Link to={item.href} className="overflow-hidden block">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </Link>
                            <Link
                                to={item.href}
                                className="text-[24px] font-editorial md:text-[28px] mt-10"
                            >
                                {item.title}
                            </Link>
                        </motion.div>
                    ))}
                </div>
                <div className="block sm:hidden w-full relative">
                    <Swiper slidesPerView={1} spaceBetween={16}>
                        {exploreMore.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col gap-3 group">
                                    <Link to={item.href} className="overflow-hidden block">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </Link>
                                    <Link
                                        to={item.href}
                                        className="text-[24px] font-editorial mt-6 block"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <HouseQuietlyGives
                title="The House of Selhaya"
                description="The Maison was born not only from elegance, but from intention. From the beginning, Selhaya was created with the belief that beauty should carry meaning and that every creation should leave something gentle behind."
                image="/images/journal/openLastLeft.png"
                sideImage="/images/journal/openLastRight.png"
                buttonText="EXPLORE THE HOUSE OF SELHAYA"
                buttonHref="/the-house-of-selhaya"
            />
        </>
    );
}
