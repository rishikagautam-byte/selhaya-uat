import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import slider1 from "../../assets/patronage/Slider/image1.png";
import slider1mob from "../../assets/patronage/Slider/image1mob.png";
import slider2 from "../../assets/patronage/Slider/image2.png";
import slider3 from "../../assets/patronage/Slider/image3.png";

export interface SlideItem {
    image: string;
    mobileImage?: string;
    caption: string;
}

const defaultSlides: SlideItem[] = [
    { image: slider1, mobileImage: slider1mob, caption: "The Ceremonial Presentation Of The Sovereign Jewel." },
    { image: slider2, caption: "The inaugural SELHAYA Royal Cultural Salon at Mansion House." },
    { image: slider3, caption: "SELHAYA Silk Art unveiled in the Drawing Room." },
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 1,
    }), 
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        opacity: 1,
    }),
};

interface SlideshowSectionProps {
    slides?: SlideItem[];
}

export default function SlideshowSection({ slides = defaultSlides }: SlideshowSectionProps) {
    const [[current, direction], setSlide] = useState([0, 1]);
    const [isPaused, setIsPaused] = useState(false);
    const [mobileSlide, setMobileSlide] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    const goNext = useCallback(() => {
        setSlide(([prev]) => [(prev + 1) % slides.length, 1]);
    }, [slides.length]);

    const goPrev = useCallback(() => {
        setSlide(([prev]) => [(prev - 1 + slides.length) % slides.length, -1]);
    }, [slides.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsPaused(true);
        goNext();
    }, [goNext]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsPaused(true);
        goPrev();
    }, [goPrev]);

    const handleMobilePrev = () => {
        if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.stop();
        }
        swiperRef.current?.slidePrev();
    };

    const handleMobileNext = () => {
        if (swiperRef.current?.autoplay) {
            swiperRef.current.autoplay.stop();
        }
        swiperRef.current?.slideNext();
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(goNext, 5000);
        return () => clearInterval(timer);
    }, [isPaused, goNext]);

    return (
        <>
            {/* Desktop Slider */}
            <section
                className="relative w-full h-screen overflow-hidden hidden md:block"
                onClick={() => setIsPaused(!isPaused)}
            >
                {/* Sliding Images */}
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.img
                        key={current}
                        src={slides[current].image}
                        alt={slides[current].caption}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="absolute bottom-32 inset-x-0 flex items-center justify-center z-10">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/30 cursor-pointer"
                            aria-label="Previous slide"
                        >
                            <svg width="28" height="20" viewBox="0 0 37 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.1875 13.3516H0.6875M13.6875 27.8516L0.6875 13.3516L13.6875 0.351562" stroke="#F5F1EB" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/30 cursor-pointer"
                            aria-label="Next slide"
                        >
                            <svg width="28" height="20" viewBox="0 0 37 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 13.3516H35.5M22.5 27.8516L35.5 13.3516L22.5 0.351562" stroke="#F5F1EB" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-12 left-0 right-0 z-10 text-center px-6">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={current}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="text-[24px] lg:text-[28px] font-editorial text-white"
                        >
                            {slides[current].caption}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </section>

            {/* Mobile Swiper */}
            <section className="relative w-full overflow-hidden md:hidden">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    speed={700}
                    className="w-full"
                    onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper; }}
                    onSlideChange={(swiper: SwiperType) => setMobileSlide(swiper.realIndex)}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full aspect-[4/3]">
                                <img
                                    src={slide.mobileImage || slide.image}
                                    alt={slide.caption}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Caption + Navigation on #D0C4B7 background */}
                <div className="flex flex-col items-center py-4 px-2 ">
                    <p className="  text-[12px] font-medium text-text text-center">
                        {slides[mobileSlide]?.caption}
                    </p>
                </div>

                <div className="flex items-center gap-4 justify-center pb-10  ">
                    <button
                        onClick={handleMobilePrev}
                        className="w-11 h-11 rounded-full flex items-center justify-center bg-choclate-brown cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <svg width="22" height="16" viewBox="0 0 37 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.1875 13.3516H0.6875M13.6875 27.8516L0.6875 13.3516L13.6875 0.351562" stroke="#F5F1EB" />
                        </svg>
                    </button>
                    <button
                        onClick={handleMobileNext}
                        className="w-11 h-11 rounded-full flex items-center justify-center bg-choclate-brown cursor-pointer"
                        aria-label="Next slide"
                    >
                        <svg width="22" height="16" viewBox="0 0 37 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 13.3516H35.5M22.5 27.8516L35.5 13.3516L22.5 0.351562" stroke="#F5F1EB" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    );
}

