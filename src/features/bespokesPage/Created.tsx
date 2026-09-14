import React from "react";

const Created: React.FC = () => {
  return (
    <section className="w-full bg-choclate-brown opacity-120 ">

     <div
        className="flex w-full flex-col items-center justify-center py-28 px-10"
      >
        <h3
          className="text-white text-center text-[24px] md:text-[32px] "
        >
          Created for No One Else.{" "}<br className="hidden lg:block" />{" "}Selhaya Bespoke exists beyond seasonal collections.
        </h3>
        <p
          className="lg:w-2/3 mx-auto text-white text-center text-[16px] md:text-[20px] mt-6"
        >
          The House creates one-to-one silk couture commissions for women
          whose garments carry personal, cultural, or ceremonial significance.
          Every piece begins in private dialogue and moves through the{" "}<br />
          Maison with discretion, precision, and quiet artistry.
        </p>
      </div>
    </section>
  );
};

export default Created;