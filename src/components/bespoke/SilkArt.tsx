
import HeroSection from "../HeroSection";
import Hero from "../../assets/bespoke/artHero.png";
import artImg from "../../assets/bespoke/sec2/art.png";
import sec3 from "../../assets/bespoke/sec3/art.png";
import sec4Art from "../../assets/bespoke/sec4/art.png";
import Section2 from "./commonSec/Section2";
import Section3 from "./commonSec/Section3";
import Section4 from "./commonSec/Section4";
import PvtConsultation from "@/features/contactPage/newForms/PvtConsultation";


const silkArtSteps = [
  {
    number: "01.",
    title: "PRIVATE CONVERSATION",
    content:
      "A confidential consultation exploring the story, symbolism, purpose, and legacy behind the commission.",
  },
  {
    number: "02.",
    title: "CREATIVE DIRECTION",
    content:
      "The House develops an artistic concept through composition, silk selection, embroidery studies, materials, and visual storytelling.",
  },
  {
    number: "03.",
    title: "SILK ART CREATION",
    content:
      "Master artisans bring the commission to life using pure silk, hand embroidery, crystal detailing, and meticulous craftsmanship.",
  },
  {
    number: "04.",
    title: "PRESENTATION & LEGACY",
    content:
      "The completed artwork is carefully presented as a lasting cultural piece, created to be collected, displayed, and preserved for generations.",
  },
];

export default function SilkArt() {
  const scrollToEnquiry = () => {
    const section = document.getElementById("private-enquiry");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroSection image={Hero} title="SELHAYA Bespoke Silk Art"
        mobileTitle=<>Selhaya bespoke <br />silk art</>
        desktopText=<>
          Created for collectors, institutions, and those who wish to preserve stories through silk, <br />
          craftsmanship, and cultural artistry.
        </>
        mobileText="Created for collectors, institutions, and those who wish to preserve stories through silk, craftsmanship, and cultural artistry."
        buttonText="Begin a Private Enquiry"
        onButtonClick={scrollToEnquiry}
      />

      <Section2
        image={artImg}
        imageAlt="Some stories are worn. Others are preserved."
        title={
          <>
            Some stories are worn. <br />
            Others are preserved.
          </>
        }
        paragraphs={[
          <>SELHAYA Bespoke Silk Art transforms pure silk into{" "}<br className="hidden xl:block" />
            commissioned works of lasting significance.</>,
          <>Each piece is conceived through private dialogue and{" "}<br className="hidden xl:block" />
            handcrafted using embroidery, crystal, texture, and{" "}<br className="hidden xl:block" />
            composition to create an object that reflects memory, heritage,{" "}<br className="hidden xl:block" />
            ceremony, or personal legacy.</>,
          <>Rather than creating artworks for display alone, the House{" "}<br className="hidden xl:block" />
            creates cultural objects designed to be collected, gifted, and{" "}<br className="hidden xl:block" />
            passed forward.</>,
        ]}
      />          
      <Section3
        heading={<>From conversation{" "}<br className="hidden xl:block" />{" "}to collectible.</>}
        description={<>Every Bespoke Silk Art commission follows a private creative{" "}<br className="hidden xl:block" />
          process led by the House. Each work evolves through{" "}<br className="hidden xl:block" />
          symbolism, craftsmanship, and artistic direction, ensuring that{" "}<br className="hidden xl:block" />
          every commission reflects the story it was created to preserve.</>}
        steps={silkArtSteps} image={sec3} />

      <Section4
        backgroundImage={sec4Art}
        title={
          <>
            Created through craftsmanship. <br />
            Collected for generations.
          </>
        }
        mobTitle={
          <>
            Created through<br />
            craftsmanship. Collected for<br />
            generations.
          </>
        }
        description="Each work is individually developed according to artistic complexity, craftsmanship, embroidery, materials and ceremonial significance."
        mobDescription = 
        <>
        Each work is individually developed according to artistic complexity, craftsmanship, embroidery, materials and ceremonial significance.
        </>
        tagline={
          <>
            Created once. <br />
            Never repeated.
          </>
        }
      />

      <PvtConsultation silk="art" />
    </>
  );
}


