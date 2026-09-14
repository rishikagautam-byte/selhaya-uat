import heroImg from "../../assets/bespoke/hero-bespoke.png";
import Advisory from "../../features/bespokesPage/Advisory";
import Created from "../../features/bespokesPage/Created";
import Investment from "../../features/bespokesPage/Investment";
import HouseQuietlyGives from "../global/HouseQuitelyGives";
import HeroSection from "../HeroSection";
import secondLast from "../../assets/bespoke/secondLast.jpg";
import PrivateEnquiry from "../../features/contactPage/Private";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

const scrollToEnquiry = () => {
  const section = document.getElementById("private-enquiry");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Bespokes() {
  return (
    <>
      <SEO
        title={SEO_CONFIG.bespoke.title}
        description={SEO_CONFIG.bespoke.description}
        canonical={SEO_CONFIG.bespoke.canonical}
      />
      <main>
        <HeroSection
          image={heroImg}
          title={"Selhaya Bespoke"}
          desktopText={<>Private Silk Couture Commissions.</>}
          mobileText="Private Silk Couture Commissions."
          buttonText="Begin a Private Enquiry"
          onButtonClick={scrollToEnquiry}
        />
        <Created />
        <Advisory />
        <Investment />
        <HouseQuietlyGives
          title={
            <>
              We do not design for moments.{" "}
              <br className="hidden md:block" />
              We design for legacy
            </>
          }
          description="Rather than presenting products, we offers glimpses into silhouette, texture, embroidery, atmosphere, and ceremonial presence."
          backgroundImage={secondLast}
        />
        <PrivateEnquiry />
      </main>
    </>
  );
}