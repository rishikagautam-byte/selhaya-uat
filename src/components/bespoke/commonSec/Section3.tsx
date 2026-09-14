import type { ReactNode } from "react";

export interface StepItem {
  number: string;
  title: string;
  content: ReactNode;
}

export interface Section3Props {
  heading: ReactNode;
  description: ReactNode;
  image: string;
  imageAlt?: string;
  steps: StepItem[];
  className?: string;
}

export default function Section3({
  heading,
  description,
  image,
  imageAlt = "Couture craft",
  steps,
  className = "",
}: Section3Props) {
  return (
    <section className={`bg-section-bg px-6 py-10 md:p-16 lg:p-20 xl:px-20 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:gap-10 xl:gap-0">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-between xl:pr-24">
          <div className="text mt-3">
            <h3 className="text-[28px] md:text-[32px] font-editorial text-text leading-tight">
              {heading}
            </h3>
            <p className="text-[16px] text-text mt-4 mb-8 xl:mb-12 max-w-lg ">
              {description}
            </p>
          </div>
          {image && (
            <div>
              <img
                src={image}
                alt={imageAlt}
                className="hidden md:block w-64 h-80   object-cover mb-10"
              />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col border-t border-secondary-2 pt-8 md:pt-0 md:border-none md:p-0">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`flex flex-col ${idx === 0 ? "border-t-none" : "border-t border-secondary-2"
                } ${idx === 0 ? "pt-0" : "pt-6 md:pt-8"}`}
            >
              <div className=" dm-sans text-[16px] md:text-[22px] font-semibold text-text uppercase mb-2">
                {step.number} {step.title}
              </div>

              <p className="text-[14px] md:text-[16px] text-text pb-6 md:pb-8 xl:w-xl">
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
