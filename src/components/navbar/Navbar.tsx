"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navData";
import youtube from "../../assets/icons/youtube.png"
import insta from "../../assets/icons/insta.png"
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";


interface NavbarProps {
  onCartClick?: () => void;
  onSearchClick?: () => void;
  isCartOpen?: boolean;
}

export default function Navbar({ onCartClick, onSearchClick }: NavbarProps) {
  const { cartCount } = useCart();
  const { user } = useUser();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);
  const prevCartCount = useRef(cartCount);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Flash navbar visible for 3s whenever cart count increases
  useEffect(() => {
    if (cartCount > prevCartCount.current) {
      setCartFlash(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setCartFlash(false), 3000);
    }
    prevCartCount.current = cartCount;
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, [cartCount]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (isOpen) {
      setIsVisible(true);
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
      return;
    }

    if (latest > previous && latest > 100) {
      setIsVisible(false);
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
    } else {
      setIsVisible(true);

      if (latest < previous && latest > 100) {
        if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
        autoHideTimer.current = setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      } else if (latest <= 100) {
        if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
      }
    }
  });

  useEffect(() => {
    return () => {
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
    };
  }, []);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveMenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentMenu = activeMenu;

  const activeItem = navItems.find(
    (item) => item.label === currentMenu
  );

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (prev) {
        setActiveMenu(null);
      }

      return !prev;
    });
  };

  const lightPaths = [
    "/policies",
    "/checkout",
    "/checkouts",
    "/order-confirmation",
    "/profile",
    "/cart",
    "/commission",
    "/partnership",
    "/press-enquiry",
    "/sovereign-circle",
    "/join-sovereign-circle",
    "/contact",
    "/login",
    "/register",
    "/forgot",
    "/account/reset",
  ];
  const isLightPage = lightPaths.some(p => location.pathname.startsWith(p));
  const isProductPage =
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/main-product-page") ||
    location.pathname.startsWith("/test-product");

  // hasBg  → show cream background (desktop)
  const hasBg = isScrolled || isOpen || isLightPage;
  // isDarkText → use black icons/text (desktop)
  const isDarkText = hasBg || isProductPage;

  // Mobile: only show bg when menu open or on a light page (never just from scrolling)
  const mobileBg = isScrolled || isOpen || isLightPage;
  const mobileDarkText = hasBg || mobileBg || isProductPage;

  return (
    <motion.header
      ref={navRef}
      initial={{ y: 0 }}
      animate={{ y: (isVisible || cartFlash) ? 0 : "-100%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${isOpen ? "h-dvh" : "h-fit"} md:h-fit fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${mobileBg ? "bg-primary-light" : "bg-transparent"} ${hasBg ? "md:bg-primary-light" : "md:bg-transparent"} ${mobileDarkText ? "text-text" : "text-white"} ${isDarkText ? "md:text-text" : "md:text-white"}`}
    >
      {/* TOP NAVBAR */}
      <div className="relative flex h-20 items-center justify-between px-8 lg:px-14">
        {/* MENU BUTTON */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="relative h-4 w-10"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 0 : -3,
            }}
            transition={{
              duration: 0.45,
              ease: [0.76, 0, 0.24, 1],
            }}
            className={`absolute left-1/2 top-1/2 h-px w-6 ${mobileDarkText ? "bg-black" : "bg-white"} ${isDarkText ? "md:bg-black" : "md:bg-white"}`}
            style={{ x: "-50%" }}
          />

          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? 0 : 3,
            }}
            transition={{
              duration: 0.45,
              ease: [0.76, 0, 0.24, 1],
            }}
            className={`absolute left-1/2 top-1/2 h-px w-6 ${mobileDarkText ? "bg-black" : "bg-white"} ${isDarkText ? "md:bg-black" : "md:bg-white"}`}
            style={{ x: "-50%" }}
          />
        </button>

        {/* LOGO */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={isDarkText ? "/images/logos/selhaya-logo-dark.webp" : "/images/logos/selhaya-logo-light.webp"}
            alt="Selhaya Logo"
            width={100}
            height={100}
          />
        </Link>

        {/* RIGHT */}
        <div className="hidden uppercase items-end md:flex md:flex-col">
          {/* SEARCH */}
          <div className="flex flex-col items-end pb-2">
            <input
              type="text"
              placeholder="SEARCH"
              readOnly
              onClick={onSearchClick}
              onFocus={onSearchClick}
              className={`w-[100px] border-b ${isDarkText ? "border-black text-text placeholder:text-black" : "border-white text-primary-light placeholder:text-white"} bg-transparent text-right text-[12px] uppercase cursor-pointer focus:outline-none`}
            />
          </div>

          {/* CART */}
          <button
            className="text-[12px] uppercase hover:opacity-70"
            onClick={onCartClick}
          >
            Cart({cartCount})
          </button>

          {/* LOGIN */}
          <Link
            to={user?.isAuthenticated ? "/profile" : "/login"}
            className="text-[12px] hover:opacity-70"
          >
            {user?.isAuthenticated ? "Profile" : "Login"}
          </Link>
        </div>

        {/* RIGHT (MOBILE) */}
        <div className="flex md:hidden items-center gap-4">
          <button aria-label="Cart" className="hover:opacity-70 relative" onClick={onCartClick}>
            [{cartCount}]
          </button>
          <button aria-label="Search" className="hover:opacity-70" onClick={onSearchClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

        </div>
      </div>

      {/* EXPANDING MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-expanding-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-[calc(100dvh-6rem)] md:h-auto overflow-y-auto overflow-x-hidden pb-24 md:pb-0"
          >
            <div className="px-8 lg:px-14">
              <div
                className="flex flex-col gap-1"
                onMouseLeave={() => {
                  setActiveMenu(null);
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                    }}
                  >
                    <div className="flex items-center justify-between md:justify-start md:gap-4 pb-1">
                      <Link
                        to={item.href || "#"}
                        onClick={(e) => {
                          if (item.nestedMenu) {
                            e.preventDefault();

                            setActiveMenu((prev) =>
                              prev === item.label ? null : item.label
                            );

                            return;
                          }

                          setIsOpen(false);
                          setActiveMenu(null);
                        }}
                        className={`text-left text-[12px] uppercase transition-all duration-300 hover:opacity-100 ${location.pathname === item.href
                          ? "opacity-100"
                          : "opacity-75"
                          }`}
                      >
                        {item.label}
                      </Link>

                      {item.nestedMenu && (
                        <button
                          onClick={() =>
                            setActiveMenu((prev) =>
                              prev === item.label ? null : item.label
                            )
                          }
                          className={`transition-transform duration-300 ${activeMenu === item.label
                            ? "rotate-90"
                            : ""
                            }`}
                        >
                          <svg
                            width="6"
                            height="10"
                            viewBox="0 0 6 10"
                            fill="none"
                          >
                            <path
                              d="M0.179688 0.176758L4.67969 4.67676L0.179688 9.17676"
                              stroke="#281B13"
                              strokeWidth="0.5"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* MOBILE SUBMENU */}
                    <div className="md:hidden">
                      <AnimatePresence>
                        {activeMenu === item.label &&
                          item.nestedMenu && (
                            <motion.div
                              key={`mobile-submenu-${item.label}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 flex flex-col overflow-hidden"
                            >
                              {item.nestedMenu.map((card) => (
                                <Link
                                  key={card.title}
                                  to={card.href}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setActiveMenu(null);
                                  }}
                                  className="py-2 text-[12px] uppercase opacity-70 transition-opacity hover:opacity-100"
                                >
                                  {card.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}

                {/* NESTED MENU */}
                <AnimatePresence mode="wait">
                  {activeItem?.nestedMenu && (
                    <motion.div
                      key={activeItem.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 hidden md:grid gap-2 grid-cols-2 md:grid-cols-5"
                    >
                      {activeItem.nestedMenu.map((card) => (
                        <Link
                          key={card.title}
                          to={card.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveMenu(null);
                          }}
                          className={`group relative overflow-hidden ${!card.image ? "flex items-end p-4 h-[170px] md:h-[260px]" : ""}`}
                        >
                          {card.image ? (
                            <div className="overflow-hidden">
                              <img
                                src={card.image}
                                alt={card.title}
                                className="h-[170px] md:h-[250px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div>
                              <h6 className="w-full xl:pl-6 h-[170px] md:h-[250px] text-[16px] uppercase underline flex items-center text-text justify-center">
                                {card.title}
                              </h6>
                            </div>
                          )}

                          {card.image && (
                            // <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-4 text-white gap-1">
                            //   <h6 className="text-[16px] uppercase underline leading-tight">
                            //     {card.title}
                            //   </h6>

                            //   {card.description && (
                            //     <p className="text-[12px] opacity-80 h-[60px]">
                            //       {card.description}
                            //     </p>
                            //   )}
                            // </div>
                            <div className=" flex flex-col justify-end pt-4 gap-1">
                              <h6 className="text-[16px] uppercase underline leading-tight">
                                {card.title}
                              </h6>
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* FOOTER */}
            <div className="absolute md:static bottom-0 w-full mt-4 flex items-center justify-between md:justify-end gap-6 border-t border-[#402C1F1A] px-8 py-6 lg:py-4">
              <div className="flex gap-1">
                {/* Instagram */}
                <a href="https://www.instagram.com/selhaya.official/" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src={insta} alt="Selhaya Instagram" height={20} width={20} />
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@SELHAYA" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                  <img src={youtube} alt="Selhaya YouTube" height={25} width={25} />
                </a>
              </div>

              <div className="max-w-xs text-[8px] opacity-70">
                <p>
                  © 2026, Selhaya All designs, imagery, and written content are the intellectual property of Selhaya Ltd.Unauthorised use or reproduction is not permitted..
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}