import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";



interface HeroSectionProps {
    smallUpperTitle?: React.ReactNode | string;
    image: string;
    mobileImage?: string;
    video?: string;
    title: React.ReactNode | string;
    mobileTitle?: React.ReactNode | string;
    titleSubText?: React.ReactNode | string;
    imageAlt?: string;
    desktopText?: React.ReactNode;
    mobileText?: string;
    buttonText?: string;
    buttonLink?: string;
    onButtonClick?: () => void;
    textColor?: string;
    twoLinks?: React.ReactNode;
    desktopTextClassName?: string;
    mobileTextClassName?: string;
    titleClassName?: string;
}

const HeroSection = ({
    image,
    mobileImage,
    video,
    smallUpperTitle,
    title,
    mobileTitle,
    titleSubText = "",
    imageAlt,
    desktopText = <></>,
    mobileText = "",
    buttonText = "",
    buttonLink = "",
    onButtonClick,
    textColor = "text-white",
    twoLinks = <></>,
    desktopTextClassName = "",
    mobileTextClassName = "",
    titleClassName = "",
}: HeroSectionProps) => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 180]);
    const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.85]);
    return (
        <section className="relative h-dvh w-full overflow-hidden">

            {/* Background Image / Video */}
            <motion.div
                style={{
                    y: heroY,
                    opacity: heroOpacity,
                }}
                className="absolute inset-0"
            >
                {video ? (
                    <video
                        src={video}
                        poster={image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <>
                        <img
                            src={image}
                            alt={typeof title === "string" ? title : imageAlt}
                            className={`${
                                mobileImage ? "hidden md:block " : ""
                            } h-full w-full object-cover`}
                        />
                        {mobileImage && (
                            <img
                                src={mobileImage}
                                alt={typeof title === "string" ? title : imageAlt}
                                loading="eager"
                                fetchPriority="high"
                                className="h-full w-full object-cover scale-110 md:hidden"
                            />
                        )}
                    </>
                )}
            </motion.div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-end">
                <div className="w-full px-8 md:px-16 pb-14 md:pb-20">
                    <div
                        className={`flex flex-col justify-center items-center ${textColor}`}
                    >

                        {/* upper title */}
                        {smallUpperTitle && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <p className="text-[16px] md:text-[20px] text-center uppercase mb-4">
                                    {smallUpperTitle}
                                </p>
                            </motion.div>
                        )}
                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className={`${titleClassName || "text-[28px] md:text-[48px]"} text-center uppercase ${mobileTitle ? "hidden md:block" : ""}`}>
                                {title}
                            </h1>
                            {mobileTitle && (
                                <h1 className={`md:hidden ${titleClassName || "text-[28px] md:text-[48px]"} text-center uppercase`}>
                                    {mobileTitle}
                                </h1>
                            )}
                            {titleSubText && (
                                <p className="text-[20px] text-center mb-4">
                                    {titleSubText}
                                </p>
                            )}
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1 }}
                        >
                            <div className={`${textColor} mt-2 hidden md:block ${desktopTextClassName || "text-[16px]"} text-center leading-snug ${typeof title === "string" && title === "The World of Selhaya" ? "" : ""}`}>
                                {desktopText}
                            </div>

                            <div className={`md:hidden ${mobileTextClassName || "text-[16px]"} text-center`}>
                                {mobileText || desktopText}
                            </div>
                        </motion.div>

                        {/* Optional Button */}
                        {buttonText && (buttonLink || onButtonClick) && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                                className="mt-4"
                            >
                                {buttonLink ? (
                                    <Link to={buttonLink} className="underline uppercase" data-cta="hero_cta">
                                        {buttonText}
                                    </Link>
                                ) : (
                                    <button onClick={onButtonClick} className="underline uppercase cursor-pointer bg-transparent border-none text-inherit font-inherit p-0 m-0" data-cta="hero_cta">
                                        {buttonText}
                                    </button>
                                )}
                            </motion.div>
                        )}
                        {twoLinks && (
                            twoLinks
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;