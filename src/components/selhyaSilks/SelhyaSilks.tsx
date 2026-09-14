import HeroSection from '../HeroSection'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations/textAnimation.js'
import CheckerboardGrid from '../global/CheckerboardGrid';
import JournalSection from '../home/JournalSection.js';
import ExploreLink from '../global/ExploreLink.js';
import SEO from '../SEO';
import { SEO_CONFIG } from '../../config/seo';

const silkTypes = [
    {
        name: "Silk Satin",
        description: "Silk satin is defined by its smooth weave and subtle, refined luminosity. Chosen for its softness against the skin, it delivers a polished finish without heaviness, offering comfort, breathability, and an elevated surface quality that retains its elegance over time.",
        image: "/images/silk/silk1.webp"
    },
    {
        name: "Silk Crepe",
        description: "A refined silk with a softly textured surface and natural elasticity, silk crepe offers a fluid drape balanced by gentle structure. It moves effortlessly with the body, allowing the abaya to fall with restraint rather than excess, maintaining shape while remaining comfortable for extended wear.",
        image: "/images/silk/silk2.webp"
    },
    {
        name: "Silk Habotai",
        description: "Lightweight and naturally breathable, silk habotai is used primarily for linings and inner layers. Its softness ensures comfort in contact with the skin, while its durability supports the structure of the garment without adding unnecessary weight or bulk.",
        image: "/images/silk/silk3.webp"
    },
    {
        name: "Raw Silk",
        description: "Raw silk retains its natural texture and subtle irregularities, offering a more tactile character. It provides structure with breathability, creating garments that feel grounded yet refined, and that develop depth and presence through wear.",
        image: "/images/silk/silk4.webp"
    },
    {
        name: "Silk Organza",
        description: "A sheer silk with inherent stiffness, silk organza is used to introduce volume, definition, and architectural form. It allows structure to be built discreetly within the garment, preserving a clean outer silhouette while supporting refined shape and movement.",
        image: "/images/silk/silk5.webp"
    }
];
export default function SelhyaSilks() {
    return (
        <>
            <SEO
                title={SEO_CONFIG.silks.title}
                description={SEO_CONFIG.silks.description}
                canonical={SEO_CONFIG.silks.canonical}
            />
            <HeroSection image="/images/silk/hero-silk.webp"
                title="SELHAYA & THE ART OF THE PURE SILK "
                desktopText=
                <>
                    Selhaya® London
                </>
                mobileText="Selhaya® London"
                textColor="text-white"
            />

            <section className="relative py-12 md:py-24 px-6 md:px-12 bg-section-bg z-1 text-text">
                <motion.div
                    className="text-center flex flex-col gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-[28px] md:text-[36px] font-bold"
                    >
                        Silk Abayas
                    </motion.h1>

                    <motion.div
                        variants={fadeUp}
                        className="space-y-6 max-w-7xl mx-auto"
                    >
                        <p className="w-full lg:w-[80%] mx-auto text-[16px] md:text-[20px] text-center">
                            Selhaya® is a British luxury Maison specialising in pure silk abayas, designed in London and crafted in limited numbers. Each garment is created using 100% pure silk including crepe, satin, and habotai without synthetic blends or substitutes.
                        </p>


                    </motion.div>

                </motion.div>
            </section>

            {/* Why Silk Section */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 h-auto lg:h-[700px]">
                {/* Left Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="hidden lg:block w-full h-[400px] md:h-full overflow-hidden"
                >

                    <img
                        src="/images/silk/sew1.png"
                        alt="Dress form"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Center Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full h-full bg-choclate-brown text-primary-light flex flex-col justify-center px-8 py-16 lg:px-12 xl:px-16 text-center"
                >
                    <h2 className="text-[28px] lg:text-[32px] font-editorial mb-8 lg:mb-12">
                        Why Selhaya Works<br />Exclusively With Silk
                    </h2>
                    <div className="space-y-6 text-[14px] md:text-[16px] md:px-10">
                        <p>
                            Selhaya was founded on the principle that fabric is not a detail—it is the foundation of the garment. For this reason, the House works exclusively with 100% pure silk, selected for its natural drape, breathability, and longevity.
                        </p>
                        <p>
                            Synthetic fibres and satin blends are deliberately excluded. While
                            they may imitate the appearance of silk, they lack the integrity of
                            wear, ageing, and structure required at Maison level.
                        </p>
                        <p>
                            Each Selhaya piece is released in limited quantities, allowing time,
                            care, and precision at every stage of creation. This approach
                            preserves both craftsmanship and exclusivity.
                        </p>
                        <p>
                            Silk, within Selhaya, is not a seasonal preference. It is a
                            permanent foundation chosen for its refinement, restraint,
                            and ability to endure beyond trends.
                        </p>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="hidden lg:block w-full h-[400px] md:h-full overflow-hidden"
                >
                    {/* Placeholder image, replace with actual sewing machine image */}
                    <img
                        src="/images/silk/sew2.png"
                        alt="Sewing machine"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </section>

            {/* Our Silks */}
            <section className="bg-primary-light text-text w-full">
                {/* Section Header */}
                <motion.div
                    className="py-16 md:py-24 px-6 text-center max-w-3xl mx-auto flex flex-col gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2 variants={fadeUp} className="text-[32px] md:text-[44px] font-editorial tracking-[1.4px] text-text">
                        Our Silks
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-[12px] md:text-[16px] text-text uppercase max-w-[75%] mx-auto">
                        selhaya selects silks for their natural qualities rather  than  visual effect. each material contributes deliberately to the garment's form, movement, and ease of wear.
                    </motion.p>
                </motion.div>

                <CheckerboardGrid items={silkTypes} />
            </section>


            <section className='relative'>
                <img className="w-full h-[400px] object-cover"
                    src="/images/silk/philosphy.png" alt="The Philosophy of Silk" />
                <div className="flex flex-col items-center justify-center gap-4 md:gap-10 text-center absolute inset-0 bg-black/30 text-white px-10">
                    <h2 className="text-[24px] md:text-[36px]">The Philosophy of Silk</h2>
                    <div className="">
                        <p className="text-[14px] md:text-[16px]">
                            At Selhaya, silk is treated as a fabric of intention rather than excess.{" "}<br className='hidden lg:block' />{" "}The House designs with restraint—creating garments meant to be worn with meaning, not volume.
                        </p>
                        <p className="text-[14px] md:text-[16px]">
                            Silk is regarded as sacred, not seasonal—chosen for its ability to carry memory, movement, and{" "}<br className='hidden lg:block' />{" "}permanence across time.
                        </p>
                    </div>
                    <ExploreLink to='/selhaya-craft' text='explore The Selhaya Craft' uppercase={true} />
                </div>
            </section>



            < JournalSection />
        </>
    )
}
