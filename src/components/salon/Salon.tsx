import { useState, useRef } from "react";
import { motion } from "framer-motion"
import { useLenis } from "lenis/react";
import toast from "react-hot-toast";
import heroImg from "../../assets/salon/salonHero.png"
import HeroSection from "../HeroSection"
import { Link } from "react-router-dom"
import { fadeUp, staggerContainer } from "@/animations/textAnimation"
import moment from "../../assets/salon/moment.png";
import hosts from '../../assets/salon/hosts.png';
import chapter from "../../assets/salon/chapter.png";
import SlideshowSection from "../global/SlideshowSection";
import type { SlideItem } from "../global/SlideshowSection";
import salonSlide1 from "../../assets/salon/slider/image1.png";
import salonSlide2 from "../../assets/salon/slider/image2.png";
import salonSlide3 from "../../assets/salon/slider/image3.png";
import salonSlide4 from "../../assets/salon/slider/image4.png";
import salonSlide5 from "../../assets/salon/slider/image5.png";
import london from "../../assets/salon/london.png";
import circle from "../../assets/salon/circle.png";

const salonSlides: SlideItem[] = [
    { image: salonSlide1, caption: "SELHAYA Silk Art unveiled in the Drawing Room . " },
    { image: salonSlide2, caption: "Her Regal Majesty presents a gift to Founder’s from the King " },
    { image: salonSlide3, caption: "Live luxury singer and musicians accompanied the afternoon " },
    { image: salonSlide4, caption: "The Sovereign Jewel gold taffeta silk, embroidery & crystal" },
    { image: salonSlide5, caption: "The Royal Collection presented through the Egyptian Hall " },
];

import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

export default function Salon() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        priorityGuestList: false,
        sponsorshipOpportunities: false,
        sovereignCircle: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLElement>(null);
    const lenis = useLenis();

    const scrollToRegisterForm = (type?: 'priorityGuestList' | 'sponsorshipOpportunities') => {
        if (type) {
            setFormData(prev => ({ ...prev, [type]: true }));
        }
        if (lenis && formRef.current) {
            lenis.scrollTo(formRef.current, { offset: -40, duration: 1.2 });
        } else if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            toast.error("First name is required");
            return;
        }
        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("action", "SalonEnquiry");
            formDataToSend.append("firstName", formData.firstName.trim());
            formDataToSend.append("lastName", formData.lastName.trim());
            formDataToSend.append("email", formData.email.trim());
            formDataToSend.append("priorityGuestList", formData.priorityGuestList ? "true" : "false");
            formDataToSend.append("sponsorshipOpportunities", formData.sponsorshipOpportunities ? "true" : "false");
            formDataToSend.append("sovereignCircle", formData.sovereignCircle ? "true" : "false");
            formDataToSend.append("website", ""); // Honeypot

            const response = await fetch(import.meta.env.VITE_CONTACT_FORM_URL, {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Registration received successfully");
                setIsSubmitted(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    priorityGuestList: false,
                    sponsorshipOpportunities: false,
                    sovereignCircle: false,
                });
                setTimeout(() => setIsSubmitted(false), 6000);
            } else {
                toast.error(result.message || "Failed to submit enquiry");
            }
        } catch (err) {
            console.error("Salon submission error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title={SEO_CONFIG.salon.title}
                description={SEO_CONFIG.salon.description}
                canonical={SEO_CONFIG.salon.canonical}
            />
            <HeroSection
                image={heroImg}
                title={"The Selhaya Royal Cultural Salon"}
                desktopText=
                <>An invitation-only annual gathering where <br />
                    cultural luxury, craftsmanship and royal patronage meet.</>
                twoLinks=<motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-4 flex flex-col md:flex-row items-center md:gap-8 text-[16px] md:text-[18px]"
                >
                    <button
                        type="button"
                        onClick={() => scrollToRegisterForm('priorityGuestList')}
                        className="underline uppercase cursor-pointer hover:opacity-80 transition-opacity"
                        data-cta="salon_priority_list"
                    >
                        Join the 2027 Priority Guest List
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollToRegisterForm('sponsorshipOpportunities')}
                        className="underline uppercase cursor-pointer hover:opacity-80 transition-opacity"
                        data-cta="salon_sponsorship"
                    >
                        Explore Sponsorship Opportunities
                    </button>

                </motion.div>
            />

            <section className="grid grid-cols-1 md:grid-cols-2 w-full bg-section-bg  text-text">
                <motion.div variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className=" flex flex-col h-full justify-between py-10 md:py-16 px-6 lg:px-10 xl:px-16 items-center md:items-start text-center md:text-left">
                    <div className="space-y-6">

                        <motion.p variants={fadeUp}
                            className="text-[16px] md:text-[20px]"
                        >
                            The Moment
                        </motion.p>
                        <motion.h2 variants={fadeUp}
                            className="text-[24px] lg:text-[36px] font-editorial mb-6"
                        >
                            A New London Cultural{" "}
                            <br className="hidden md:block" />
                            Gathering
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-[16px] md:text-[20px] text-center space-y-6 md:text-justify"
                    >
                        <p className="text-[16px] md:text-[24px] font-editorial">On 27 June 2026, SELHAYA introduced a new{" "}<br className="hidden xl:block" />event for the London luxury calendar. </p>


                        <p>The inaugural SELHAYA Royal Cultural Salon welcomed guests within the historic setting of Mansion House, the Grade I listed Georgian town palace serving as an iconic landmark in the City of London since 1752. </p>

                        <p>The afternoon brought together royalty, founders, patrons of the arts, and cultural leaders for a private gathering to appreciate silk, craftsmanship, and the future of luxury.  For the first time, London guests were invited into the full world of SELHAYA: silk couture, collectable silk art, live musicians, elegant afternoon tea and conversation. </p>
                    </motion.div>
                </motion.div>
                <div className="md:h-auto">
                    <img
                        src={moment}
                        alt="Garments of Presence"
                        className="w-full h-125 md:h-screen object-cover object-bottom"
                    />
                </div>
            </section >

            <section className="w-full bg-choclate-brown text-primary-light py-10 px-6 md:py-16 lg:py-0 md:px-10 xl:px-0">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 xl:gap-0 items-start w-full"
                >
                    <h3 className="md:hidden text-[28px] lg:text-[36px] text-center">
                        SELHAYA Founders <br /> as Hosts
                    </h3>
                    {/* Image Column */}
                    <motion.div
                        variants={fadeUp}
                        className="w-full md:h-screen"
                    >
                        <img
                            src={hosts}
                            alt="SELHAYA Founders as Hosts "
                            className="w-full h-full object-contain xl:py-20"
                        />
                    </motion.div>

                    {/* Text Columns */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col justify-between h-full text-[16px] md:text-[20px] dm-sans md:py-24 xl:pr-20 font-light"
                    >
                        <h3 className="hidden md:block text-[28px] xl:text-[36px]">
                            SELHAYA Founders as Hosts
                        </h3>
                        <div className="space-y-8 text-justify">

                            <p className="font-editorial text-[16px] md:text-[20px] xl:text-[24px] font-light tracking-wide text-left leading-relaxed">
                                Founded in London by Aisha Hossain & Sajjad Choudhury, SELHAYA was created as a British cultural luxury House rooted in culture, craftsmanship and legacy.
                            </p>

                            <p className="md:text-justify">
                                Taking place between two of the capital's most recognised summer moments, Royal Ascot and Wimbledon, the Founders curated the Salon to be a new space within London's social season, designed to bring together people whose worlds do not often meet in one room, connected by creativity and influence.

                            </p>
                            <Link to={"/the-house-of-selhaya"} className="space-y-2 underline underline-offset-4 uppercase" data-cta="salon_partnership">
                                Explore the house
                            </Link>
                        </div>
                    </motion.div>



                </motion.div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 w-full   text-text border-b">
                <motion.div variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="order-2 md:order-1 flex flex-col h-full items-center md:items-start justify-between py-10 md:py-16 px-6 md:px-10 xl:px-20">
                    <div className="space-y-6">
                        <motion.h2 variants={fadeUp}
                            className="text-[24px] lg:text-[36px] font-editorial mb-6 text-center md:text-left"
                        >
                            A New Chapter Under Royal Patronage
                        </motion.h2>
                    </div>
                    <motion.div variants={fadeUp}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-[16px] md:text-[20px] space-y-6 text-center md:text-left"
                    >

                        <p>Following the inaugural Salon, Her Regal Majesty Queen Temitope Enitan-Ogunwusi announced her role as Official Royal Patron of SELHAYA, marking a defining chapter in the Maison’s cultural journey. </p>

                        <p>Her patronage reflects a shared belief that silk is beyond simply fashion. It can become heritage, art, memory and a vehicle for meaningful philanthropic impact. </p>
                    </motion.div>
                    <motion.div variants={fadeUp}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-[16px] md:text-[20px] text-left space-y-6 flex flex-col items-center md:items-start mt-8"
                    >
                        <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4849 15C11.2788 15 9.86061 13.2632 10.3333 11.0526C10.3333 10.9737 10.4121 10.8947 10.4121 10.8158C11.4364 7.02632 16.4 4.57895 17.4242 0H19C18.2909 3.31579 15.0606 5.21053 12.9333 7.6579C13.6424 7.34211 14.3515 7.10526 15.1394 7.10526C17.3455 7.10526 18.6848 8.84211 18.2121 11.0526C17.7394 13.2632 15.6909 15 13.4849 15ZM0.0909178 11.0526C0.0909178 10.9737 0.169706 10.8947 0.169706 10.8158C1.19395 7.02632 6.15758 4.57895 7.18182 0H8.75758C8.04849 3.31579 4.81819 5.21053 2.69092 7.6579C3.40001 7.34211 4.1091 7.10526 4.89698 7.10526C7.10304 7.10526 8.44243 8.84211 7.9697 11.0526C7.49698 13.2632 5.44849 15 3.24243 15C1.03637 15 -0.381809 13.2632 0.0909178 11.0526Z" fill="#281B13" />
                        </svg>

                        <p className="font-editorial md:leading-relaxed md:text-[20px] text-center md:text-left mb-4">True luxury is not measured by what we wear, but by the legacy we weave. As Official Royal Patron of SELHAYA, I proudly champion a House where silk becomes heritage, craftsmanship becomes culture, and elegance becomes a timeless legacy.</p>

                    </motion.div>
                    <Link to={"/royal-patronage"} className="underline underline-offset-4 uppercase text-[16px] md:text-[20px]" data-cta="salon_royal_patronage">
                        Explore Selhaya Royal patronage
                    </Link>
                </motion.div>
                <div className="md:h-full order-1 md:order-2">
                    <img
                        src={chapter}
                        alt="A New Chapter Under Royal Patronage "
                        className="w-full h-125 md:h-screen object-cover object-top"
                    />
                </div>
            </section >

            <section className="w-full bg-primary-light text-text py-16 px-6 md:py-24 md:px-16">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center gap-10"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="font-editorial text-[28px] md:text-[36px] lg:text-[48px]"
                    >
                        Silk as Art.{" "}<br className="md:hidden" />{" "}Silk as Legacy
                    </motion.h2>

                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col items-center gap-6 text-[16px] lg:text-[20px]"
                    >
                        <p className="font-editorial tracking-wider">
                            At the inaugural Salon, SELHAYA presented ceremonial silk couture from{" "}
                            <br className="hidden md:block" />
                            The Royal Collection and introduced SELHAYA Silk Art for the first time.
                        </p>

                        <p>
                            The Sovereign Jewel, a debut Maison silk art piece handcrafted on gold taffeta{" "}
                            <br className="hidden md:block" />
                            silk and embellished with hundreds of crystals, was created for His Imperial{" "}
                            <br className="hidden md:block" />
                            Majesty the Ooni of Ife and presented to Her Regal Majesty Queen Temitope{" "}
                            <br className="hidden md:block" />
                            during the SELHAYA Royal Cultural Salon.
                        </p>

                        <p>
                            The Maison's silk artworks marked a new chapter: silk no longer presented only{" "}
                            <br className="hidden md:block" />
                            as something to wear, but as something to collect, preserve and pass on.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <Link
                            to={"/bespoke/silk-art"}
                            className="underline underline-offset-4 uppercase text-[16px] md:text-[20px]"
                            data-cta="salon_silk_art"
                        >
                            Explore Selhaya Silk Art
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <SlideshowSection slides={salonSlides} />


            <section className="w-full bg-section-bg text-text py-10 px-6 md:py-20 md:px-10 lg:px-16 ">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-6 md:gap-10 lg:gap-16 items-start w-full"
                >
                    <div className="md:hidden">
                        <h3 className="text-[28px]">
                            SELHAYA Royal Cultural Salon
                        </h3>
                        <motion.div
                            variants={fadeUp}
                            className="w-full"
                        >
                            <img
                                src={london}
                                alt="SELHAYA Founders as Hosts "
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    </div>
                    {/* Text Columns */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col justify-between h-full text-[16px] md:text-[20px] dm-sans py-4 md:py-10"
                    >
                        <h3 className="hidden lg:block text-[36px]">
                            SELHAYA Royal Cultural Salon
                        </h3>
                        <div className="space-y-8">

                            <div className="text-[16px] md:text-[20px]">
                                <h3 className="text-[16px] md:text-[24px] mb-6">
                                    Autumn 2027 · London
                                </h3>
                                The 2nd annual edition of the SELHAYA Royal Cultural Salon is
                                being curated for Autumn 2027. Presented as an elegant evening of celebration and conversation, it will once again bring together royalty, cultural leaders, patrons of the arts and philanthropists.
                            </div>

                            <p>
                                The event will expand the Salon into a gala dinner with an exclusive SELHAYA couture presentation, silk art exhibition and a luxury auction in support of Her Regal Majesty’s charitable initiatives.

                            </p>

                        </div>
                        <div>
                            
                        <p className="text-[16px] md:text-[20px] uppercase mt-6">
                            Selected guests and patrons can now register their interest for the upcoming Royal Cultural Salon 2027.
                        </p>
                        <button
                            type="button"
                            onClick={() => scrollToRegisterForm('priorityGuestList')}
                            className="space-y-2 underline uppercase mt-4 underline-offset-4 text-left cursor-pointer hover:opacity-80 transition-opacity"
                            data-cta="salon_priority_list"
                        >
                            Join the 2027 Priority Guest List
                        </button>
                        </div>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        variants={fadeUp}
                        className="w-full"
                    >
                        <img
                            src={london}
                            alt="SELHAYA Founders as Hosts "
                            className="hidden md:block w-full h-auto object-cover p-6"
                        />
                    </motion.div>
                </motion.div>
            </section>


            <section className="w-full bg-choclate-brown text-primary-light py-10 px-6 md:py-20 lg:px-16     ">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 items-start w-full"
                >
                    {/* Image Column */}
                    <motion.div
                        variants={fadeUp}
                        className="w-full"
                    >
                        <h3 className="md:hidden text-[36px] mb-4">
                            Sovereign Circle
                        </h3>
                        <img
                            src={circle}
                            alt="SELHAYA Founders as Hosts "
                            className="w-full h-auto object-cover lg:p-10"
                        />
                    </motion.div>

                    {/* Text Columns */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col justify-center gap-4 md:gap-10 h-full text-[16px] md:text-[20px] dm-sans lg:py-10"
                    >
                        <h3 className="hidden md:block text-[36px]">
                            Sovereign Circle
                        </h3>
                        <div className="space-y-8   ">

                            <p className="text-[16px] md:text-[20px]">
                                Alongside the annual Salon, a limited number of {" "}<br className="hidden xl:block" />
                                founding patrons will be considered for the SELHAYA {" "}<br className="hidden xl:block" />
                                Sovereign Circle. This annual membership grants  {" "}<br className="hidden xl:block" />
                                complimentary access to the SELHAYA Royal Cultural {" "}<br className="hidden xl:block" />
                                Salon along with exclusive invitations to private {" "}<br className="hidden xl:block" />
                                founder gatherings, cultural publications and Maison {" "}<br className="hidden xl:block" />
                                collection previews.

                            </p>

                        </div>
                        <Link to={"/sovereign-circle"} className="my-4 uppercase underline underline-offset-4" data-cta="salon_sovereign_circle">
                            Join sovereign circle
                        </Link>
                    </motion.div>



                </motion.div>
            </section>

            {/* Register Private Interest Section (Built with Flexbox) */}
            <section
                ref={formRef}
                id="register-private-interest"
                className="w-full bg-primary-light text-text py-16 md:py-24 px-6 md:px-12 lg:px-[25%] flex flex-col items-center justify-center"
            >
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col w-full gap-8 md:gap-10"
                >
                    {/* Header: Title & Description */}
                    <motion.div variants={fadeUp} className="flex flex-col md:items-center md:text-center gap-6">
                        <h2 className="text-[24px] sm:text-[36px]  text-text">
                            Register Private Interest
                        </h2>
                        <p className="text-[16px] md:text-[20px] text-text dm-sans font-light leading-relaxed text-left">
                            Participation in the Royal Cultural Salon is by invitation and considered enquiry. <br />
                            Selhaya welcomes conversations with individuals and organisations whose work aligns with the values of cultural preservation, craftsmanship, education, and international collaboration.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        variants={fadeUp}
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full gap-8 dm-sans"
                    >
                        {/* Enquiry Details Subheading */}
                        <div className="flex flex-col w-full gap-5">
                            <p className="text-[14px] md:text-[16px] font-semibold uppercase text-text dm-sans">
                                ENQUIRY DETAILS
                            </p>

                            {/* Text Input Fields */}
                            <div className="flex flex-col w-full gap-3">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name*"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent py-1 border-b border-text/35 text-text placeholder:text-text/50 text-[14px] md:text-[16px] outline-none focus:border-text transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name*"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent py-1 border-b border-text/35 text-text placeholder:text-text/50 text-[14px] md:text-[16px] outline-none focus:border-text transition-colors"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address*"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent py-1 border-b border-text/35 text-text placeholder:text-text/50 text-[14px] md:text-[16px] outline-none focus:border-text transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Area of Interest */}
                        <div className="flex flex-col w-full gap-4">
                            <span className="text-[15px] md:text-[16px] text-text/70 font-normal">
                                Area of interest *
                            </span>

                            <div className="flex flex-col gap-3.5">
                                <label className="flex items-center gap-3.5 cursor-pointer group select-none">
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <input
                                            type="checkbox"
                                            name="priorityGuestList"
                                            checked={formData.priorityGuestList}
                                            onChange={handleCheckboxChange}
                                            className="peer appearance-none w-4 h-4 border border-text/60 bg-transparent checked:bg-text checked:border-text transition-all duration-200 cursor-pointer"
                                        />
                                        <svg
                                            className="absolute size-3 hidden peer-checked:block pointer-events-none text-primary-light"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[14px] md:text-[16px] text-text/80 group-hover:text-text transition-colors">
                                        Join the 2027 Priority Guest List
                                    </span>
                                </label>

                                <label className="flex items-center gap-3.5 cursor-pointer group select-none">
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <input
                                            type="checkbox"
                                            name="sponsorshipOpportunities"
                                            checked={formData.sponsorshipOpportunities}
                                            onChange={handleCheckboxChange}
                                            className="peer appearance-none w-4 h-4 border border-text/60 bg-transparent checked:bg-text checked:border-text transition-all duration-200 cursor-pointer"
                                        />
                                        <svg
                                            className="absolute size-3 hidden peer-checked:block pointer-events-none text-primary-light"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[14px] md:text-[16px] text-text/80 group-hover:text-text transition-colors">
                                        Explore Sponsorship Opportunities
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Sovereign Circle Membership Checkbox */}
                        <div className="flex flex-col w-full border-y border-text/30 py-4">
                            <label className="flex items-start sm:items-center gap-3.5 cursor-pointer group select-none">
                                <div className="relative flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                                    <input
                                        type="checkbox"
                                        name="sovereignCircle"
                                        checked={formData.sovereignCircle}
                                        onChange={handleCheckboxChange}
                                        className="peer appearance-none w-4 h-4 border border-text/60 bg-transparent checked:bg-text checked:border-text transition-all duration-200 cursor-pointer"
                                    />
                                    <svg
                                        className="absolute size-3 hidden peer-checked:block pointer-events-none text-primary-light"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-[14px] md:text-[16px] text-text/80 group-hover:text-text transition-colors leading-snug">
                                    I would like to be considered for the SELHAYA Sovereign Circle Membership.
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-3 text-[16px] md:text-[17px] text-text font-normal transition-all cursor-pointer group disabled:opacity-50"
                            >
                                <span>{loading ? "Submitting..." : "Submit Private Enquiry"}</span>
                                {!loading && (
                                    <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[18px] md:text-[20px] font-light">
                                        &rarr;
                                    </span>
                                )}
                            </button>
                        </div>

                        {isSubmitted && (
                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[14px] text-green-800 font-medium"
                            >
                                Thank you for your interest. Your enquiry has been received.
                            </motion.p>
                        )}
                    </motion.form>
                </motion.div>
            </section>
        </>
    )
}
