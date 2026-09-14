import { motion } from "framer-motion";
import HeroSection from "../HeroSection";
import { Link } from "react-router-dom";
import HouseQuietlyGives from "../global/HouseQuitelyGives";
// import { useJournalArticles } from "../../data/useWordPressJournal";
import FloatingLogo from "../global/FloatingLogo";
import JournalSection from "../home/JournalSection";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

function Journal() {
    const philosophyData = [
        {
            image: "/images/journal/philosophy.png",
            title: "Maison milestones",
            link: "maison-milestones"
        },
        {
            image: "/images/journal/craft.png",
            title: "Couture & Craft",
            link: "couture-and-craft"
        },
        {
            image: "/images/journal/house.png",
            title: "The House & Collections",
            link: "the-house-and-collections"
        },
        {
            image: "/images/journal/founder.png",
            title: "Founder Notes",
            link: "founder-notes"
        },
    ];

    // Fetch latest posts from WordPress for the bottom "Discover" section
    // const { articles: latestPosts, loading } = useJournalArticles();

    // Map the latest 3 posts into the shape DiscoverPureSilk expects
    // const journalData = loading
    //     ? [
    //         {
    //             title: "Craft Philosophy",
    //             description:
    //                 "The materials, the techniques, and the philosophy of how the Maison makes what it makes.",
    //             image: "/images/journal/journal1.png",
    //             href: "/craft-philosophy",
    //             buttonText: "ENTER",
    //         },
    //         {
    //             title: "Our Recognition",
    //             description:
    //                 "The materials, the techniques, and the philosophy of how the Maison makes what it makes.",
    //             image: "/images/journal/journal2.png",
    //             href: "/our-recognition",
    //             buttonText: "ENTER",
    //         },
    //         {
    //             title: "Advisory",
    //             description:
    //                 "The materials, the techniques, and the philosophy of how the Maison makes what it makes.",
    //             image: "/images/journal/journal3.png",
    //             href: "/advisory",
    //             buttonText: "ENTER",
    //         },
    //     ]
    //     : latestPosts.slice(0, 3).map((post) => ({
    //         title: post.title,
    //         description: post.description,
    //         image: post.image,
    //         href: `/journal/read/${post.slug}`,
    //         buttonText: "ENTER",
    //     }));

    const customJournalItems = [
        {
            key: "journal-page-1",
            title: "Selhaya Craft",
            desc: "The materials, the techniques, and the philosophy of how the Maison makes what it makes.",
            link: "/selhaya-craft",
            img: "/images/journal/craft1.png",
            alt: "Selhaya Craft"
        },
        {
            key: "journal-page-2",
            title: "Press & Recognition",
            desc: "The impact of SELHAYA. From the beginning of the  journey",
            link: "/press-and-recognition",
            img: "/images/home/journal2.png",
            alt: "Press & Recognition"
        },
        {
            key: "journal-page-3",
            title: "Advisory",
            desc: "The consultation. Tailored advice for you from SELHAYA founders.",
            link: "/advisory",
            img: "/images/advisory/advisoryHero.png",
            alt: "Advisory"
        }
    ];



    return (
        <>
            <SEO
                title={SEO_CONFIG.journal.title}
                description={SEO_CONFIG.journal.description}
                canonical={SEO_CONFIG.journal.canonical}
            />
            <HeroSection
                image="/images/journal/journalHome.webp"
                title="Thoughts carried through heritage"
                desktopText={
                    <>
                        Reflections that weave past and present into <br />
                        timeless conversation.
                    </>
                }
                mobileText="Reflections that weave past and present into timeless conversation."
            />
            <FloatingLogo />

            {/* 2nd section */}
            <section className="relative py-24 px-6 md:px-12 bg-section-bg z-1 text-text">
                <div className="text-center flex flex-col gap-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="hidden md:block text-[24px] md:text-[28px]"
                    >
                        The Silence of Stillness : Exploring how <br />
                        moments of pause have shaped traditions across cultures.
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:hidden text-[24px]"
                    >
                        The Silence of Stillness : Exploring how moments of
                        pause have shaped traditions across cultures.
                    </motion.h1>
                </div>
            </section>

            {/* philosophy grid section */}
            <section className="bg-primary-light py-16 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-2 gap-x-4 md:gap-x-10 gap-y-6 md:gap-y-6 lg:max-w-5xl mx-auto">
                    {philosophyData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col"
                        >
                            <Link to={"/journal/" + item.link} className="overflow-hidden relative group">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="aspect-4/3 w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                            </Link>
                            <div className="w-full pt-3 font-editorial text-[16px] md:text-[24px] text-text">
                                {item.title}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <HouseQuietlyGives
                title="The House of Selhaya →"
                description="The Maison was born not only from elegance, but from intention. From the beginning, Selhaya was created with the belief that beauty should carry meaning and that every creation should leave something gentle behind."
                sideImage="/images/journal/selhayaLast.png"
                buttonText="EXPLORE THE HOUSE OF SELHAYA"
                buttonHref="/the-house-of-selhaya"
                arrow={true}
            />
            <JournalSection
                title={
                    <>
                        The House Journal.<br />
                        Preserving Memory.
                    </>
                }
                description="The House Journal is more than writing, it is memory preserved. Essays, chronicles, and patron stories, each reflecting the rhythm of heritage and the luxury of reflection."
                items={customJournalItems}
            />
        </>
    );
}

export default Journal;