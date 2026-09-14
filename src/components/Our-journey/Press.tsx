import Covers from "../../features/pressAndRecognitionPage/Covers";
import Reflect from "../../features/pressAndRecognitionPage/Reflect";
import pressHero from "../../assets/press/pressHero.png"
import HeroSection from "../HeroSection";
import Published from "../../features/pressAndRecognitionPage/Published";
import { formalData } from "../../features/pressAndRecognitionPage/formalData";
import CheckerboardGrid from "../global/CheckerboardGrid";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function Press() {
    return (
        <>
            <SEO
                title={SEO_CONFIG.press.title}
                description={SEO_CONFIG.press.description}
                canonical={SEO_CONFIG.press.canonical}
            />
            <main>
                <HeroSection
                    image={pressHero}
                    title={"PRESS AND RECOGNITION"}
                    desktopText=<>Recognised by leading international publications.</> />
                <Covers />
                <Published />
                <section className="w-full overflow-hidden bg-primary-light">
                    <div className="flex flex-col items-center mb-10 md:mb-20">
                        <p className="text-[16px] md:mb-6 uppercase text-text">
                            Honours &amp; Institutional Recognition
                        </p>

                        <h4 className="font-editorial text-text text-center mt-4 mx-auto px-5 text-[24px] md:text-[32px] lg:w-4xl">
                            Formal acknowledgements of cultural contribution and industry
                            leadership.
                        </h4>
                    </div>
                    <CheckerboardGrid items={formalData} />
                </section>
                <Reflect />
            </main>
        </>
    );
}