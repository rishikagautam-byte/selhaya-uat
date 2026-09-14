import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SizeGuideTable from "./SizeGuideTable";
import { useNavigate } from "react-router-dom";

type SizeGuideProps = {
  isOpen: boolean;
  onClose: () => void;
};

const tabs = ["Outer Robe", "Inner Dress"];

export default function SizeGuide({
  isOpen,
  onClose,
}: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState("Inner Dress");

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="
              fixed top-0 right-0 z-[100]
              h-screen w-full md:w-2/3
              bg-[#F7F2EA]
              overflow-y-auto
              px-5 md:px-10
              py-8
            "
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[16px] uppercase font-medium">
                  Style Guide
                </p>

                {/* Tabs */}
                <div className="flex gap-6 mt-6 border-b border-black/10">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        pb-3 text-sm transition-colors
                        ${activeTab === tab
                          ? "text-black border-b border-black"
                          : "text-black/40"
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-xs uppercaser hover:opacity-60 transition"
              >
                Close
              </button>
            </div>

            {/* Meta */}
            <p className="text-[12px] mb-2">
              Model is wearing a Medium size | Model's Height — 5'5
            </p>

            {/* Table */}
            <SizeGuideTable activeTab={activeTab} />

            {/* Footer */}
            <div className="mt-16 border-t border-black/10 pt-8 text-[12px]">
              <p>
                All enquiries are handled with strict discretion. 
                Your information will never be shared
              </p>

              <p className="mt-5">
                The House responds within 24-48 hours.
              </p>

              <div className="flex gap-4 mt-5 underline">
                <button onClick={()=>{navigate('/policies/privacy')}}>Privacy Policy</button>
                <button onClick={()=>{navigate('/policies/terms')}}>Terms of Service</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}