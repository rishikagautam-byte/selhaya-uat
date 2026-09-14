import HeroSection from "../HeroSection";
import Hero from "../../assets/bespoke/garmentHero.png";
import garmentImg from "../../assets/bespoke/sec2/garment.png";
import Section2 from "./commonSec/Section2";
import Section3 from "./commonSec/Section3";
import Section4 from "./commonSec/Section4";
import sec3 from "../../assets/bespoke/sec3/garment.png";
import sec4Garment from "../../assets/bespoke/sec4/image.png";

import legacy from "../../assets/bespoke/legacy.png";
import PvtConsultation from "@/features/contactPage/newForms/PvtConsultation";

const silkGarmentSteps = [
  {
    number: "01.",
    title: "PRIVATE DIALOGUE",
    content: (
      <>
        A personal consultation exploring silhouette, occasion,{" "}
        <br className="hidden xl:block" /> environment, cultural
        context, and personal expression.
      </>
    ),
  },
  {
    number: "02.",
    title: "DESIGN DIRECTION",
    content: (
      <>
        The House develops a couture proposal through fabric studies, silhouette{" "}
        <br className="hidden xl:block" />
        references, embroidery direction, and considered detailing.
      </>
    ),
  },
  {
    number: "03.",
    title: "COUTURE CREATION",
    content: (
      <>
        Each garment is handcrafted in pure silk through refined couture{" "}
        <br className="hidden xl:block" />
        construction, hand-finishing, and optional pearl, crystal, or gemstone{" "}
        <br className="hidden xl:block" />
        embellishment.
      </>
    ),
  },
  {
    number: "04.",
    title: "FINALISATION & DELIVERY",
    content: (
      <>
        The completed piece is refined through private fittings and delivered with{" "}
        <br className="hidden xl:block" />
        final adjustments to ensure a precise and considered finish.
      </>
    ),
  },
];

export default function SilkGarment() {
  const scrollToEnquiry = () => {
    const section = document.getElementById("private-enquiry");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroSection image={Hero} title="SELHAYA Bespoke Garments"
        titleClassName="text-[26px] md:text-[46px]"
        desktopText=<>
         Every commission is conceived privately and crafted in pure silk for special occasions with  <br />the quiet artistry of the House.
        </>
        desktopTextClassName="text-[14px]"
        mobileTextClassName="text-[14px]"
        mobileText="Every commission is conceived privately and crafted in pure silk, with the quiet artistry of the House."
        buttonText="Begin a Private Enquiry"
        onButtonClick={scrollToEnquiry}
      />

      <Section2
        image={garmentImg}
        imageAlt="The Art of Personal Couture"
        titleClassName="text-[26px] md:text-[30px]"
        paragraphClassName="text-[14px] xl:text-[18px] space-y-4 xl:space-y-6 leading-relaxed"
        title="The Art of Personal Couture."
        paragraphs={[
          <>
            Created through private consultation, considered design, and 
            meticulous craftsmanship, each garment is shaped around the 
            woman, the occasion, and the story it is meant to carry. 
            From the first conversation to the final hand-finished detail, every 
            element is refined with intention, discretion, and an uncompromising 
            eye for beauty.
          </>,
        ]}
      />

      <Section3
        heading={<>A private process. A singular{" "}<br className="hidden xl:block" />{" "}creation.</>}
        image={sec3}
        headingClassName="text-[26px] md:text-[30px]"
        paragraphClassName="text-[14px] leading-relaxed"
        stepTitleClassName="text-[14px] md:text-[20px]"
        stepContentClassName="text-[12px] md:text-[14px] leading-relaxed"
        description="From the first conversation to final delivery, each decision is shaped around the woman, the occasion, and the story the garment is intended to carry."
        steps={silkGarmentSteps}
      />

      <Section4
        backgroundImage={sec4Garment}
        titleClassName="text-[24px] md:text-[30px]"
        descriptionClassName="text-[12px] md:text-[14px]"
        taglineClassName="text-[20px] md:text-[26px]"
        mobTitleClassName="text-[22px]"
        mobDescriptionClassName="text-[14px]"
        mobTaglineClassName="text-[22px]"
        title="THE MAKING OF A SINGULAR PIECE"
        mobTitle={
          <>
            THE MAKING OF<br />
            A SINGULAR
            PIECE
          </>
        }
        description="Each commission includes dedicated creative direction, material sourcing, one-to-one development, and couture-level finishing."
        mobDescription={<>
          Each commission includes dedicated creative direction, material sourcing,
          one-to-one development, and couture-level finishing.

        </>}
        tagline={
          <>
            Created once. <br />
            Never repeated.
          </>
        }
      />

      <section className="bg-primary-light flex-col items-center text-center grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <img
            src={legacy}
            alt="Legacy"
            className="object-cover h-full aspect-square object-top"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-16">
          <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7432 19C14.8405 19 12.9745 16.8 13.5965 14C13.5965 13.9 13.7002 13.8 13.7002 13.7C15.0479 8.90001 21.5789 5.80001 22.9266 0H25C24.067 4.2 19.8166 6.60001 17.0175 9.7C17.9506 9.3 18.8836 9 19.9203 9C22.823 9 24.5853 11.2 23.9633 14C23.3413 16.8 20.6459 19 17.7432 19ZM0.119629 14C0.119629 13.9 0.223297 13.8 0.223297 13.7C1.57098 8.90001 8.10208 5.80001 9.44977 0H11.5231C10.5901 4.2 6.33972 6.60001 3.54068 9.7C4.47369 9.3 5.40671 9 6.44339 9C9.3461 9 11.1085 11.2 10.4865 14C9.86444 16.8 7.16907 19 4.26636 19C1.36365 19 -0.50238 16.8 0.119629 14Z" fill="#281B13" />
          </svg>
          <h2 className="text-[22px] md:text-[26px] lg:text-[30px] mt-8 mb-4">We design for legacy.</h2>
          <p className="text-[14px] leading-relaxed">From silhouette and texture to embroidery and ceremonial{" "}<br className="hidden lg:block" />{" "}presence, every detail is considered to create a piece that{" "}<br className="hidden lg:block" />{" "}carries meaning beyond the occasion.</p>
          <p className="uppercase mt-6 text-[14px]">Weddings · Special Occasions · Red-Carpet{" "}<br className="hidden md:block" />{" "}Appearances · Couture Pieces</p>
        </div>
      </section>

      <PvtConsultation silk="garment" />
    </>
  );
}
