import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../animations/textAnimation.js'
import HeroSection from '../HeroSection';
import { useNavigate } from 'react-router-dom';
import CheckerboardGrid from '../global/CheckerboardGrid.js';
import HouseQuietlyGives from '../global/HouseQuitelyGives.js';
import SEO from '../SEO.js';
import { SEO_CONFIG } from '../../config/seo.js';

const legacy = [
    {
        name: "Founding of the Maison (2022)",
        description: "The first London-based luxury abaya house, founded by Aisha Hossain with a vision of meaning-driven fashion.",
        image: "/images/legacy/legacy1.webp"
    },
    {
        name: "Yaqeen — The Certainty That Began It All ( 2022)",
        description: "From silk crepe’s quiet weight to habotai’s delicate sheen, from organza’s luminous transparency to the depth of silk satin, each fabric is chosen not for excess but for its voice. Together they form a symphony of textures—layered, refined, and timeless—crafted to flow like light across the body.",
        image: "/images/legacy/legacy2.webp"
    },
    {
        name: "First Capsule Waves of Light ( 2023)",
        description: "A series inspired by nature’s quiet symmetries, by sanctuaries of the world, by the light that defines modesty.",
        image: "/images/legacy/legacy3.webp"
    },
    {
        name: "International Recognition ( 2025 )",
        description: "Coverage in L’Officiel Monaco and Retail Times, positioning Selhaya as a cultural voice in ethical luxury and modest fashion.",
        image: "/images/legacy/legacy4.webp"
    }
]

function Legacy() {

    const navigate = useNavigate();
    return (
        <>
            <SEO
                title={SEO_CONFIG.legacy.title}
                description={SEO_CONFIG.legacy.description}
                canonical={SEO_CONFIG.legacy.canonical}
            />
            {/* hero section */}
            <HeroSection
                image="/images/legacy/legacyHero.png"
                title=" Selhaya Legacy "
                desktopText={
                    <>
                        Every chapter builds upon the last, carrying forward the values.
                    </>
                }
                mobileText="Every chapter builds upon the last, carrying forward the values"
                textColor="text-white"
            />

            {/* logo */}
            <div className="relative flex justify-center z-20 h-0">
                <div className="absolute -top-8 md:-top-10 w-14 md:w-20 h-14 md:h-20 rounded-full bg-section-bg flex items-center justify-center">
                    <img src="/images/logos/logo-black.png" alt="" width={40} height={40} />
                </div>
            </div>

            {/* 2nd section */}
            <section className="relative py-24 md:px-12 bg-section-bg z-1 text-text">

                <motion.div
                    className="text-center flex flex-col gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p
                        variants={fadeUp}
                        className='text-[20px]'
                    >
                        milestones of Presence
                    </motion.p>
                    <motion.h1
                        variants={fadeUp}
                        className="hidden md:block text-[24px] md:text-[28px]"
                    >
                        Selhaya is more than a Maison of abayas it is a <br /> continuum of memory, ritual, and heritage.
                    </motion.h1>
                    <motion.h1
                        variants={fadeUp}
                        className="md:hidden text-[24px]"
                    >
                        Selhaya is more than a Maison of abayas it is a continuum of memory, ritual, and heritage
                    </motion.h1>
                </motion.div>
            </section>

            <CheckerboardGrid items={legacy} />

            <HouseQuietlyGives
                title="The Cultural Bridge: Between London and Abu Dhabi"
                description=".Selhaya stands at the intersection of cultures, an ongoing conversation between British discipline and Middle Eastern spirituality. It is this duality that gives the Maison its strength."
                image="/images/craft/flower.png" />

            <section className="bg-[url('/images/craft/sec3bg.svg')] bg-cover bg-center lg:h-[70vh] h-[50vh] flex items-center justify-center flex-col text-[#F5F1EB] gap-10">
                <h4 className="text-[24px] md:text-[32px]">Beyond Fashion</h4>
                <p className="max-w-lg text-center">We believe true luxury begins with respect for the materials we choose, the techniques we preserve, and the environment we honor. Every thread is selected with intention, every stitch an ode to heritage, and every creation shaped by sustainable practices that stand the test of time.</p>
                <button
                    onClick={() => navigate("/advisory")}
                    className="w-fit underline uppercase px-4 py-2">
                    Explore Cultural Advisory →
                </button>
            </section>
        </>
    )
}

export default Legacy