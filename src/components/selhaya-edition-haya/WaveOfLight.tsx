import Tailored from "../../features/hayaPage/Tailored";
import Discover from "../../features/hayaPage/Discover";
import Resilience from "../../features/productPage/Resilience";
import { waveData } from "../../types/waveData";
import heroImg from "../../assets/waves-of-light/wavesHero.png"
import HeroSection from "../HeroSection";
import Books from "../../features/hayaPage/Books";
import HouseQuietlyGives from "../global/HouseQuitelyGives";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function WaveOfLight() {
  return (
    <>
      <SEO
        title={SEO_CONFIG.wavesOfLight.title}
        description={SEO_CONFIG.wavesOfLight.description}
        canonical={SEO_CONFIG.wavesOfLight.canonical}
      />
      <main>
        <HeroSection
          image={heroImg} title="WAVES OF LIGHT"
          desktopText={<>Five silk lined editions born from places the Founder could not leave behind. </>}
        />
        <Tailored
          title={<>Five remembered worlds,<br />translated into silk</>}
          content="Waves of Light follows a journey through Kyoto, Santorini, Lake Garda, Sabi Sands and Cape Town. It was shaped by memory rather than season: blossom against stone, gold at sunset, lemon trees by the lake, wild earth, and light moving across water. Each edition turns one place into something to be worn, kept and returned to."
        />
        <Resilience
          data={waveData}
          isClickable={true}
          baseRoute="/product"
        />
        <Books />
        <HouseQuietlyGives />
        <Discover exclude="Waves of Light" />


      </main>
    </>
  );
}