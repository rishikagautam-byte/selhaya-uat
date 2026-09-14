import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";

interface CollectionItem {
    title: string;
    description: string;
    image: string;
    href: string;
    buttonText?: string;
}

interface DiscoverPureSilkProps {
    title?: React.ReactNode;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    collections?: CollectionItem[];
}

const defaultCollections: CollectionItem[] = [
    {
        title: "Waves Of Light",
        description:
            "Woven using a centuries-old technique that traps and refracts light, pure silk satin is chosen for its polished surface and smooth, lustrous feel.",
        image: "/images/global/waves-of-light.png",
        href: "/selhaya-collections/waves-of-light",
    },
    {
        title: "Rose Of Resilience",
        description:
            "Known for its exceptional durability and resistance to abrasion, pure crepe silk is chosen for garments intended for regular wear.",
        image: "/images/global/rose-of-resilience.png",
        href: "/selhaya-collections/rose-of-resilience",
    },
    {
        title: "Heritage",
        description:
            "A softly structured silhouette, cut for ease and designed to drape with fluid movement.",
        image: "/images/global/heritage.png",
        href: "/selhaya-collections/heritiage",
    },
];

function DiscoverPureSilk({
    title = (
        <>
            Discover pure silk editions <br />
            within the Maison
        </>
    ),
    description = `Selhaya’s silk abayas are presented in considered collections,
    each developed around material, form, and restraint.`,
    buttonText = "ENTER",
    buttonHref = "/selhaya-silks",
    collections = defaultCollections,
}: DiscoverPureSilkProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dragX = useMotionValue(0);

    const handleDragEnd = () => {
        const x = dragX.get();
        const swipeThreshold = 50;
        if (x <= -swipeThreshold && currentIndex < collections.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else if (x >= swipeThreshold && currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    return (
        <section className="w-full bg-choclate-brown text-primary-light py-10 md:py-20 px-6 md:px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top Content */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
                    <h2 className="text-[28px] md:text-[36px] uppercase w-full md:w-1/2">
                        {title}
                    </h2>

                    {(description || buttonText) && (
                        <div className="w-full md:w-xs flex flex-col gap-5">
                            {description && (
                                <p className="text-[14px] text-justify">
                                    {description}
                                </p>
                            )}

                            {buttonText && buttonHref && buttonText !== "none" && (
                                <Link
                                    to={buttonHref}
                                    className="text-[16px] uppercase underline underline-offset-4 w-fit opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    {buttonText}
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Desktop View (md and up) */}
                <div className="hidden md:grid md:grid-cols-3 gap-8 md:gap-12 w-full">
                    {collections.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col space-y-6 group cursor-pointer"
                        >
                            <div className=" overflow-hidden bg-primary-light">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    draggable="false"
                                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-[24px]">
                                    {item.title}
                                </h3>

                                <p className="text-[16px] md:h-24 lg:h-12 line-clamp-2">
                                    {item.description}
                                </p>

                                <Link
                                    to={item.href}
                                    className="inline-flex text-[16px] uppercase mt-2 opacity-80 hover:opacity-100 transition-opacity items-center gap-2"
                                >
                                    {item.buttonText === "Explore collection" ? (
                                        <>
                                            <span>Explore collection</span>
                                            <svg
                                                width="9"
                                                height="6"
                                                viewBox="0 0 9 6"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0 2.64258H8M6.26087 5.14258L8 2.64258L6.26087 0.142578"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </>
                                    ) : (
                                        <span className="underline">Enter</span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View (Touch-swipable carousel, md:hidden) */}
                <div className="block md:hidden w-full relative">
                    <div className="w-full overflow-hidden">
                        <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            style={{ x: dragX }}
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onDragEnd={handleDragEnd}
                            className="flex cursor-grab active:cursor-grabbing w-full"
                        >
                            {collections.map((item, index) => (
                                <div key={index} className="w-full shrink-0 px-6 select-none">
                                    <div className="flex flex-col space-y-6">
                                        <div className="aspect-[4/5] overflow-hidden bg-primary-light pointer-events-none">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                draggable="false"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-[24px]">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[16px]">{index + 1}/{collections.length}</p>
                                            </div>

                                            <p className="text-[16px]">
                                                {item.description}
                                            </p>

                                            <Link
                                                to={item.href}
                                                className="inline-flex text-[16px] uppercase mt-4 opacity-80 hover:opacity-100 transition-opacity items-center gap-2"
                                            >
                                                {item.buttonText === "Explore collection" ? (
                                                    <>
                                                        <span>Explore collection</span>
                                                        <svg
                                                            width="9"
                                                            height="6"
                                                            viewBox="0 0 9 6"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M0 2.64258H8M6.26087 5.14258L8 2.64258L6.26087 0.142578"
                                                                stroke="white"
                                                                strokeWidth="1.5"
                                                            />
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <span className="underline">Enter</span>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Dynamic Dots Indicator at the bottom */}
                    <div className="flex justify-center gap-2 mt-8 px-6">
                        {collections.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-[2px] w-8 transition-all duration-300 ${idx === currentIndex ? "bg-primary-light" : "bg-primary-light/35"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DiscoverPureSilk;