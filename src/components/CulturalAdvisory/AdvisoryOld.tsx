import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations/textAnimation.js";
import ContactPage from "../../features/contactPage/Advisory.js";
import FloatingLogo from "../global/FloatingLogo.js";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSection from "../HeroSection.js";
import SEO from "../SEO.js";
import { SEO_CONFIG } from "../../config/seo.js";

const engagements = [
  {
    id: "01",
    title: "Cultural Fundraising & Auction Strategy",
    context: "A nationally broadcast charitable gala engaging a culturally diverse, high-net worth audience.",
    role: "Advisory on auction structure, donor psychology, and cultural framing.",
    challenge: "The organisers required an approach that increased participation while maintaining dignity and cultural alignment.",
    outcome: "Elevated participation and strong engagement within a high-visibility, sensitive environment.",
    image: "/images/advisory/sec5-1.png"
  },
  {
    id: "02",
    title: "Women-Led Mobility & Cultural Innovation Platform",
    context: "A women-focused mobility concept operating across conservative &  progressive environments simultaneously.",
    role: "Concept development, cultural positioning, narrative framing, and pitch  architecture.",
    challenge: "The organisers required an approach that increased participation while  maintaining dignity and cultural alignment.",
    outcome: "Institutional endorsement and recognition within senior government and royal adjacent circles.",
    image: "/images/advisory/sec5-2.png"
  },
  {
    id: "03",
    title: "Royal-Adjacent Cultural Event Concept (London)",
    context: "A London-based initiative fostering international cultural relations through a  women-focused leadership event designed for VVIP attendance.",
    role: "Event concept architecture, cultural protocol guidance, and guest experience  design.",
    challenge: "The organisers required an approach that increased participation while  maintaining dignity and cultural alignment.",
    outcome: "Successful execution within a high-sensitivity, diplomatic environment.",
    image: "/images/advisory/sec5-3.png"
  },
  {
    id: "04",
    title: "Istanbul Cultural Fashion Narrative",
    context: "A cultural fashion project positioning Istanbul as a global centre for modest  fashion, craftsmanship, and heritage.",
    role: "Creative direction, visual storytelling, and narrative development.",
    challenge: "The organisers required an approach that increased participation while  maintaining dignity and cultural alignment.",
    outcome: "Strengthened international positioning within the global fashion and culture  conversation.",
    image: "/images/advisory/sec5-4.png"
  }
];

const advisoryCards = [
  {
    image: "/images/advisory/cultural.png",
    title: "Cultural & Market Strategy",
    description:
      "Advising governments, institutions, and organisations operating across culturally complex markets where local, expatriate, and international audiences coexist.",
  },
  {
    image: "/images/advisory/narrative.png",
    title: "Narrative, Positioning & Trust",
    description:
      "Shaping narratives that communicate legitimacy and restraint, particularly within environments influenced by power, tradition, and long-term reputation.",
  },
  {
    image: "/images/advisory/creative.png",
    title: "Creative Direction & Cultural Campaigns",
    description:
      "Conceptualising and directing cinematic campaigns, events, and cultural moments aligned with high-status audiences and institutional settings.",
  },
  {
    image: "/images/advisory/founder.png",
    title: "Founder & Executive Counsel",
    description:
      "Providing discreet strategic counsel to founders, executives, and leadership teams operating under cultural, political, or reputational sensitivity.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EngagementItem = ({ item, isExpanded, setExpandedEngagement }: any) => {
  // Click-based: toggle expand/collapse
  const handleToggle = () => {
    setExpandedEngagement(isExpanded ? null : item.id);
  };

  return (
    <div
      className="border-t border-text/20 py-8 transition-all duration-500"
    >
      {/* Header Row — clickable */}
      <div
        className="flex justify-between items-center cursor-pointer select-none group"
        onClick={handleToggle}
        role="button"
        aria-expanded={isExpanded}
      >
        <h3
          className={`text-[24px] transition-all duration-500 group-hover:opacity-100 ${isExpanded ? "opacity-100" : "opacity-50"
            }`}
        >
          {item.title}
        </h3>

        <div className="flex items-center gap-4">
          {/* +/− toggle indicator */}
          {/* <span
            className={`text-[28px] leading-none font-light transition-all duration-300 ${
              isExpanded ? "opacity-100 rotate-0" : "opacity-40 rotate-0"
            }`}
            style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.3s ease, opacity 0.3s ease" }}
          >
            +
          </span> */}
          <span
            className={`text-[20px] dm-sans transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-40"
              }`}
          >
            {item.id}
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="flex flex-col gap-2">
                  <div className="text-[16px] font-semibold uppercase dm-sans">
                    Context
                  </div>
                  <p className="text-[14px] dm-sans leading-relaxed">
                    {item.context}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[16px] font-semibold uppercase">
                    Selhaya's Role
                  </div>
                  <p className="text-[14px] dm-sans leading-relaxed">
                    {item.role}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[16px] font-semibold uppercase">
                    Challenge
                  </div>
                  <p className="text-[14px] dm-sans leading-relaxed">
                    {item.challenge}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[16px] font-semibold uppercase">
                    Outcome
                  </div>
                  <p className="text-[14px] dm-sans leading-relaxed">
                    {item.outcome}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-full h-[300px] overflow-hidden relative">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CulturalAdvisoryPage() {
  const [expandedEngagement, setExpandedEngagement] = useState<string | null>("01");
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <SEO
        title={SEO_CONFIG.advisory.title}
        description={SEO_CONFIG.advisory.description}
        canonical={SEO_CONFIG.advisory.canonical}
      />
      <div className="w-full">
        {/* hero section */}
        <HeroSection title="Cultural & Strategic Advisory"
          desktopText=<p>Selhaya operates as a cultural and strategic advisory trusted by governments,  royal-adjacent <br />institutions, and high-net-worth organisations navigating  complex, high-status environments.</p>
          mobileText="Selhaya operates as a cultural and strategic advisory trusted by governments,  royal-adjacent institutions, and high-net-worth organisations navigating  complex, high-status environments."
          image="/images/advisory/advisoryHero.png"
        />
        {/* logo */}
        <FloatingLogo />

        {/* 2nd section */}
        <section className="relative py-10 md:py-20 px-6 md:px-12 bg-section-bg z-1 text-text">
          <motion.div
            className="md:text-center flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1
              variants={fadeUp}
              className="text-[24px] md:text-[28px]"
            >
              Why Selhaya
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="space-y-6 max-w-7xl mx-auto"
            >
              <p className="text-[16px] md:text-[20px] text-left md:text-center ">
                Founded on lived fluency across Western and Middle Eastern power structures.
              </p>

              <p className="w-full lg:w-3/4 mx-auto text-[16px] md:text-[20px] text-left md:text-center ">
                Founded by entrepreneurs with backgrounds across luxury fashion,
                public policy and technology, Selhaya brings rare fluency across
                Western and Middle Eastern contexts.
              </p>
              <p className="w-full lg:w-3/4 mx-auto text-[16px] md:text-[20px] text-left md:text-center ">
                As Muslim founders with lived experience operating within royal,
                ministerial and high-net-worth environments, we understand both
                the visible and invisible dynamics that shape trust, access and
                legitimacy.
              </p>

            </motion.div>
          </motion.div>
        </section>

        {/* 3rd section */}
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
          {/* Left Image */}
          <div className="relative overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 1.2 }}
              src="images/advisory/thirdSection.png"
              alt="Advisory"
              className="w-full h-[500px] md:h-screen object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Right Text */}
          <div className="bg-primary-light text-text px-10 lg:px-20 py-10 md:py-10 md:py-20 flex flex-col justify-center h-fit md:h-screen">
            <div className="w-full  flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h2 className="text-[36px]">
                  Designed for leaders navigating<br /> complex cultural environments
                </h2>
                <p className="text-[16px] dm-sans">
                  Operating at high-net-worth and diplomatic levels those navigating cultural nuance, international visibility, and reputation with discretion and depth.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[16px] font-bold uppercase dm-sans">
                  SELHAYA ADVISES:
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-8 items-start">
                    <span className="text-[24px] font-editorial">01</span>
                    <p className="text-[16px]">
                      Government and royal-adjacent institutions.
                    </p>
                  </div>

                  <div className="flex gap-8 items-start">
                    <span className="text-[24px] font-editorial">02</span>
                    <p className="text-[16px]">
                      Luxury brands and organisations operating at{" "}<br className="hidden lg:block" />{" "}high-net-worth level.
                    </p>
                  </div>

                  <div className="flex gap-8 items-start">
                    <span className="text-[24px] font-editorial">03</span>
                    <p className="text-[16px]">
                      Founders & leadership teams navigating sensitive{" "}<br className="hidden lg:block" />{" "}cultural, reputational, or expansion decisions.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[16px] md:mt-6">
                Engagements often involve international audiences spanning the Middle East,
                Europe, and Southeast Asia.
              </p>
            </div>
          </div>

        </section>

        {/* 4th section - How We Advise */}
        <section className="bg-text py-10 md:py-20 px-10 xl:px-20 text-primary-light">
          <div className="">
            {/* Header */}
            <motion.div
              className="mb-6 md:mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={fadeUp} className="text-[14px] uppercase tracking-wider mb-4 md:mb-6 dm-sans opacity-80">
                HOW WE ADVISE
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-[24px] md:text-[36px] ">
                Advisory across culture, perception,{" "}<br className="hidden md:block" />{" "}narrative, and institutional positioning.
              </motion.h2>
            </motion.div>

            {/* Mobile Swiper */}
            <div className="block md:hidden">
              <Swiper
                slidesPerView={1}
                spaceBetween={24}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              >
                {advisoryCards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#3a2a22]">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="mt-6">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-[28px] leading-tight">
                            {card.title}
                          </h3>

                          <span className="text-sm shrink-0">
                            {activeSlide + 1}/{advisoryCards.length}
                          </span>
                        </div>

                        <p className="mt-4 text-[14px] leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10">
              {advisoryCards.map((card, index) => (
                <div key={index} className="flex flex-col gap-8 h-full">
                  <div className="aspect-square overflow-hidden bg-[#3a2a22]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div>
                    <h3 className="text-[24px] mb-4">
                      {card.title}
                    </h3>

                    <p className="text-[14px]">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6th section - Selected Engagements */}
        <section className="bg-primary-light text-text py-10 md:py-20 px-6 md:px-12 lg:px-20 border-t border-text/20">
          <div className="mx-auto">
            <h2 className="text-[24px] md:text-[36px] mb-16 tracking-tight">
              Selected engagements executed within{" "}<br className="hidden lg:block" />{" "}high-sensitivity environments
            </h2>

            <div className="flex flex-col">
              {engagements.map((item) => (
                <EngagementItem
                  key={item.id}
                  item={item}
                  isExpanded={expandedEngagement === item.id}
                  setExpandedEngagement={setExpandedEngagement}
                />
              ))}

              {/* Final bottom border */}
              <div className="border-t border-text/20"></div>
            </div>
          </div>
        </section>

        <ContactPage />
      </div>
    </>
  );
}