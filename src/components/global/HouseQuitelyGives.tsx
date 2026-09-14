import { Link } from "react-router-dom";

type HouseQuietlyGivesProps = {
  title?: React.ReactNode;
  description?: React.ReactNode | string | string[];
  backgroundImage?: string;
  minHeight?: string;
  buttonText?: string;
  buttonHref?: string;
  // Kept for backward compatibility if other files pass them
  image?: string;
  sideImage?: string;
  sideImageAlt?: string;
  flowerAlt?: string;
  backgroundColor?: string;
  textColor?: string;
  reverse?: boolean;
  arrow?: boolean;
};

function HouseQuietlyGives({
  title = "The House That Quietly Gives.",
  description = <>The Maison was born not only from elegance, but from intention. From the{" "}<br className="hidden md:block" />
    beginning, Selhaya was created with the belief that beauty should carry{" "}
    <br className="hidden md:block" />
    meaning and that every creation should leave something gentle behind.
  </>,
  backgroundImage,
  image,
  sideImage,
  minHeight = "min-h-[40vh] lg:min-h-[50vh]",
  buttonText = "",
  buttonHref = "",
  arrow = false
}: HouseQuietlyGivesProps) {
  // Use backgroundImage, fallback to sideImage or image
  const bgImg = backgroundImage || sideImage || image || "/images/home/house.png";

  // descriptions can be array or string
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section
      className={`relative w-full ${minHeight} flex flex-col items-center justify-center`}
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 py-16 px-6 md:px-12 flex flex-col items-center justify-center text-center space-y-6 text-white max-w-4xl mx-auto">
        {title && (
          <h2 className="text-[24px] md:text-[36px] font-editorial mb-12">
            {title}
          </h2>
        )}

        <div className="flex flex-col gap-4 max-w-2xl">
          {paragraphs.map((p, index) => (
            <p
              key={index}
              className="text-[16px] md:text-[18px] text-center font-light"
            >
              {p}
            </p>
          ))}
        </div>

        {buttonText && buttonHref && (
          <div className="pt-8">
            <Link
              to={buttonHref}
              className="uppercase text-[14px] md:text-[16px]"
            >
              <span className=" underline hover:scale-110 transition-transform duration-200 cursor-pointer">{buttonText}</span> {arrow && "→"}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default HouseQuietlyGives;