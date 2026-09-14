/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  const [navVisible, setNavVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    // Reset visibility on route change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPastHero(false);
    setNavVisible(true);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      // Show breadcrumb only after scrolling past ~80% of viewport height (past hero)
      setPastHero(current > window.innerHeight * 0.8);

      // Near top — navbar always visible
      if (current < 100) {
        setNavVisible(true);
      } else if (current > lastScrollY) {
        // Scrolling down → navbar hides
        setNavVisible(false);
      } else {
        // Scrolling up → navbar shows
        setNavVisible(true);
      }

      lastScrollY = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Breadcrumbs do not appear at the root route
  if (pathname === "/") return null;

  // Helper to map route paths to specific human-readable names
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

    // Product pages
    if (pathname.startsWith("/product/")) {
      const name = pathname.split("/product/")[1];
      const formattedName = decodeURIComponent(name).replace(/-/g, " ");

      return [
        ...items,
        { label: "Selhaya Collections", path: "/selhaya-collections" },
        { label: formattedName },
      ];
    }

    // Shopify product pages
    if (pathname.startsWith("/products/")) {
      const parts = pathname.split("/");
      const handle = parts[2];
      const formattedName = decodeURIComponent(handle).replace(/-/g, " ");

      return [
        ...items,
        { label: "Selhaya Collections", path: "/selhaya-collections" },
        { label: formattedName },
      ];
    }

    // Dynamic journal article
    if (pathname.startsWith("/journal/read/")) {
      const slug = pathname.split("/journal/read/")[1];
      const formattedTitle = decodeURIComponent(slug).replace(/-/g, " ");

      return [
        ...items,
        { label: "Journal", path: "/journal" },
        { label: formattedTitle },
      ];
    }


    switch (pathname) {
      case "/the-house-of-selhaya":
        return [
          ...items,
          { label: "About" },
          { label: "The House of Selhaya" }
        ];

      case "/selhaya-silks":
        return [
          ...items,
          { label: "About" },
          { label: "Selhaya Silks" }
        ];

      case "/selhaya-craft":
        return [
          ...items,
          { label: "About" },
          { label: "Selhaya Craft" }
        ];

      case "/selhaya-collections":
        return [
          ...items,
          { label: "Selhaya Collections" }
        ];

      case "/selhaya-collections/haya":
        return [
          ...items,
          { label: "Selhaya Collections", path: "/selhaya-collections" },
          { label: "Haya" }
        ];

      case "/selhaya-collections/waves-of-light":
        return [
          ...items,
          { label: "Selhaya Collections", path: "/selhaya-collections" },
          { label: "Waves of Light" }
        ];

      case "/selhaya-collections/heritage":
        return [
          ...items,
          { label: "Selhaya Collections", path: "/selhaya-collections" },
          { label: "Heritage" }
        ];

      case "/selhaya-collections/rose-of-resilience":
        return [
          ...items,
          { label: "Selhaya Collections", path: "/selhaya-collections" },
          { label: "Rose of Resilience" }
        ];

      case "/bespoke/silk-art":
        return [
          ...items,
          { label: "Bespoke Silk Art" }
        ];

      case "/bespoke/silk-garment":
        return [
          ...items,
          { label: "Bespoke Silk Garments" }
        ];

      case "/press-and-recognition":
        return [
          ...items,
          { label: "Journey" },
          { label: "Press & Recognition" }
        ];

      case "/cultural-alliance":
        return [
          ...items,
          { label: "Journey" },
          { label: "Cultural Alliances" }
        ];

      case "/selhaya-legacy":
        return [
          ...items,
          { label: "Journey" },
          { label: "Selhaya Legacy" }
        ];

      case "/advisory":
        return [
          ...items,
          { label: "Selhaya Advisory" }
        ];

      case "/journal":
        return [
          ...items,
          { label: "Journal" }
        ];

      case "/journal/founder-notes":
        return [
          ...items,
          { label: "Journal", path: "/journal" },
          { label: "Founder Notes" }
        ];

      case "/journal/maison-milestones":
        return [
          ...items,
          { label: "Journal", path: "/journal" },
          { label: "Maison milestones" }
        ];

      case "/journal/couture-and-craft":
        return [
          ...items,
          { label: "Journal", path: "/journal" },
          { label: "Couture & Craft" }
        ];

      case "/journal/the-house-and-collections":
        return [
          ...items,
          { label: "Journal", path: "/journal" },
          { label: "The House & Collections" }
        ];

      default: {
        const paths = pathname.split("/").filter(Boolean);
        const list = [...items];
        let accPath = "";

        paths.forEach((p, idx) => {
          accPath += `/${p}`;

          const label = p
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          if (idx === paths.length - 1) {
            list.push({ label });
          } else {
            list.push({ label, path: accPath });
          }
        });

        return list;
      }
    }
  };
  const breadcrumbs = getBreadcrumbs();

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.div
          key="breadcrumb"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            top: navVisible ? 112 : 16,
          }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            zIndex: 40,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div className="flex items-center gap-2 px-6 py-1.5 rounded-full bg-[#EDE7DB59]/70 backdrop-blur-md border border-[#C9BAA5]/40 shadow-[0_2px_16px_rgba(40,27,19,0.08)] pointer-events-auto text-[12px] text-text">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-text/30 mx-1">/</span>}
                  {isLast || !item.path ? (
                    <span className="text-text font-medium capitalize">{item.label}</span>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-text/60 hover:text-text transition-colors duration-200 capitalize"
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
