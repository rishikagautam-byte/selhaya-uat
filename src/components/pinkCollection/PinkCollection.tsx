import Resilience from '../../features/productPage/Resilience';
import Discover from '../../features/hayaPage/Discover';
import { pinkCollectionData } from '../../types/pinkCollectionData';
import Tailored from '../../features/hayaPage/Tailored';
import HeroSection from '../HeroSection';

import heroImg from "../../assets/pink/pink.webp";
import HouseQuietlyGives from '../global/HouseQuitelyGives';
import SEO from '../SEO';
import { SEO_CONFIG } from '../../config/seo';


export const PinkCollection = () => {
  return (
    <>
      <SEO
        title={SEO_CONFIG.roseOfResilience.title}
        description={SEO_CONFIG.roseOfResilience.description}
        canonical={SEO_CONFIG.roseOfResilience.canonical}
      />
      <main>
        <HeroSection
          image={heroImg} title="ROSE OF RESILIENCE"
          desktopText=<>The Pink Edition, five pure silk robes shaped by courage, tenderness and renewal.</>
        />
        <Tailored
          title={<>The language of the rose, <br />told in silk</>}
          content="Rose of Resilience was created for women who have carried more than the world could see. The collection turns the rose into a study of courage: organza, crepe and satin in blush, burgundy, rose and salmon. Petalwork, layered silk and hand-shaped motifs speak of love, healing and the decision to choose beauty again."
        />
        <Resilience
          data={pinkCollectionData}
          isClickable={true}
          baseRoute="/product"
        />

        <HouseQuietlyGives />
        <Discover exclude="Rose of Resilience" />

      </main>
    </>
  );
};

export default PinkCollection;
