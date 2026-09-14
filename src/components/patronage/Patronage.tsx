import HeroSection from "../HeroSection";
import heroImage from "../../assets/patronage/patronageHero.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "@/animations/textAnimation";
import appointment from "../../assets/patronage/appointment.png";
import HerRegalMajesty from "../../assets/patronage/RegalMajesty.png";
import Background1 from "../../assets/patronage/hands.png";
import coronation from "../../assets/patronage/coronation.png";
import SlideshowSection from "../global/SlideshowSection";
import salonImage from "../../assets/patronage/Salon.png";
import lastingLegacy from "../../assets/patronage/lastingLegacy.png";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function Patronage() {
    return (
        <>
            <SEO
                title={SEO_CONFIG.patronage.title}
                description={SEO_CONFIG.patronage.description}
                canonical={SEO_CONFIG.patronage.canonical}
            />

            <HeroSection image={heroImage}
                smallUpperTitle=
                <>
                    OFFICIAL ROYAL PATRON
                </>
                title=<>
                    Her Regal Majesty <br />
                    Queen Temitope Enitan-Ogunwusi
                </>
                imageAlt='Her Regal Majesty Queen Temitope Enitan-Ogunwusi'
                // desktopText={
                //     <>
                //         A defining appointment affirming SELHAYA’s place <br />
                //         as a British cultural luxury House.
                //     </>
                // }
                // mobileText="A 
                // defining appointment affirming SELHAYA’s place as a British cultural luxury House."
                textColor="text-white"
            />


            <section className="flex flex-col md:flex-row w-full  text-text">
                <div className="md:w-1/2 md:h-auto">
                    <img
                        src={appointment}
                        alt="A Defining Royal Appointment"
                        className="w-full h-[500px] md:h-screen object-cover object-top"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left px-8 py-12 md:py-20 md:px-8 lg:px-20">
                    <motion.div variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className=" flex flex-col justify-center">
                        <motion.h2 variants={fadeUp}
                            className="text-[28px] lg:text-[32px] font-editorial mb-6"
                        >
                            A Defining Royal Appointment
                        </motion.h2>
                        <motion.div variants={fadeUp}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-[16px] md:text-[20px] text-center md:text-left space-y-6"
                        >
                            <p>On 27 June 2026, Her Regal Majesty Queen Temitope Enitan-Ogunwusi joined SELHAYA as Guest of Honour at the inaugural SELHAYA Royal Cultural Salon at Mansion House in the City of London.</p>

                            <p>Following the Salon, Her Regal Majesty announced that she would serve as SELHAYA's first Official Royal Patron.</p>

                            <p>The appointment brings together a Nigerian Queen whose public life is rooted in royal stewardship and service with a House created to place culture, ceremony, and craftsmanship at the heart of modern British luxury.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* Quote Section */}
            <section className="w-full bg-primary-light text-text py-20 px-6 md:py-24 md:px-12 lg:px-24">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <motion.span
                        variants={fadeUp}
                        className="text-[48px] md:text-[72px] font-editorial text-primary-dark leading-none mb-6"
                    >
                        <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4849 15C11.2788 15 9.86061 13.2632 10.3333 11.0526C10.3333 10.9737 10.4121 10.8947 10.4121 10.8158C11.4364 7.02632 16.4 4.57895 17.4242 0H19C18.2909 3.31579 15.0606 5.21053 12.9333 7.6579C13.6424 7.34211 14.3515 7.10526 15.1394 7.10526C17.3455 7.10526 18.6848 8.84211 18.2121 11.0526C17.7394 13.2632 15.6909 15 13.4849 15ZM0.0909178 11.0526C0.0909178 10.9737 0.169706 10.8947 0.169706 10.8158C1.19395 7.02632 6.15758 4.57895 7.18182 0H8.75758C8.04849 3.31579 4.81819 5.21053 2.69092 7.6579C3.40001 7.34211 4.1091 7.10526 4.89698 7.10526C7.10304 7.10526 8.44243 8.84211 7.9697 11.0526C7.49698 13.2632 5.44849 15 3.24243 15C1.03637 15 -0.381809 13.2632 0.0909178 11.0526Z" fill="#281B13" />
                        </svg>

                    </motion.span>

                    <motion.blockquote
                        variants={fadeUp}
                        className="text-[14px] md:text-[20px] font-editorial italic text-text mb-8 md:mb-10 tracking-wider"
                    >
                        True luxury is not measured by what we wear, but by the legacy we{" "}
                        <br className="hidden lg:block" />
                        weave. As Official Royal Patron of Selhaya®, I proudly champion a House{" "}
                        <br className="hidden lg:block" />
                        where silk becomes heritage, craftsmanship becomes culture, & elegance{" "}
                        <br className="hidden lg:block" />
                        becomes a timeless legacy.
                    </motion.blockquote>

                    <motion.div
                        variants={fadeUp}
                        className=""
                    >
                        <p className="text-[14px] md:text-[20px] dm-sans font-medium  text-text uppercase">
                            Her Regal Majesty Queen Temitope{" "}<br className="md:hidden" />{" "}Enitan-Ogunwusi
                        </p>
                        <p className="text-[14px] md:text-[20px] dm-sans ">
                            Official Royal Patron of SELHAYA®
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Biography Section */}
            <section className="w-full bg-choclate-brown text-primary-light py-10 px-6 md:py-20 md:px-20 ">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-center text-[28px] md:text-[36px] font-editorial mb-8 md:mb-16 text-primary-light"
                    >
                        Her Regal Majesty
                    </motion.h2>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start w-full">

                        {/* Text Columns */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col justify-between h-full text-[16px] md:text-[20px] dm-sans  order-2 md:order-1 space-y-4 md:space-y-0"
                        >
                            <p>
                                Her Regal Majesty Queen Temitope Enitan-Ogunwusi is a Nigerian Queen of the ancient Kingdom of Ile-Ife - revered as the spiritual home of the Yoruba people - and the wife of His Imperial Majesty Oba Adeyeye Enitan Ogunwusi, Ojaja II, the 51st Ooni of Ife.
                            </p>

                            <p>
                                Ile-Ife stands among Africa’s most significant historic centres of culture, kingship and artistic heritage. Its royal institution carries profound meaning across Nigeria and the global Yoruba community. <br /><br />
                                Her Regal Majesty is Chief Executive Officer of Hopes Alive Initiative for Africa, through which she advances programmes in education, youth and women’s empowerment, health and humanitarian service. <br /><br />
                                Her public life brings together royal stewardship, philanthropy and international engagement. It is this combination of cultural authority and service that gives particular meaning to her patronage of SELHAYA.
                            </p>
                        </motion.div>

                        {/* Image Column */}
                        <motion.div
                            variants={fadeUp}
                            className="w-full order-1 md:order-2 flex justify-center"
                        >
                            <img
                                src={HerRegalMajesty}
                                alt="Her Regal Majesty Queen Temitope Enitan-Ogunwusi"
                                className="w-full h-auto object-contain object-center"
                            />
                        </motion.div>

                    </div>
                </motion.div>
            </section>

            <img src={Background1} alt="Investment & Positioning" className="h-[40vh] w-full md:h-auto object-cover" />

            {/* The Coronation Section */}
            <section className="w-full bg-primary-light py-16 px-6 md:py-20 md:px-12 lg:px-24">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className=" flex flex-col items-center text-center"
                >
                    {/* Image */}
                    <motion.div variants={fadeUp} className="w-70 md:w-[340px] mb-4">
                        <img
                            src={coronation}
                            alt="Her Regal Majesty Queen Temitope Enitan-Ogunwusi wearing The Coronation, 2026"
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    {/* Caption */}
                    <motion.p
                        variants={fadeUp}
                        className="text-[12px] md:text-[14px] dm-sans uppercase text-text mb-12 md:mb-16"
                    >
                        HER REGAL MAJESTY QUEEN TEMITOPE ENITAN-OGUNWUSI<br />
                        WEARING THE CORONATION, 2026.
                    </motion.p>

                    {/* Heading */}
                    <motion.h2
                        variants={fadeUp}
                        className="text-[28px] capitalize md:text-[36px] text-text mb-6"
                    >
                        The Coronation
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="text-[16px] md:text-[24px] font-editorial text-text mb-6 md:mb-8 tracking-wider leading-relaxed md:tracking-normal"
                    >
                        Created for Her Regal Majesty to mark the appointment. The Coronation is{" "}
                        <br className="hidden lg:block" />
                        a gold silk ceremonial creation from SELHAYA'S Royal Collection, adorned with{" "}
                        <br className="hidden lg:block" />
                        crystals and pearls.
                    </motion.p>

                    {/* Body Text */}
                    <motion.p
                        variants={fadeUp}
                        className="text-[16px] md:text-[20px] dm-sans text-text mb-8 md:mb-10"
                    >Designed by Aisha Hossain as a tribute to modern majesty, when worn by Her Regal Majesty, the{" "}
                        <br className="hidden lg:block" />
                        founding idea of the Royal Collection becomes real: that modesty can carry the full splendour,{" "}
                        <br className="hidden lg:block" />
                        dignity and authority of modern royalty. The collection is no longer only an artistic proposition.{" "}
                        <br className="hidden lg:block" />
                        Its story of modern majesty is embodied by a Queen.
                    </motion.p>

                    {/* Link */}
                    <motion.div variants={fadeUp}>
                        <Link
                            to="/bespoke/silk-garment"
                            className="text-[16px] md:text-[20px] uppercase text-text underline"
                        >
                            EXPLORE BESPOKE SILK GARMENT
                        </Link>
                        {/* <br />
                            <Link
                                to="/bespoke/silk-art"
                                className="text-[16px] md:text-[20px] uppercase text-text underline"
                            >
                                EXPLORE SELHAYA BESPOKE SILK ART
                            </Link> */}
                    </motion.div>
                </motion.div>
            </section>

            {/* Slideshow Section */}
            <SlideshowSection />

            {/* Royal Cultural Salon Section */}
            <section className="w-full bg-[#F5F1EB] text-text py-16 px-6 md:py-20 lg:px-16">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full"
                >
                    {/* Top Row: Heading left, Text content right */}
                    <div className="grid grid-col-1 lg:grid-cols-[0.7fr_1fr] md:gap-10 lg:gap-24 mb-10 md:mb-14 justify-center text-center lg:text-left">

                        {/* Left Column — Heading */}
                        <motion.div variants={fadeUp} className="mb-8 md:mb-0">
                            <h2 className="text-[28px] md:text-[36px] font-editorial  leading-tight">
                                Royal Cultural Salon
                            </h2>
                        </motion.div>

                        {/* Right Column — Subheading + Body */}
                        <motion.div variants={fadeUp} className="">
                            {/* Subheading */}
                            <p className="text-[16px] md:text-[24px] font-editorial  text-text mb-6 md:mb-8 tracking-wide">
                                A celebration of cultural diplomacy, craftsmanship and enduring partnerships.
                            </p>

                            {/* Body Text */}
                            <p className="text-[16px] md:text-[20px] dm-sans text-text ">
                                Her Regal Majesty first joined the House of SELHAYA as Guest of Honour at the inaugural Royal Cultural Salon held at Mansion House, London. During the evening, she was presented with The Sovereign Jewel, an original ceremonial artwork honouring heritage, artistry and cultural preservation. This meaningful relationship later evolved into Her appointment as Royal Patron of{" "}<br className="md:hidden" />{" "}SELHAYA.
                            </p>
                        </motion.div>
                    </div>

                    {/* Bottom Row: Image left (under heading), Pillars right (under text) */}
                    <div className="grid grid-col-1 lg:grid-cols-[0.7fr_1fr] md:gap-10 lg:gap-24 ">

                        {/* Image — aligned under heading */}
                        <motion.div variants={fadeUp} className="mb-8 md:mb-0 flex justify-center lg:justify-start">
                            <img
                                src={salonImage}
                                alt="The Royal Cultural Salon at Mansion House, London"
                                className="w-72 h-87 object-cover"
                            />
                        </motion.div>

                        {/* Pillars — aligned under text content */}
                        <motion.div
                            variants={fadeUp}
                            className=" flex flex-col gap-6 lg:gap-8"
                        >
                            {/* Pillar 1 */}
                            <div>
                                <Link to={"/cultural-salon"} className="text-[16px] md:text-[20px] uppercase mb-3 underline pointer-cursor">
                                    The Royal Cultural Salon
                                </Link>
                                <p className="text-[16px] md:text-[20px] dm-sans text-text ">
                                    An annual gathering of leaders, private patrons, cultural voices & creative figures, convened by SELHAYA around craftsmanship, identity & legacy.
                                </p>
                            </div>

                            {/* Divider */}
                            <hr className="border-text/20 hidden md:block" />

                            {/* Pillar 2 */}
                            <div>
                                <Link to={"/selhaya-silks"} className="text-[16px] md:text-[20px] uppercase mb-3 underline pointer-cursor">
                                    Ceremonial Silk and Art
                                </Link>
                                <p className="text-[16px] md:text-[20px] dm-sans text-text ">
                                    Championing works created in silk for moments of cultural, personal and institutional significance.
                                </p>
                            </div>

                            {/* Divider */}
                            <hr className="border-text/20 hidden md:block" />

                            {/* Pillar 3 */}
                            <div>
                                <p className="text-[16px] md:text-[20px] uppercase mb-3 ">
                                    Cultural & Philanthropic{" "}<br className="md:hidden" />{" "}Partnerships
                                </p>
                                <p className="text-[16px] md:text-[20px] dm-sans text-text ">
                                    Connecting the House's creative platform with selected initiatives in education, empowerment & humanitarian service.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="w-full bg-choclate-brown text-primary-light py-10 px-6 md:py-20 md:px-20 ">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start w-full"
                >
                    {/* Image Column */}
                    <motion.div
                        variants={fadeUp}
                        className="w-full"
                    >
                        <h3 className="lg:hidden text-[28px] mb-4">
                            Shape a Lasting Legacy with SELHAYA
                        </h3>
                        <img
                            src={lastingLegacy}
                            alt="Her Regal Majesty Queen Temitope Enitan-Ogunwusi"
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    {/* Text Columns */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col justify-between h-full text-[16px] md:text-[20px] dm-sans"
                    >
                        <h3 className="hidden lg:block text-[36px]">
                            Shape a Lasting Legacy{" "}<br className="hidden lg:block" />{" "}with SELHAYA
                        </h3>
                        <div className="space-y-8">

                            <p className="font-editorial text-[16px] md:text-[20px] lg:text-[24px] tracking-wide">
                                SELHAYA works with private clients, cultural{" "}
                                <br className="hidden lg:block" />
                                institutions, luxury partners and patrons to create{" "}
                                <br className="hidden lg:block" />
                                ceremonial works, cultural gatherings{" "}
                                <br className="hidden lg:block" />
                                and partnerships of distinction.
                            </p>

                            <p>
                                Whether commissioning a one-of-one silk creation, partnering with the SELHAYA Royal Cultural Salon or developing an international cultural initiative, we welcome a private conversation with those seeking work worthy of being remembered.
                            </p>
                            <ul className="space-y-2 underline underline-offset-4 flex flex-col cursor-pointer uppercase">
                                <Link to="/partnership">Discuss a Partnership</Link>
                                <Link to="/commission">Commission SELHAYA </Link>
                            </ul>
                        </div>
                        <p className="mt-4 md:mt-0">
                            <Link to="/press-enquiry" className="cursor-pointer">
                                  <span className=""> <span className="underline underline-offset-4 uppercase md:capitalize"> Press and Media</span> Enquiries</span>
                            </Link>
                        </p>
                    </motion.div>



                </motion.div>
            </section>

        </>
    )
}
