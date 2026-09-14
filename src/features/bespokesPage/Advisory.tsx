"use client";

import React from "react";
import advisoryImg from "../../assets/bespoke/advArt.png";

const steps = [
  {
    number: "01.",
    title: "PRIVATE DIALOGUE",
    content:
      "A personal consultation exploring silhouette, environment, occasion, and presence.",
  },
  {
    number: "02.",
    title: "DESIGN DIRECTION",
    content:
      "The House develops a couture proposal through fabric studies, silhouette references, embroidery direction, and ceremonial detailing.",
  },
  {
    number: "03.",
    title: "COUTURE CREATION",
    content:
      "Each garment is crafted through hand-finished refinement using pure silks, couture construction, and optional pearl, crystal, or gemstone embellishment.",
  },
  {
    number: "04.",
    title: "FINALISATION & DELIVERY",
    content:
      "The piece is completed through private refinement and delivered personally with final adjustments where required.",
  },
];

const Advisory: React.FC = () => {
  return (
    <section className="bg-section-bg p-10 md:p-16 lg:p-20 xl:px-28">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:gap-20" >
        <div className="flex flex-col justify-between xl:pr-48" >
          <div className="text mt-3">
            <h3 className="text-[24px] md:text-[28px] text-text">
              Advisory across culture. perception. narrative. &amp; institutional
              positioning
            </h3>
            <p
              className="text-[16px] text-text mt-2 mb-10 "
            >
              Every Bespoke piece moves through a private couture process led
              directly by the House allowing each commission to evolve slowly,
              intentionally, and with complete refinement.
            </p>
          </div>
          <div >
            <img
              src={advisoryImg}
              alt="Couture craft"
              className="hidden md:block w-[150px] h-[190px] object-cover mb-10"
            />
          </div>
        </div>

        {/* RIGHT COLUMN% */}
        <div
          className="flex flex-col border-t border-secondary-2 pt-8 md:pt-0 md:border-none md:p-0 "
        >
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`flex flex-col ${idx === 0 ? "border-t-none" : "border-t border-secondary-2"}  ${idx === steps.length - 1
                    ? " border-black"
                    : ""} ${idx === 0 ? "pt-0" : "pt-6 md:pt-8"}`}             
            >
              <div className="dm-sans text-[16px] md:text-[24px] font-semibold text-text uppercase mb-1">
                {step.number} {step.title} 
              </div>

              <p
                className="text-[16px] text-text pb-6 md:pb-10"
              >
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advisory;