"use client";

import React from "react";
import investment from "../../assets/bespoke/hh.png";
import investment2 from "../../assets/bespoke/hhh.png"

const Investment: React.FC = () => {
  return (
    <section className="bg-primary-light">

      <img src={investment} alt="Investment & Positioning" className="hidden md:block w-full h-auto object-cover" />
      <img src={investment2} alt="Investment & Positioning" className="md:hidden w-full h-auto object-cover" />

      <div className="flex flex-col gap-2 items-center justify-center text-center px-10 py-10" >
        <h2 className="text-[24px] md:text-[32px] md:mb-2">Investment &amp; Positioning</h2>
        <p className="text-[16px] md:text-[20px] text-center">SELHAYA BESPOKE COMMISSIONS BEGIN FROM{" "}
          <strong>£10,000+</strong>
        </p>

        <p className="text-[16px] text-center md:w-xl">
         And evolve according to craftsmanship complexity, silk selection, couture detailing, & ceremonial execution. Each piece includes dedicated founder direction, material sourcing, one-to-one development, and couture-level finishing.
        </p>

        <div className="w-[52px] h-px bg-primary-dark my-4"/>

        <h2 className="text-[24px] md:text-[28px]">
          <em>Created</em> once.<br />
          Never <em>repeated.</em>
        </h2>
      </div>


    </section>
  );
};

export default Investment;