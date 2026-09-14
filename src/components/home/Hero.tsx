"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroSection from "../HeroSection";
import HouseQuitelyGives from "../global/HouseQuitelyGives";
import Bespoke from "../global/Bespoke";
import JournalSection from "./JournalSection";
import { staggerContainer, fadeUp } from "../../../src/animations/textAnimation.js"
import FloatingLogo from "../global/FloatingLogo.js";
// const selhayaVideo = "/videos/hero-video.mp4";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import ExploreLink from "../global/ExploreLink.js";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";



const collectionItems = [
  { src: "/images/home/resilence.jpg", title: "ROSE OF RESILIENCE", url: "/selhaya-collections/rose-of-resilience" },
  { src: "/images/home/haya.png", title: "HAYA", url: "/selhaya-collections/haya" },
  { src: "/images/home/waves.jpg", title: "WAVES OF LIGHT", url: "/selhaya-collections/waves-of-light" },
  { src: "/images/home/heritage.png", title: "HERITAGE", url: "/selhaya-collections/heritage" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <>
      <SEO
        title={SEO_CONFIG.home.title}
        description={SEO_CONFIG.home.description}
        canonical={SEO_CONFIG.home.canonical}
      />
      {/* hero section */}
      <HeroSection
        image="/images/home/queenHero.png"
        video="/videos/New-video-Hero.mp4?v=2"
        title="The World of Selhaya"
        titleSubText=<>Bespoke Luxury Silk Garments & Art</>
        desktopText={
          <>Under Official Royal Patronage of Queen Temitope Enitan-Ogunwusi</>
        }
        mobileText={`Under Official Royal Patronage of \n Queen Temitope Enitan-Ogunwusi`}
        buttonText="Explore The Royal Patronage →"
        buttonLink="/royal-patronage"
        textColor="text-white"
      />

      <FloatingLogo />

      {/* title and description */}
      <section className="relative py-10 md:py-24 px-10 md:px-12 bg-section-bg z-1 text-text">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} className="text-center flex flex-col gap-6">
          <motion.h2
            variants={fadeUp}
            className="text-[24px] md:text-[32px] text-left md:text-center"
          >
            Welcome to the first Maison of its kind. The{" "}<br className="hidden md:block" />{" "}exceptional world of SELHAYA
          </motion.h2>

          <div className="space-y-6 max-w-7xl mx-auto">
            <motion.p variants={fadeUp} className="w-full mx-auto text-[16px] md:text-[20px] text-left md:text-center">
              Timeless presence. Historical craftsmanship. SELHAYA encapsulates elevated beauty, ensuring every Edition transcends{" "}<br className="hidden xl:block" />{" "}the pinnacle of elegance and luxury refinement. Stories with meaning are at the core of every SELHAYA creation.
            </motion.p>

          </div>

        </motion.div>
      </section>


      {/* Sovereign robe section */}
      <section className="flex flex-col md:flex-row w-full bg-choclate-brown text-primary-light">
        <div className="md:w-1/2 md:h-auto">
          <img
            src="/images/home/sovereign.png"
            alt="Sovereign Robe"
            className="w-full h-125 md:h-screen object-cover object-center"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between px-6 py-12 md:py-20 md:px-8 lg:px-20">
          <motion.div variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className=" flex flex-col justify-center">
            <motion.h2 variants={fadeUp}
              className="text-[28px] lg:text-[32px] font-editorial mb-6"
            >
              The Sovereign Robe Reimagined
            </motion.h2>
            <motion.div variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-[16px] md:text-[20px] text-left space-y-6"
            >
              <p>Across courts, ceremonies and sacred rooms, the outer robe has long carried the image of sovereignty. It covered without diminishing, gave shape to dignity, and turned cloth into identity.</p>

              <p>Selhaya takes this ancient language and brings it into the modern luxury wardrobe. Through silk, handwork and storytelling, the House gives modest outerwear its own place in luxury: coveted, collected and remembered.</p>

              <p>For the Selhaya woman, the robe is not simply worn. It becomes her standard.</p>
            </motion.div>

          </motion.div>
          <motion.div
            className="mt-6"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ExploreLink to="/the-house-of-selhaya" />
          </motion.div>
        </div>
      </section >

      {/* Collections Section */}
      < section className="bg-primary-light text-text pt-10 md:pt-24 w-full overflow-hidden" >

        <div className="px-6 md:px-12 flex flex-col  justify-center items-center mb-4 gap-8">
          <motion.div variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>

            <motion.h3 variants={fadeUp} className="text-[24px] md:text-[28px] md:text-center md:mb-8">
              Stories with meaning are at the core of every SELHAYA creation.{" "}<br className="hidden md:block" />
              Stunning pure silk garments are made by hand for the most elegant and refined of women.
            </motion.h3>


          </motion.div>
          <div className="flex justify-between w-full items-end md:px-4">
            <motion.p variants={fadeUp} className="text-[14px] md:text-[20px]">
              Every collection portrays a story. <br />
              A unique feeling of timeless and limitless elegance.
            </motion.p>

            {/* Link */}
            <motion.div variants={fadeUp} className="hidden sm:block">
              <ExploreLink to="/selhaya-collections" text="JOURNEY SELHAYA COLLECTIONS" arrowColor="black" />
            </motion.div>

          </div>
        </div>

        {/* Desktop View (sm and up) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full pb-4">
          {collectionItems.map((item, index) => (
            <div
              key={index}
              className="relative aspect-3/4 md:aspect-4/5 group overflow-hidden"
            >
              <Link to={item.url}>
                <img
                  src={item.src}
                  alt={item.title}
                  draggable="false"
                  className="w-full h-full object-cover group-hover:scale-105 brightness-80 hover:brightness-100 transition-all duration-1000"
                />
              </Link>

              <div className="absolute bottom-6 w-full px-4 flex justify-center">
                <span className="text-white text-[12px] md:text-[14px] uppercase text-center font-medium drop-shadow-md">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="block sm:hidden w-full relative pb-10">

          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.realIndex + 1);
            }}
          >
            {collectionItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="px-6">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Link to={item.url}>
                      <img
                        src={item.src}
                        alt={item.title}
                        draggable="false"
                        className="w-full h-full object-cover brightness-80"
                      />
                    </Link>

                    <div className="absolute bottom-6 w-full px-4 flex justify-center">
                      <span className="text-white text-[12px] uppercase text-center font-medium drop-shadow-md">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between items-center px-10 mt-6">
            <span className="text-text text-[16px] font-medium tracking-wide">
              {currentSlide}/{collectionItems.length}
            </span>

            <Link
              to="/selhaya-collections"
              className="text-[16px] uppercase flex items-center gap-1"
            >
              <span className="text-text border-b border-text">
                EXPLORE THE EDITIONS
              </span>
              <span>&rarr;</span>
            </Link>
          </div>

        </div>
      </section >

      {/* bespoke */}
      < Bespoke />

      {/* Refined Cultural Presence */}
      < section className="grid grid-cols-1 md:grid-cols-2 bg-primary-light" >
        <div className="w-full h-auto">
          <img src="/images/home/presence.png"
            alt="Garments of Presence"
            className="w-full md:h-screen object-cover" />
        </div>
        <div className="px-6 py-12 xl:p-20 flex flex-col justify-between">
          <div className="text">
            <h2 className="text-[24px] md:text-[32px]">Refined Cultural Presence</h2>
            <div className="flex flex-col gap-2 md:gap-6 my-6 lg:pr-10">
              <p className="text-[16px] md:text-[20px] ">
                SELHAYA is highly regarded not only as a one of a kind Maison but for its quintessential artistic visions representing historical as well as cultural traditions.
              </p>
              <p className="text-[16px] md:text-[20px]">
                Revered worldwide by Royalty, Diplomats and Institutions, SELHAYA is carving its own unique space merging luxury with heritage. A unity of cultures abound by emotion and stories shared, who collectively appreciate the depth of care and attention to detail for the very fine luxury wear and art works of SELHAYA.
              </p>

            </div>
          </div>
          <div className="mt-4">
            <ExploreLink to="/cultural-alliance" text="Explore  Cultural Alliances" arrowColor="black" />
          </div>
        </div>
      </section >

      <section className="grid grid-cols-1 md:grid-cols-2 bg-primary-light">
        <div className="order-1 md:order-2 w-full h-125 md:h-auto">
          <img src="/images/home/salon.png"
            alt="Garments of Presence"
            className="w-full h-125 md:h-screen object-cover object-bottom" />
        </div>
        <div className="order-2 md:order-1 px-6 py-12 lg:p-20 flex flex-col justify-between">
          <motion.div
            className="text"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-[24px] md:text-[32px] mb-6">The SELHAYA Royal Cultural Salon</motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[16px] md:text-[20px] ">
              An invitation-only gathering where royalty, cultural leaders, patrons of the arts, and distinguished guests come together. Rooted in craftsmanship, cultural dialogue, and the enduring language of luxury.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-2 md:mt-6 text-[16px] md:text-[20px] ">
              The Salon brings couture, silk art, music, and heritage into one considered cultural experience. A distinctive SELHAYA gathering where artistry becomes conversation, and moments become legacy.
            </motion.p>
          </motion.div>
          <div className="mt-10 space-y-2 md:space-y-4">

            <Link to="/cultural-salon" className="group text-[16px] md:text-[20px] w-fit flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <span className="underline uppercase">EXPLORE THE ROYAL CULTURAL SALON</span>
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 2.78516H8M6.26087 5.28516L8 2.78516L6.26087 0.285156" stroke="black" />
                </svg>
              </p>
            </Link>
          </div>
        </div>
      </section>

      <HouseQuitelyGives />

      {/* journal */}
      < JournalSection />
    </>
  )
}
