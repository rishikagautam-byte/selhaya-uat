import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js";
import JournalSection from "../home/JournalSection.js";
import FloatingLogo from "../global/FloatingLogo.js";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSection from "../HeroSection.js";
import { useState } from "react";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function Maison() {
    return (
        <>
            <SEO
                title={SEO_CONFIG.house.title}
                description={SEO_CONFIG.house.description}
                canonical={SEO_CONFIG.house.canonical}
            />
            {/* existing page */}
            <MaisonContent />
        </>
    );
}

function MaisonContent() {
    const [selectedFounder, setSelectedFounder] = useState("aisha");

    // const techniques = [
    //     {
    //         title: "Zari Handwork",
    //         img: "/images/craft/art1.svg",
    //         alt: "Zari Handwork",
    //     },
    //     {
    //         title: "Threading Patterns",
    //         img: "/images/craft/art2.svg",
    //         alt: "Threading Patterns",
    //     },
    //     {
    //         title: "Silk Embroidery",
    //         img: "/images/craft/art3.svg",
    //         alt: "Silk Embroidery",
    //     },
    //     {
    //         title: "Stonework Handsewn",
    //         img: "/images/craft/art4.svg",
    //         alt: "Stonework Handsewn",
    //     },
    // ];

    return (
        <div>
            {/* hero section */}
            <HeroSection image={"/images/maison/maisonHero.png"}
                title={"The House of Selhaya"}
                desktopText=<> <p>A Luxury House of beauty and vision.</p>
                </>
                mobileText="A Luxury House of beauty and vision."
            />


            <FloatingLogo />

            {/* 2nd section */}
            <section className="relative py-20 px-6 md:px-12 bg-section-bg z-1 text-text">
                <motion.div
                    className="text-center flex flex-col gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3
                        variants={fadeUp}
                        className="text-[24px] md:text-[32px]"
                    >
                        The World’s First Luxury Abaya Maison.
                    </motion.h3>
                    <motion.div
                        variants={fadeUp}
                        className="space-y-6 text-[16px] md:text-[20px] w-full lg:w-4xl mx-auto"
                    >
                        <p>
                            SELHAYA has become a Brand of exemplary cultural heritage and fine art in its own right.
                        </p>

                        <p>
                            From paper to hand crafted artisanal execution, every step in the creation carries meaningful weight and emotion.
                        </p>
                        <p className=" italic">
                            Strength. Grace. Beauty.
                        </p>
                        <p>
                            The very essence of every woman enchanted by SELHAYA elegance.
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* History of Silk Robes */}
            <section className="flex flex-col lg:flex-row bg-primary-light text-text w-full">
                <div className="hidden md:block w-full lg:w-1/2 min-h-[400px]">
                    <img src="/images/maison/silks.webp" alt="Sewing with golden thread" className="w-full h-full object-cover" />
                </div>
                <div className="w-full lg:w-1/2 px-8 pt-10 md:px-16 flex flex-col justify-center">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-[28px] md:text-[32px] mb-4 md:mb-10"
                    >
                        History of Silk Robes
                    </motion.h2>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6  py-6"
                    >
                        <motion.div variants={fadeUp}>
                            <h3 className="text-[16px] md:text-[24px] dm-sans font-semibold tracking-tight uppercase mb-2">CHINA: THE BIRTHPLACE OF SILK</h3>
                            <p className="text-[12px] md:text-[16px] font-light">
                                Silk robes were a woman's primary user interface for navigating high society, communicating her exact familial rank, status, and virtue at a single glance. Elite women wore these highly regulated, flowing garments as canvas for complex embroidered motifs.
                            </p>
                        </motion.div>
                        <hr className="border-t border-black/40" />
                        <motion.div variants={fadeUp}>
                            <h3 className="text-[16px] md:text-[24px] dm-sans font-semibold tracking-tight uppercase mb-2">JAPAN: THE MASTERY OF THE KIMONO</h3>
                            <p className="text-[12px] md:text-[16px] font-light">
                                For women in ancient Japan, silk robes—most iconically the multi-layered Junihitoe—were the ultimate visual interface for social currency and political influence. A woman's success depended on her ability to flawlessly coordinate up to twelve precision-layered robes to match the exact season, weather, and occasion.
                            </p>
                        </motion.div>
                        <hr className="border-t border-black/40" />
                        <motion.div variants={fadeUp}>
                            <h3 className="text-[16px] md:text-[24px] dm-sans font-semibold tracking-tight uppercase mb-2">THE BYZANTINE EMPIRE: IMPERIAL ROBES</h3>
                            <p className="text-[12px] md:text-[16px] font-light">
                                For women in the Byzantine Empire, heavy silk robes served as an exclusive visual layer of imperial authority, religious devotion, and strict court hierarchy. Because the state maintained a strict monopoly on silk production, elite women wore these garments frequently dyed in rich pigments and encrusted with meticulous pearl embroidery.
                            </p>
                        </motion.div>
                        <hr className="border-t border-black/40" />
                        <motion.div variants={fadeUp}>
                            <h3 className="text-[16px] md:text-[24px] dm-sans font-semibold tracking-tight uppercase mb-2">THE OTTOMAN EMPIRE: ROBES OF THE SULTANS</h3>
                            <p className="text-[12px] md:text-[16px] font-light">
                                For women in the Ottoman Empire—particularly within the Imperial Harem—luxurious silk robes were a highly competitive visual interface for negotiating power, favor, and hierarchy.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Selhaya Techniques */}
            {/* <section className="bg-primary-light py-10 md:py-20 px-6 md:px-12 text-text">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-[28px] md:text-[32px]"
                    >
                        Selhaya Techniques
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <Link to="/selhaya-craft" className="text-[12px] md:text-[14px] uppercase hover:scale-105 transition-all flex items-center gap-2">
                            <span className="underline">SELHAYA CRAFT</span> &rarr;
                        </Link>
                    </motion.div>
                </div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {techniques.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="flex flex-col gap-4 group"
                        >
                            <div className="aspect-square overflow-hidden bg-section-bg">
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <h3 className="text-[16px] md:text-[20px] font-editorial">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>


                <div className="md:hidden">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={16}
                        className="techniques-swiper"
                    >
                        {techniques.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col gap-4">
                                    <div className="aspect-[4/5] overflow-hidden bg-section-bg">
                                        <img
                                            src={item.img}
                                            alt={item.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[18px] font-editorial">
                                            {item.title}
                                        </h3>

                                        <span className="text-[14px]">
                                            {index + 1}/{techniques.length}
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section> */}

            {/* Founders Section */}
            <section className="relative py-12 md:py-20 px-6 md:px-12 bg-choclate-brown text-primary-light  z-10">
                <motion.div
                    className="flex flex-col items-center gap-10 md:gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeUp} className="text-center space-y-4">
                        <p className="text-[16px] md:text-[24px] uppercase">
                            Founders
                        </p>
                        <h2 className="text-[24px] md:text-[32px] max-w-6xl mx-auto ">
                            Aisha and Sajjad collectively offer individual and company advisory services via SELHAYA as Luxury Business Consultants.
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 md:gap-12 w-full max-w-4xl">
                        <div className="flex flex-col gap-6 md:block md:relative md:overflow-hidden">
                            <div className="relative w-full overflow-hidden group">
                                <img
                                    src="/images/maison/aisha.png"
                                    alt="Aisha"
                                    onClick={() => {
                                        setSelectedFounder('aisha');
                                    }}
                                    className="w-full lg:h-[500px] object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                                <div className="hidden md:flex md:absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col items-center justify-center p-8">
                                    <h4 className="text-[24px] text-primary-light mb-2">Aisha Hossian</h4>
                                    <p className="text-[12px] uppercase text-center">Founder & Creative Director</p>
                                    <div className="text-[16px] text-center mt-12 space-y-4">
                                        <p>
                                            Aisha shapes the creative language of the Maison through silhouette, material, and cultural storytelling.
                                        </p>
                                        <p>
                                            Her vision for Selhaya emerged through her experiences across London and the Middle East bringing together British structure with the softness and dignity of the abaya.

                                        </p>
                                        <p>
                                            Every garment begins through her study of movement, fabric, and presence.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:hidden text-left text-primary-light">
                                <h4 className="text-[16px]">Aisha Hossian</h4>
                                <p className="text-[10px] dm-sans uppercase mt-1">Founder & Creative Director</p>

                            </div>
                        </div>

                        <div className="flex flex-col gap-6 md:block md:relative md:overflow-hidden">
                            <div className="relative w-full overflow-hidden group">
                                <img
                                    src="/images/maison/sajjad.png"
                                    alt="Sajjad"
                                    onClick={() => {
                                        setSelectedFounder('sajjad');
                                    }}
                                    className="w-full lg:h-[500px] object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                                <div className="hidden md:flex absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col items-center justify-center p-8">
                                    <h4 className="text-[24px] text-primary-light mb-2">Sajjad Choudhury</h4>
                                    <p className="text-[12px] uppercase text-center">Co-Founder & Operational Leadership Director
                                    </p>
                                    <div className="hidden md:block text-[16px] text-center mt-12 space-y-4">
                                        <p>
                                            Sajjad leads the Maison's operational and material architecture.
                                        </p>
                                        <p>
                                            His work centres around sourcing exceptional silks, overseeing craftsmanship processes, and building the structure that allows Selhaya to remain intentional, restrained, and uncompromising in quality.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:hidden text-left text-primary-light">
                                <h4 className="text-[16px]">Sajjad Choudhury</h4>
                                <p className="text-[10px] uppercase mt-1">Co-Founder & Operational Leadership Director</p>
                            </div>

                        </div>

                    </div>

                    <div className="md:hidden text-[16px]">
                        {selectedFounder === "aisha" ? (
                            <div className="text-[16px] space-y-2">
                                <p>
                                    Aisha shapes the creative language of the Maison through silhouette, material, and cultural storytelling.
                                </p>
                                <p>
                                    Her vision for Selhaya emerged through her experiences across London and the Middle East bringing together British structure with the softness and dignity of the abaya.

                                </p>
                                <p>
                                    Every garment begins through her study of movement, fabric, and presence.
                                </p>
                            </div>
                        ) : (
                            <div className="text-[16px] space-y-2">
                                <p>
                                    Sajjad leads the Maison's operational and material architecture.
                                </p>
                                <p>
                                    His work centres around sourcing exceptional silks, overseeing craftsmanship processes, and building the structure that allows Selhaya to remain intentional, restrained, and uncompromising in quality.
                                </p>
                            </div>
                        )}
                    </div>

                    <motion.h4 variants={fadeUp} className="hidden md:block text-[16px] md:text-[24px] text-center md:max-w-5xl mx-auto ">
                        SELHAYA - A British luxury fashion and art House sharing meaningful stories{" "}<br className="hidden lg:block" />{" "}across global cultures
                    </motion.h4>
                </motion.div>
            </section>

            {/* origin story */}

            <section className="relative py-20 px-6 md:px-12 bg-section-bg z-1 text-text">
                <motion.div
                    className="text-center flex flex-col gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p variants={fadeUp}
                        className="text-[16px] md:text-[20px] w-full lg:w-4xl mx-auto uppercase">
                        The Story of SELHAYA
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="text-[24px] md:text-[28px]"
                    >
                        From Fajr to Maison
                    </motion.h2>

                    <motion.div
                        variants={fadeUp}
                        className="space-y-6 max-w-7xl mx-auto"
                    >

                        <p className="text-[16px] md:text-[20px] w-full lg:w-6xl mx-auto font-light ">
                            The initial ember of SELHAYA® began in Abu Dhabi, during the quiet hour before Fajr.
                        </p>
                        <p className="text-[16px] md:text-[20px] w-full lg:w-6xl mx-auto font-light ">


                            Luxury had long celebrated craftsmanship, beauty and heritage, yet there was still space for a Maison that could unite those worlds together through modesty, ceremony, culture and silk.


                        </p>
                        <p className="text-[16px] md:text-[20px] w-full lg:w-6xl mx-auto font-light ">
                            That was the spark behind SELHAYA®.
                        </p>

                    </motion.div>
                </motion.div>
            </section>

            {/* The First Chapters */}
            <section className="bg-choclate-brown text-primary-light py-10 md:py-20 px-6 lg:px-24">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center text-[14px] lg:text-[20px]">
                        <p>The First Chapters</p>
                        <Link to="/selhaya-legacy" className="cursor-pointer hover:scale-105 transition-transform duration-300">
                            <span className="underline">SELHAYA LEGACY </span>&rarr;
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <h2 className="text-[24px] lg:text-[32px]">
                            Maison built to make the robe{" "}<br className="hidden md:block" />{" "}desired, collected and remembered.
                        </h2>
                        <p className="md:max-w-sm text-[16px] lg:text-[20px]">Selhaya began with a question: why should cultural outerwear not hold the same longing, craft and emotional value as the world's great luxury pieces?</p>
                    </div>

                    {/* Desktop Timeline */}
                    <div className="hidden sm:block relative">
                        {/* Continuous Line */}
                        <div className="absolute top-[52px] left-2 right-2 h-px bg-primary-light/50" />

                        <div className="flex justify-between gap-6">
                            {[
                                { num: "(01)", img: "/images/legacy/legacy1.webp", title: "The Founding of the Maison" },
                                { num: "(02)", img: "/images/legacy/legacy2.webp", title: "Yaqeen, The First Collector Robe " },
                                { num: "(03)", img: "/images/legacy/legacy3.webp", title: "Waves of Light, The First Collection " },
                                { num: "(04)", img: "/images/legacy/legacy4.webp", title: "Recognition Beyond the House" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col w-1/4 relative z-10">
                                    <p className="text-[24px] font-editorial">{item.num}</p>

                                    {/* Circle point */}
                                    {/* Circle point */}
                                    <div className="relative flex items-center mb-10">
                                        <div className="absolute top-4.5 left-0 w-2 h-2 rounded-full border border-primary-light bg-choclate-brown z-10" />
                                    </div>

                                    <div className="aspect-4/5 overflow-hidden mb-4 bg-section-bg/20">
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-[16px] lg:text-[16px] font-light">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Timeline (Swiper) */}
                    <div className="sm:hidden">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={16}
                            className="milestones-swiper"
                        >
                            {[
                                { num: "(01)", img: "/images/legacy/legacy1.webp", title: "The Founding of the Maison" },
                                { num: "(02)", img: "/images/legacy/legacy2.webp", title: "Yaqeen The First Collector Robes " },
                                { num: "(03)", img: "/images/legacy/legacy3.webp", title: " Waves of Light, The First Collection" },
                                { num: "(04)", img: "/images/legacy/legacy4.webp", title: " Recognition Beyond the House" },
                            ].map((item, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="flex flex-col relative">
                                        <p className="text-[24px] md:text-[36px] font-editorial mb-4">{item.num}</p>


                                        <div className="aspect-[4/5] overflow-hidden mb-4 bg-section-bg/20">
                                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-[16px] md:text-[24px] font-light">{item.title}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* Selhaya & the Art of Pure Silk */}
            <section className="flex flex-col lg:flex-row bg-white text-text w-full">
                <div className="w-full lg:w-1/2 min-h-[400px]">
                    <img src="/images/maison/silkArt.webp" alt="Selhaya & the Art of Pure Silk" className="w-full lg:h-screen object-top object-cover" />
                </div>
                <div className="lg:w-1/2 px-6 py-16 md:p-20 flex flex-col justify-between ">
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[32px] md:text-[40px] font-editorial text-text">
                            Selhaya &amp; the Arts
                        </h2>
                        <p className="text-[16px] md:text-[20px]">
                            Beyond the Maison, Selhaya engages within cultural and international platforms where fashion becomes a language of diplomacy, identity, and representation.
                        </p>
                        <p className="text-[16px] md:text-[20px]">
                            The House contributes through advisory, cultural dialogue, and founder-led strategic engagement across global institutional spaces.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pt-4">
                        <Link to="/cultural-alliance" className="inline-block text-[16px] md:text-[20px] uppercase">
                            <span className="underline">EXPLORE CULTURAL ALLIANCES </span>&rarr;
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* The Quiet Commitment Section */}
            <section
                className={`relative w-full min-h-[40vh] lg:min-h-[50vh] flex flex-col items-center justify-center`}
                style={{
                    backgroundImage: `url("/images/maison/wavy-bg.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Subtle overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Content */}
                <div className="relative py-16 px-6 md:px-12 flex flex-col items-center justify-center text-center space-y-6 text-white lg:max-w-4xl mx-auto">
                    <h3 className="text-[24px] md:text-[36px] mb-6">
                        The Quiet Commitment
                    </h3>

                    <h3 className="text-[16px] md:text-[20px] uppercase font-semibold dm-sans">BARAKAH</h3>

                    <p className="text-[16px] md:text-[20px] text-center font-light lg:w-md" >
                        Every garment commissioned by the Maison carries a quiet act of giving.
                    </p>
                </div>
            </section>

            {/* To Enter Further Section */}
            <JournalSection
                title="The House of SELHAYA"
                description="A unique understanding of creation and careful process. "
                bgColor="bg-[#2D1F1D]"
                textColor="text-white"
                cardImageBg="bg-primary-light"
                items={[
                    {
                        title: "The Selhaya Craft",
                        num: "1/3",
                        desc: "The materials, the techniques, and the philosophy of how the Maison makes what it makes.",
                        link: "/selhaya-craft",
                        img: "/images/maison/craft.png",
                        alt: "The Craft"
                    },
                    {
                        title: "Selhaya Collections",
                        num: "2/3",
                        desc: "The presence of the Maison in cultural, diplomatic, and editorial life.",
                        link: "/selhaya-collections",
                        img: "/images/maison/cultural-alliance.png",
                        alt: "Selhaya Collections"
                    },
                    {
                        title: "Advisory",
                        num: "3/3",
                        desc: "Commissioned luxury garments, crafted for specific patrons and ceremonial occasions. ",
                        link: "/advisory",
                        img: "/images/advisory/advisoryHero.png",
                        alt: "Advisory"
                    }
                ]}
            />
        </div >
    )
}
