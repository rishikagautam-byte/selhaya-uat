import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HeroSection from "../../HeroSection";
import { useJournalArticle } from "../../../data/useWordPressJournal";
// import Journal from "../Journal";
import JournalSection, { type JournalItem } from "../../home/JournalSection";
import collectionImg from "../../../assets/main-product/heroMobile.png"
import SEO from "../../SEO";

const tempCtas: JournalItem[] = [
    {
        title: "The house of Selhaya",
        num: "1/3",
        desc: <p> A Luxury House of beauty and vision.</p>,
        link: "/the-house-of-selhaya",
        img: "/images/home/journal1.png",
        alt: "The Craft"
    },
    {
        title: "Selhaya Collections",
        num: "2/3",
        desc: <p>Each Edition is crafted in pure silk. Each carries its own lineage.</p>,
        link: "/selhaya-collections",
        img: collectionImg,
        alt: "Selhaya Collections"
    },
    {
        title: "⁠Cultural Alliance",
        num: "3/3",
        desc: <p>Selhaya operates where heritage, diplomacy, and modern luxury converge.</p>,
        link: "/cultural-alliance",
        img: "/images/alliance/allianceHero.webp",
        alt: "Cultural Alliance"
    }
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12 },
    }),
};

const exploreMore = [
    { title: "Maison milestones", href: "/journal/maison-milestones", image: "/images/journal/philosophy.png" },
    { title: "Couture & Craft", href: "/journal/couture-and-craft", image: "/images/journal/craft.png" },
    { title: "The House & Collections", href: "/journal/the-house-and-collections", image: "/images/journal/house.png" },
];

/** Skeleton for the article read page */
function ArticleSkeleton() {
    return (
        <section className="bg-primary-light py-24 px-6 md:px-12 lg:px-20 text-text">
            <div className="max-w-4xl mx-auto">
                {/* Date */}
                <div className="h-4 w-32 bg-primary-dark/[0.07] animate-pulse rounded-sm mb-4" />
                {/* Title */}
                <div className="h-8 w-3/4 bg-primary-dark/[0.07] animate-pulse rounded-sm mb-3" />
                <div className="h-8 w-1/2 bg-primary-dark/[0.07] animate-pulse rounded-sm mb-12" />
                {/* Paragraphs */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="mb-10">
                        <div className="h-6 w-48 bg-primary-dark/[0.07] animate-pulse rounded-sm mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-primary-dark/[0.07] animate-pulse rounded-sm" />
                            <div className="h-4 w-full bg-primary-dark/[0.07] animate-pulse rounded-sm" />
                            <div className="h-4 w-5/6 bg-primary-dark/[0.07] animate-pulse rounded-sm" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function ReadJournalPage() {
    const { slug } = useParams<{ slug: string }>();

    if (!slug) {
        return <Navigate to="/journal" replace />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { article, allArticles, loading } = useJournalArticle(slug);
    if (article) {
        console.log("Hero Image:", article.heroImage);
    }

    if (loading) {
        return (
            <>
                <HeroSection
                    image="/images/journal/journalHome.png"
                    title=""
                    desktopText=""
                    mobileText=""
                />
                <ArticleSkeleton />
            </>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-primary-light flex flex-col items-center justify-center text-text p-6">
                <h1 className="text-[36px] font-editorial mb-4">Article Not Found</h1>
                <p className="dm-sans mb-8 opacity-80">The journal entry you are looking for does not exist or has been moved.</p>
                <Link to="/journal" className="underline uppercase r text-[14px]">
                    Back to Journals
                </Link>
            </div>
        );
    }

    const categoryArticles = allArticles.filter(
        (a) => a.category === article.category
    );

    const currentIndex = categoryArticles.findIndex(
        (a) => a.slug === article.slug
    );

    const nextArticle =
        categoryArticles.length > 1
            ? categoryArticles[
            (currentIndex + 1) % categoryArticles.length
            ]
            : null;

    // // Only show journals from the same category
    // const relatedArticles = allArticles
    //     .filter(
    //         (a) =>
    //             a.slug !== article.slug &&
    //             a.category === article.category
    //     )
    //     .slice(0, 3);

    // Decide whether to render raw WP HTML or structured sections
    const hasWpContent = !!article.contentHtml && article.contentHtml.trim().length > 0;

    return (
        <>
            <SEO
                title={`${article.title} | SELHAYA®️`}
                description={article.excerpt ? article.excerpt.replace(/<[^>]*>?/gm, '').trim() : 'Read stories, essays, and editorials from SELHAYA.'}
                canonical={`/journal/read/${slug}`}
                type="article"
                image={article.heroImage}
            />
            <HeroSection
                image={article.heroImage}
                title={article.heroTitle || article.title}
                desktopText=""
                mobileText=""
            />

            {/* Breadcrumb & Subtitle
            <section className="bg-primary-light pt-12 pb-4 px-6 md:px-12 lg:px-20 text-text">
                <div className="max-w-4xl mx-auto">
                    <nav className="text-[12px] md:text-[14px] uppercase r mb-8 text-primary-dark/60 flex items-center gap-2">
                        <Link to="/" className="hover:text-primary-dark transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/journal" className="hover:text-primary-dark transition-colors">Journals</Link>
                        <span>/</span>
                        <span className="text-primary-dark">{article.category}</span>
                    </nav>
                </div>
            </section> */}

            {/* Article Content */}
            <section className="bg-primary-light pb-10 pt-20 px-6 md:px-12 lg:px-20 text-text">
                <div className="max-w-4xl mx-auto">

                    <span className="text-[14px] md:text-[16px] uppercase st text-primary-dark/80 block mb-3 font-medium">
                        {article.date}
                    </span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[28px] lg:text-[32px] mb-4"
                    >
                        {article.title}
                    </motion.h1>

                    {hasWpContent ? (
                        /* Render WordPress HTML content directly */
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="wp-content max-w-3xl"
                            dangerouslySetInnerHTML={{ __html: article.contentHtml! }}
                        />
                    ) : (
                        /* Fallback: render structured sections */
                        <div className="flex flex-col gap-12 text-[16px] md:text-[18px] ont-dm-sans text-primary-dark/90 max-w-3xl">
                            {article.sections.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="flex flex-col gap-4"
                                >
                                    {section.heading && (
                                        <h2 className="text-[24px] md:text-[32px] font-editorial uppercase r text-primary-dark mt-4">
                                            {section.heading}
                                        </h2>
                                    )}
                                    <p>{section.paragraph}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Next Journal Link */}
                    {nextArticle && nextArticle.slug !== article.slug && (
                        <div className="flex justify-center mt-20 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <Link
                                to={`/journal/read/${nextArticle.slug}`}
                                className="text-[14px] font-medium"
                            >
                                Read More Journals
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <JournalSection
                title=<>The House of SELHAYA</>
                description="A unique understanding of creation and careful process "
                items={tempCtas}
                bgColor="bg-choclate-brown"
                textColor="text-primary-light"
                cardImageBg="bg-primary-light"
                rigthDescWidth="1/2"
            />

            {/* Related journals section */}
            {/* <section className="bg-section-bg py-20 px-6 md:px-12 lg:px-20 ">
                <div className="">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-[24px] md:text-[32px] uppercase mb-6"
                    >
                        Journals
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {relatedArticles.map((item, i) => (
                            <motion.article
                                key={item.slug}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col gap-4 group"
                            >
                                <Link to={`/journal/read/${item.slug}`} className="overflow-hidden block">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>
                                <div className="flex flex-col gap-4 mt-2">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="text-[24px]  group-hover:text-black transition-colors line-clamp-1">
                                            {item.title}
                                        </h4>
                                        <span className="text-[12px]">
                                            {item.date}
                                        </span>
                                    </div>
                                    <p className="text-[16px] line-clamp-1">
                                        {item.description}
                                    </p>
                                    <Link
                                        to={`/journal/read/${item.slug}`}
                                        className="text-[16px] hover:text-black transition-colors block w-fit underline"
                                    >
                                        ENTER
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section> */}

            <section className="bg-choclate-brown pb-20 px-6 md:px-12 lg:px-20 text-primary-light">
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
        </>
    );
}
