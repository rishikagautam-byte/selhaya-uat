// ReturnShipping.tsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ReturnShippingProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReturnShipping({
  isOpen,
  onClose,
}: ReturnShippingProps) {
  // lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // esc close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/55"
          />

          {/* Drawer */}
          <motion.div
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed top-0 right-0 z-[100]
              h-screen
              w-full md:w-[48%]
              bg-[#F7F2EA]
              overflow-y-auto
              px-6 md:px-10
              py-6 md:py-8
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-black/10 pb-6">
              <p className="text-[16px] font-semibold uppercase">
                Return and Shipping
              </p>

              <button
                onClick={onClose}
                className="
                  text-[16px]
                  uppercase
                  underline
                  underline-offset-2
                  hover:opacity-60
                  transition
                "
              >
                Close
              </button>
            </div>

            {/* Content */}
            <div className="pt-8 max-w-[520px]">
              <p className="text-[16px] font-semibold mb-6">
                Ships Worldwide · Free Shipping On All Orders
              </p>

              <div className="space-y-5 text-[12px]">
                <p>
                  International orders may be subject to custom duties or
                  import taxes upon arrival, depending on your location.
                </p>

                <p className="font-semibold">
                  Please allow 2–3 weeks for tailored customisation before
                  dispatch.
                </p>

                <p>
                  After placing your reservation, the House will email you
                  privately to begin your custom tailoring process. You will be
                  asked to submit your measurements with care and intention —
                  as each robe is tailored, sealed and stitched just for you.
                </p>

                <p>
                  The House Concierge remains available to guide you before
                  your piece is prepared. As every Voyage robe is
                  made-to-measure and crafted in sacred limitation, returns
                  cannot be accepted.
                </p>

                <p>
                  For full terms, you may visit our
                </p>

                {/* Links */}
                <div className="flex flex-col gap-2 pt-1">
                  <button className="w-fit text-[12px] underline">
                    Shipping Policy
                  </button>

                  <button className="w-fit text-[12px] underline">
                    Returns Policy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}