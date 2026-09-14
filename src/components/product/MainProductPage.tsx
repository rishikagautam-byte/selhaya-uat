import Presence from "../../features/productPage/Presence";
import Resilience from "../../features/productPage/Resilience";
import HeroSection from "../HeroSection";
import heroImg from "../../assets/main-product/hero1.png";
import heroMobile from "../../assets/main-product/heroMobile.png"

import Bespoke from "../global/Bespoke";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function MainProductPage() {
  return (
    <>
      <SEO
        title={SEO_CONFIG.collections.title}
        description={SEO_CONFIG.collections.description}
        canonical={SEO_CONFIG.collections.canonical}
      />
      <main>
        <HeroSection
          image={heroImg} mobileImage={heroMobile} title="selhaya collections"
          desktopText=<>Each Edition is crafted in pure silk. Each carries its own lineage. </>
        />
        <Presence />
        <Resilience isClickable={true} />

        {/* bespoke */}
        < Bespoke />
      </main>
    </>
  );
}