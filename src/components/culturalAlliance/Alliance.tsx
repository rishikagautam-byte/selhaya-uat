import HeroSection from '../HeroSection'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations/textAnimation.js'
import CheckerboardGrid from '../global/CheckerboardGrid';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SEO from '../SEO';
import { SEO_CONFIG } from '../../config/seo';

const moments = [
    {
        name: "Abu Dhabi",
        description: "Beyond the Maison, Selhaya engages within cultural and  Invited presence under royal patronage within institutional and cultural platforms honouring Emirati Women’s Day. Selhaya’s participation reflected the evolving role of modest fashion as a form of cultural expression, national identity, and contemporary elegance.",
        image: "/images/alliance/m1.webp"
    },
    {
        name: "Jakarta",
        description: "The dialogue addressing the future of modest fashion within ministerial and cultural forums. The engagement explored how heritage, craftsmanship, and modern design can coexist as a globally relevant cultural language.",
        image: "/images/alliance/m2.webp"
    },
    {
        name: "Paris",
        description: "Royal-adjacent cultural engagement supporting youth entrepreneurship and emerging creative voices. The moment underscored Selhaya’s belief in fashion as a tool for empowerment, education, and long-term cultural development.",
        image: "/images/alliance/m3.webp"
    },
    {
        name: "Istanbul",
        description: "Participation within premier local cultural and institutional forums sharing conversations around fashion, diplomacy, and modern heritage. Selhaya contributed to dialogue examining the intersection of tradition, identity, and evolving global aesthetics.",
        image: "/images/alliance/m4.webp"
    },
    {
        name: "Venice",
        description: "Selhaya presented on the international red carpet, marking the entry of modest couture into global cinematic culture. This moment signaled the growing recognition of modest fashion within the world's most influential cultural arenas.",
        image: "/images/alliance/m5.webp"
    },
    {
        name: "London",
        description: "Founder presence within British institutional and broadcast platforms examining contemporary Muslim enterprise and cultural leadership. These appearances positioned Selhaya within broader conversations on identity, representation, and modern British heritage.",
        image: "/images/alliance/m6.webp"
    }
];

const collabs = [
    {
        title: "Halal World Expo",
        desc: "Engagement across international platforms convening governmental bodies, cultural institutions, and global industry leaders.",
        image: "/images/alliance/c1.png",
    },
    {
        title: "Modest Fashion Trade Show",
        desc: "Presence within ministerial and industry-led forums, advancing modest fashion as a global cultural movement.",
        image: "/images/alliance/c2.png",
    },
    {
        title: "Islam Channel",
        desc: " Participation within formal cultural and community platforms shaping contemporary British Muslim identity.",
        image: "/images/alliance/c3.png",
    },
    {
        title: "Private & Royal Offices",
        desc: "Discreet engagement within royal-adjacent, embassy-level, and formal diplomatic environments.",
        image: "/images/alliance/c4.png",
    },
    {
        title: "ORUN",
        desc: "Pan-African cultural platform facilitating dialogue across heritage, leadership, and contemporary expression.",
        image: "/images/alliance/c5.png",
    },
    {
        title: "OIC-Affiliated Platforms",
        desc: "Participation within international networks and platforms connected to diplomatic and cultural dialogue across the Muslim world.",
        image: "/images/alliance/c6.png",
    }
];

export default function Alliance() {

    return (
        <>
            <SEO
                title={SEO_CONFIG.alliance.title}
                description={SEO_CONFIG.alliance.description}
                canonical={SEO_CONFIG.alliance.canonical}
            />
            <HeroSection
                image="/images/alliance/allianceHero.webp"
                title="Cultural Alliances"
                desktopText={
                    <>
                        More than fashion. A cultural presence. <br />
                        Selhaya operates where heritage, diplomacy, and modern luxury converge.
                    </>
                }
                mobileText="More than fashion. A cultural presence. Selhaya operates where heritage, diplomacy, and modern luxury converge.."
                textColor="text-white"
            />

            <section className="relative py-10 md:py-20 px-6 md:px-12 bg-section-bg z-1 text-text">
                <motion.div
                    className="text-center flex flex-col gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-[28px] md:text-[36px]"
                    >
                        A Presence Rooted in Culture & Dialogue
                    </motion.h2>

                    <motion.div
                        variants={fadeUp}
                        className="space-y-8 max-w-8xl mx-auto"
                    >
                        <p className="w-full lg:w-[70%] mx-auto text-[16px] md:text-[20px] text-center">
                            Selhaya is invited into cultural, diplomatic, and international platforms where  fashion serves as a form of representation, dialogue, and soft power.
                        </p>
                        <p className="w-full lg:w-[70%] mx-auto text-[16px] md:text-[20px] text-center">
                            Our work extends beyond garments. It is about how identity is expressed, how tradition evolves, and how elegance can move quietly across borders.
                        </p>
                        <p className="w-full lg:w-[70%] mx-auto text-[16px] md:text-[20px] text-center">
                            The Maison participates in these spaces not as a sponsor or exhibitor, but as a cultural presence — carrying narrative, symbolism, and modern heritage into global conversations.
                        </p>

                    </motion.div>

                </motion.div>
            </section>

            {/*Moments of Prestige */}

            <section className="bg-primary-light text-text w-full">
                {/* Section Header */}
                <div className="py-16 md:py-12 px-6 md:px-12 lg:px-24 flex flex-col gap-4">
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="uppercase  text-sm font-medium text-gray-500"
                    >MOMENTS OF PRESTIGE</motion.p>
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-[28px] md:text-[32px] w-full mt-5 lg:max-w-2/3 "
                    >
                        A record of Selhaya's presence across global cultural, diplomatic, and institutional stages.
                    </motion.h2>
                </div>

                <CheckerboardGrid items={moments} />
            </section>

            {/* Cultural & Institutional Collaborations */}
            <section className="w-full bg-choclate-brown text-primary-light py-16 md:py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Header */}
                    <motion.div
                        className="flex flex-col md:flex-row md:items-center justify-between gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-[28px] md:text-[36px] w-full md:w-1/2"
                        >
                            Cultural & Institutional Collaborations
                        </motion.h2>

                        <div className="w-full md:w-xs flex flex-col gap-5">
                            <motion.p
                                variants={fadeUp}
                                className="text-[14px] text-left"
                            >
                                Selhaya engages within royal, ministerial,
                                diplomatic, and cultural environments, where
                                heritage, representation and modern identity are
                                shaped through dialogue — not spectacle.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* MOBILE SWIPER */}
                    <div className="md:hidden">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={24}
                        >
                            {collabs.map((collab, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col space-y-6">
                                        <div className="aspect-4/5 overflow-hidden bg-primary-light">
                                            <img
                                                src={collab.image}
                                                alt={collab.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <h3 className="text-[24px]">
                                                    {collab.title}
                                                </h3>

                                                <span className="text-sm opacity-80">
                                                    {index + 1}/{collabs.length}
                                                </span>
                                            </div>

                                            <p className="text-[16px]">
                                                {collab.desc}
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* DESKTOP GRID */}
                    <div className="hidden md:grid grid-cols-3 gap-8 md:gap-12">
                        {collabs.map((collab, index) => (
                            <div
                                key={index}
                                className="flex flex-col space-y-4 group cursor-pointer"
                            >
                                <div className="overflow-hidden bg-primary-light">
                                    <img
                                        src={collab.image}
                                        alt={collab.title}
                                        className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-[24px]">{collab.title}</h3>
                                    <p className="text-[16px] md:h-24 lg:h-12">
                                        {collab.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 bg-primary-light">
                <div className="order-1 md:order-2 w-full h-125 md:h-auto">
                    <img src="/images/home/salon.png"
                        alt="The SELHAYA Royal Cultural Salon"
                        className="w-full h-125 md:h-screen object-cover object-bottom" />
                </div>
                <div className="order-2 md:order-1 px-6 py-12 lg:p-20 flex flex-col justify-between">
                    <motion.div
                        className="text"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-[24px] md:text-[32px] mb-6">The SELHAYA Royal Cultural Salon</motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-[16px] md:text-[20px] ">
                            An invitation-only gathering where royalty, cultural leaders, patrons of the arts, and distinguished guests come together. Rooted in craftsmanship, cultural dialogue, and the enduring language of luxury.
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="mt-2 md:mt-6 text-[16px] md:text-[20px] ">
                            The Salon brings couture, silk art, music, and heritage into one considered cultural experience. A distinctive SELHAYA gathering where artistry becomes conversation, and moments become legacy.
                        </motion.p>
                    </motion.div>
                    <div className="mt-10 space-y-2 md:space-y-4">

                        <Link to="/cultural-salon" className="text-[12px] md:text-[14px] border px-4 py-2 rounded-full border-secondary-1 bg-choclate-brown text-primary-light cursor-pointer">
                            <span className="uppercase">EXPLORE THE ROYAL CULTURAL SALON</span>

                        </Link>
                    </div>
                </div >
            </section >

                <section className="flex flex-col md:flex-row w-full bg-choclate-brown text-primary-light">
                    {/* Desktop Image */}
                    <div className="block md:w-1/2 relative min-h-150 lg:min-h-screen">
                        <img
                            src="/images/alliance/last.png"
                            alt="Aisha Hossain"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between items-center md:items-start md:py-20 md:px-8 lg:px-20">
                        <div className="py-12 md:py-0 flex flex-col gap-2 items-center justify-between md:items-start h-full">
                            <div className='flex items-center md:items-start flex-col'>

                                {/* Desktop Title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-[28px] lg:text-[32px] font-editorial mb-10"
                                >
                                    Selhaya Advisory
                                </motion.h2>


                                {/* Quote Text */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-[16px] md:text-[16px] text-center md:text-left mb-10 md:mb-12 max-w-[90%] lg:max-w-[85%]"
                                >
                                    Selhaya works with cultural institutions, event curators, government platforms, and international organisations seeking refined collaboration, advisory insight, or speaker participation at the intersection of luxury, heritage, and modern identity.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                viewport={{ once: true }}
                                className=""
                            >
                                <Link to="/advisory" className="text-[12px] md:text-[14px] border px-4 py-2 rounded-full border-secondary-1 bg-secondary-1 text-black cursor-pointer">
                                    Explore Cultural Advisory
                                </Link>
                            </motion.div>
                        </div>



                    </div>
                </section>
            
        </>
    )
}