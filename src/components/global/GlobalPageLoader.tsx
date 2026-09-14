import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalPageLoader() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;
    prevPathRef.current = currentPath;

    // Do not trigger full-screen page loader when switching tabs within the same page (e.g. /policies/*)
    if (prevPath.startsWith('/policies') && currentPath.startsWith('/policies')) {
      return;
    }

    setIsLoading(true);

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkImagesLoaded = () => {
      // Only check images — never block on videos (they stream in background)
      const images = Array.from(document.querySelectorAll("img"));

      // Filter to only images that are in the viewport or close to it
      const visibleImages = images.filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.5;
      });

      let loadedCount = 0;
      const total = visibleImages.length;

      // No images — show page quickly
      if (total === 0) {
        timeoutId = setTimeout(() => {
          if (isMounted) setIsLoading(false);
        }, 200);
        return;
      }

      const handleLoaded = () => {
        loadedCount++;
        if (loadedCount >= total && isMounted) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      };

      visibleImages.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          handleLoaded();
        } else {
          img.addEventListener("load", handleLoaded, { once: true });
          img.addEventListener("error", handleLoaded, { once: true });
        }
      });

      // Hard cap: always show the page within 600ms no matter what
      timeoutId = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 600);
    };

    // Give React one tick to render the new route
    const initialDelayId = setTimeout(checkImagesLoaded, 50);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(initialDelayId);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#F9F4EE] flex items-center justify-center pointer-events-none"
        >
          <motion.img
            src="/images/logos/logo.svg"
            alt="Selhaya Logo"
            className="w-20 md:w-28 opacity-80"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}