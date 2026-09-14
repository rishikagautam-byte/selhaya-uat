"use client";

import { Link } from "react-router-dom";
import NewsletterInput from "./NewsletterInput";

/* ─── Icons & Logo ──────────────────────────────────────────────────────── */

const SelhayaLogo = () => (
  <img
    src="/images/logos/selhaya-logo-dark.webp"
    alt="Selhaya Logo"
    width={100}
    height={100}
    className="object-contain"
  />
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="#402C1F" strokeWidth="1.8" fill="none" />
    <circle cx="12" cy="12" r="4.5" stroke="#402C1F" strokeWidth="1.8" fill="none" />
    <circle cx="17.5" cy="6.5" r="1" fill="#402C1F" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.5026 4.49609C11.262 4.49609 9.8151 4.52643 8.40469 4.56759L8.3474 4.56976C6.91198 4.61201 5.75365 4.64559 4.84115 4.80268C3.8901 4.96626 3.10052 5.27934 2.46927 5.95426C1.83594 6.63134 1.5599 7.46876 1.42969 8.47084C1.30469 9.43501 1.30469 10.657 1.30469 12.1758V13.8268C1.30469 15.3435 1.30469 16.5655 1.42969 17.5308C1.55885 18.5328 1.83594 19.3703 2.46927 20.0473C3.10052 20.7233 3.8901 21.0353 4.84115 21.1989C5.75365 21.356 6.91198 21.3896 8.3474 21.4318L8.40469 21.434C9.81615 21.4752 11.262 21.5055 12.5026 21.5055C13.7432 21.5055 15.1901 21.4752 16.6005 21.434L16.6578 21.4318C18.0932 21.3896 19.2516 21.356 20.1641 21.1989C21.1151 21.0353 21.9047 20.7223 22.5359 20.0473C23.1693 19.3703 23.4464 18.5328 23.5755 17.5308C23.7005 16.5666 23.7005 15.3446 23.7005 13.8258V12.1748C23.7005 10.657 23.7005 9.43501 23.5755 8.47084C23.4464 7.46876 23.1693 6.63134 22.5359 5.95426C21.9047 5.27826 21.1151 4.96626 20.1641 4.80268C19.2516 4.64559 18.0932 4.61201 16.6568 4.56976L16.6005 4.56759C15.2349 4.52449 13.8688 4.50065 12.5026 4.49609ZM11.3276 15.8722C11.2088 15.9427 11.0743 15.9796 10.9375 15.9792C10.8007 15.9787 10.6664 15.9408 10.548 15.8694C10.4297 15.798 10.3315 15.6956 10.2632 15.5723C10.1949 15.449 10.1589 15.3092 10.1589 15.1669V10.8336C10.1589 10.6913 10.1949 10.5515 10.2632 10.4282C10.3315 10.305 10.4297 10.2025 10.548 10.1311C10.6664 10.0597 10.8007 10.0218 10.9375 10.0214C11.0743 10.0209 11.2088 10.0578 11.3276 10.1283L14.9734 12.295C15.0929 12.3661 15.1922 12.4688 15.2613 12.5926C15.3304 12.7165 15.3667 12.8571 15.3667 13.0003C15.3667 13.1434 15.3304 13.2841 15.2613 13.4079C15.1922 13.5317 15.0929 13.6344 14.9734 13.7055L11.3276 15.8722Z" fill="#281B13" />
  </svg>
);


/* ─── Footer ─────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <>
      <footer className="font-['DM_Sans',sans-serif] bg-[#F4F0EA] w-full px-6 md:px-[72px] pt-14 pb-10">

        {/* ══════════════════════════════════════════════════════
            MOBILE  (< md)
        ══════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-8 md:hidden">

          {/* 1. Client Services & Maison Selhaya */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-4">Client Services</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: "Returns Policy", path: "/policies/refund" },
                  { name: "Privacy Policy", path: "/policies/privacy" },
                  { name: "Terms of Service", path: "/policies/terms" },
                  { name: "Shipping Policy", path: "/policies/shipping" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-[12px] text-[#444] hover:text-black transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-4">Maison Selhaya</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: "Selhaya Edition", path: "/selhaya-collections" },
                  { name: "Maison", path: "/the-house-of-selhaya" },
                  { name: "Heritage", path: "/selhaya-collections/heritage" },
                  { name: "Journal", path: "/journal" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-[12px] text-[#444] hover:text-black transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Maison of Noble Elegance */}
          <div>
            <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-4">Maison of Noble Elegance</p>
            <ul className="flex flex-col gap-3">
              <li className="text-[11.5px] text-[#444] leading-relaxed pl-3 relative">
                <span className="absolute left-0 top-0 text-[11px]">•</span>
                Selhaya operates as a private online Maison. Releases are offered directly through our website, with selected Maison viewings arranged by invitation.
              </li>
              <li className="text-[11.5px] text-[#444] leading-relaxed pl-3 relative">
                <span className="absolute left-0 top-0 text-[11px]">•</span>
                Every order is prepared with quiet care, discretion, and direct support from the House
              </li>
            </ul>
          </div>

          {/* 3. Newsletter */}
          <div>
            <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-4">Let the house Remember You</p>
            <NewsletterInput fullWidth />
          </div>

          {/* 4. Logo + Follow Us */}
          <div className="flex items-center justify-between">
            <SelhayaLogo />
            <div className="flex flex-col items-end gap-1.5">
              <p className="text-[12px] font-normal text-[#281B13] capitalize">Follow Us</p>
              <div className="flex gap-3 items-center">
                <a href="https://www.instagram.com/selhaya.official/" aria-label="Instagram" className="hover:opacity-60 transition-opacity"><InstagramIcon /></a>
                <a href="https://www.youtube.com/@SELHAYA" aria-label="YouTube" className="hover:opacity-60 transition-opacity"><YoutubeIcon /></a>
              </div>
            </div> 
          </div>

          {/* 5. Divider */}
          <div className="w-full h-[1px] bg-[#E0D8CE]" />

          {/* 6. Copyright */}
          <p className="text-[10px] text-[#281B13] leading-[1.6] text-center max-w-[280px] mx-auto pb-4">
            © 2026, Selhaya All designs, imagery, and written<br />content are the intellectual property of Selhaya Ltd.<br />Unauthorised use or reproduction is not permitted.
          </p>

        </div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP / TABLET / MAC  (≥ md)
        ══════════════════════════════════════════════════════ */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[1.5fr_1.5fr_2fr_1.5fr] gap-x-6 pb-12">
            
            {/* Col 1 – Client Services */}
            <div>
              <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-[18px]">Client Services</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                {[
                  { name: "Returns Policy", path: "/policies/refund" },
                  { name: "Terms of Service", path: "/policies/terms" },
                  { name: "Privacy Policy", path: "/policies/privacy" },
                  { name: "Shipping Policy", path: "/policies/shipping" },
                ].map((item) => (
                  <Link key={item.name} to={item.path} className="text-[11.5px] text-[#444] hover:text-black transition-colors whitespace-nowrap">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 2 – Maison Selhaya */}
            <div>
              <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-[18px]">Maison Selhaya</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                {[
                  { name: "Heritage", path: "/selhaya-collections/heritage" },
                  { name: "Journal", path: "/journal" },
                  { name: "Maison", path: "/the-house-of-selhaya" },
                  { name: "Selhaya Collections", path: "/selhaya-collections" },
                ].map((item) => (
                  <Link key={item.name} to={item.path} className="text-[11.5px] text-[#444] hover:text-black transition-colors whitespace-nowrap">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3 – Maison of Noble Elegance */}
            <div>
              <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-[18px]">Maison of Noble Elegance</p>
              <ul className="flex flex-col gap-3 pr-8">
                <li className="text-[11px] text-[#444] leading-relaxed pl-3.5 relative">
                  <span className="absolute left-0 top-0">•</span>
                  Selhaya operates as a private online Maison. Releases are offered directly through our website, with selected Maison viewings arranged by invitation.
                </li>
                <li className="text-[11px] text-[#444] leading-relaxed pl-3.5 relative">
                  <span className="absolute left-0 top-0">•</span>
                  Every order is prepared with quiet care, discretion, and direct support from the House.
                </li>
              </ul>
            </div>

            {/* Col 4 – Let the House Remember You */}
            <div className="flex flex-col">
              <p className="font-editorial text-[20px] font-normal text-[#281B13] tracking-[0.02em] leading-[25px] m-0 mb-[18px]">Let the House Remember You</p>
              <div className="mb-6">
                <NewsletterInput fullWidth />
              </div>
              <p className="text-[11px] font-medium tracking-[0.5px] text-[#281B13] uppercase mb-2">FOLLOW US</p>
              <div className="flex gap-3 items-center">
                <a href="https://www.instagram.com/selhaya.official/" aria-label="Instagram" className="hover:opacity-60 transition-opacity"><InstagramIcon /></a>
                <a href="https://www.youtube.com/@SELHAYA" aria-label="YouTube" className="hover:opacity-60 transition-opacity"><YoutubeIcon /></a>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="h-[1px] bg-[#E0D8CE] -mx-[72px]" />

          {/* Logo & Copyright */}
          <div className="flex items-start pt-8 pb-4">
            {/* Logo on the left */}
            <div className="flex-1">
              <SelhayaLogo />
            </div>
            
            {/* Copyright aligning generally towards the right, maybe aligned with column 3 roughly */}
            <div className="flex-1 text-right flex justify-end">
              <p className="text-[11px] text-[#281B13] leading-[1.6] text-left max-w-[500px]">
                © 2026, Selhaya All designs, imagery, and written content are the intellectual property of<br />Selhaya Ltd. Unauthorised use or reproduction is not permitted.
              </p>
            </div>
          </div>

        </div>

      </footer>
    </>
  );
}