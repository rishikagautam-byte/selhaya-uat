import Tailored from "../../features/hayaPage/Tailored";
import Resilience from "../../features/productPage/Resilience";
import { heritiageData } from "../../types/heritiageData";
import Discover from "../../features/hayaPage/Discover";
import heroImg from "../../assets/heritiage/hero.png"
import HeroSection from "../HeroSection";
import HouseQuitelyGives from "../global/HouseQuitelyGives";
import HeritageBook from "../../features/hayaPage/HeritageBook";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function Heritiage() {
    return (
        <>
            <SEO
                title={SEO_CONFIG.heritage.title}
                description={SEO_CONFIG.heritage.description}
                canonical={SEO_CONFIG.heritage.canonical}
            />
            <main>
                <HeroSection
                    image={heroImg} title="HERITAGE"
                    desktopText={<>Limited pure silk editions crafted once, never repeated. </>}
                />
                <Tailored
                    title={<>Pure silk robes made for memory,<br />ceremony and inheritance</>}
                    content="The Heritage Collection is home to Selhaya's most symbolic editions. Each robe begins with a moment worth carrying forward: a sacred day, a rare story, a private moment worth remembering. Made in pure silk and reflecting on key moments, these pieces are created to be cherished long after the occasion has passed."
                />
                <Resilience
                    data={heritiageData}
                    isClickable={true}
                    baseRoute="/product"
                />
                <HeritageBook />
                <HouseQuitelyGives />
                <Discover exclude="Heritage" />



            </main>
        </>
    );
}