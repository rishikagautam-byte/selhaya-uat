import Tailored from "../../features/hayaPage/Tailored";
import Resilience from "../../features/productPage/Resilience";
import { hayaData } from "../../features/hayaPage/hayaData";
import Discover from "../../features/hayaPage/Discover";
import Book from "../../features/hayaPage/Book";
import HeroSection from "../HeroSection";
import HouseQuitelyGives from "../global/HouseQuitelyGives";
import heroImg from '../../assets/haya-images/hayaHero.png';
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export const Haya = () => {
  return (
    <>
      <SEO
        title={SEO_CONFIG.haya.title}
        description={SEO_CONFIG.haya.description}
        canonical={SEO_CONFIG.haya.canonical}
      />
      <main>
        <HeroSection
          image={heroImg} title="HAYA ROBES"
          desktopText=<>4 silk robes, created for elegant social gatherings.</>
        />
        <Tailored
          title={<>The London Season,<br />drawn in silk</>}
          content="Named for the dignity of Haya, this collection belongs to the rituals of an English summer: afternoon tea, race-day lawns, summer tennis, botanical gardens and private lunches in Knightsbridge. Four editions, four social moods: floral, soft, polished and dramatic. Cut entirely in silk, each robe is made for occasions where elegance and social ambience collide."
        />
        <Resilience
          data={hayaData}
          isClickable={true}
          baseRoute="/product"
        />
        <Book />
        <HouseQuitelyGives />
        <Discover exclude="Haya" />


      </main>
    </>
  );
};