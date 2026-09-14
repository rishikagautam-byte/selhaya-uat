import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { countries } from "../../../data/countries";
import type { Country } from "../../../data/countries";
import pressImg from "../../../assets/forms/press.png";
import SEO from "../../../components/SEO";

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

/*
const ENQUIRY_OPTIONS = [
  "Press / Media",
  "Royal Patron Programme",
];
*/

const PressEnquiry = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organisation: "",
    message: "",
    phone: "",
    agree: false,
    marketingAgree: false,
  });

  // const [selectedEnquiries, setSelectedEnquiries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Location (Country) dropdown
  const [selectedLocation, setSelectedLocation] = useState<Country | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const locationBtnRef = useRef<HTMLButtonElement>(null);

  // Phone dropdown
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === "hu") || countries[0]
  );
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const phoneBtnRef = useRef<HTMLButtonElement>(null);
  const hasDetectedRef = useRef(false);

  const captchaRef = useRef<ReCAPTCHA>(null);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(target) &&
        locationBtnRef.current &&
        !locationBtnRef.current.contains(target)
      ) {
        setIsLocationOpen(false);
      }

      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(target) &&
        phoneBtnRef.current &&
        !phoneBtnRef.current.contains(target)
      ) {
        setIsPhoneDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when dropdowns are open
  useEffect(() => {
    const anyOpen = isLocationOpen || isPhoneDropdownOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    document.documentElement.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLocationOpen, isPhoneDropdownOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let updatedValue = value;
    if (type !== "checkbox") {
      updatedValue = value.replace(/\s{2,}/g, " ");
    }
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : updatedValue,
    });
  };

  /*
  const handleEnquiryToggle = (option: string) => {
    setSelectedEnquiries((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  */

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!form.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (form.fullName.trim().length < 3) {
      toast.error("Enter a valid full name");
      return false;
    }
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!selectedLocation) {
      toast.error("Please select a location");
      return false;
    }
    /*
    if (selectedEnquiries.length === 0) {
      toast.error("Please select at least one enquiry type");
      return false;
    }
    */
    if (!form.message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    const fullPhone = selectedCountry.dial + form.phone.trim();
    if (!phoneRegex.test(fullPhone)) {
      toast.error("Enter a valid phone number");
      return false;
    }
    if (!form.agree) {
      toast.error("Please accept the privacy policy");
      return false;
    }
    return true;
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowCaptcha(true);
    if (captchaToken) {
      submitEnquiry(captchaToken);
    } else {
      captchaRef.current?.reset();
    }
  };

  const handleCaptchaChange = async (token: string | null) => {
    setCaptchaToken(token);
    if (!token) return;
    await submitEnquiry(token);
  };

  const submitEnquiry = async (token: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("action", "PressEnquiry");
      formData.append("fullName", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("organisation", form.organisation.trim());
      formData.append("location", selectedLocation?.name || "");
      formData.append("enquiryType", "Press / Media");
      formData.append("message", form.message.trim());
      formData.append("phone", selectedCountry.dial + form.phone.trim());
      formData.append("marketingConsent", form.marketingAgree ? "Yes" : "No");
      formData.append("captcha", token);
      formData.append("website", ""); // Honeypot

      const response = await fetch(import.meta.env.VITE_CONTACT_FORM_URL, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        toast.success("Enquiry submitted successfully");
        setForm({
          fullName: "",
          email: "",
          organisation: "",
          message: "",
          phone: "",
          agree: false,
          marketingAgree: false,
        });
        // setSelectedEnquiries([]);
        setSelectedLocation(null);
        captchaRef.current?.reset();
        setCaptchaToken(null);
        setShowCaptcha(false);
      } else {
        toast.error(result.message || "Failed to submit enquiry");
        captchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = form.agree && !loading;

  return (
    <>
      <SEO
        title="Press & Media Enquiries | SELHAYA®"
        description="For press, protocol and enquiries relating to the SELHAYA Royal Patron Programme, please share your details below."
        canonical="/press-enquiry"
      />

      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] bg-primary-light text-text">
        {/* LEFT PANEL — FORM */}
        <div className="w-full flex flex-col justify-center px-6 xl:px-16 py-12 md:py-6 mt-20 overflow-y-auto">
          <div className="lg:pr-20">
            {/* Header Title */}
            <h1 className="font-editorial text-[24px] uppercase leading-tight tracking-wider mb-4">
              Press & Media Enquiries
            </h1>

            {/* Subtext */}
            <p className="text-[16px] text-text/90 mb-8">
              For press, protocol and enquiries relating to the SELHAYA Royal Patron Programme, please share your details below. The appropriate member of the House will review your enquiry  and respond accordingly.
            </p>

            {/* Form Section */}
            <div className="w-full flex flex-col">
              <p className="text-[14px] sm:text-[16px] uppercase font-semibold text-text mb-4">
                Enquiry Details
              </p>

              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    autoComplete="name"
                    className="w-full bg-transparent pb-1 pt-3 border-0 border-b border-[#281B1380] text-[15px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    autoComplete="email"
                    className="w-full bg-transparent pb-1 pt-3 border-0 border-b border-[#281B1380] text-[15px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Organisation / Publication & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-2">
                <div className="relative">
                  <input
                    type="text"
                    name="organisation"
                    value={form.organisation}
                    onChange={handleChange}
                    placeholder="Organisation / Publication"
                    autoComplete="organization"
                    className="w-full bg-transparent pb-1 pt-3 border-0 border-b border-[#281B1380] text-[15px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
                  />
                </div>

                {/* Location Dropdown */}
                <div className="relative">
                  <button
                    ref={locationBtnRef}
                    type="button"
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen);
                      setIsPhoneDropdownOpen(false);
                    }}
                    className="w-full bg-transparent pb-1 pt-3 border-0 border-b border-[#281B1380] text-[15px] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors flex items-center justify-between cursor-pointer text-left"
                    style={{ borderBottom: "1px solid rgba(40,27,19,0.5)" }}
                  >
                    <span className={selectedLocation ? "text-text" : "text-[#281B1380]"}>
                      {selectedLocation ? selectedLocation.name : "Location*"}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-[#281B1380] transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isLocationOpen && (
                    <div
                      ref={locationDropdownRef}
                      className="absolute left-0 z-50 bg-[#F5F2EB] border border-[#281B1380] rounded-lg shadow-xl w-full flex flex-col overflow-hidden"
                      style={{ top: "calc(100% + 4px)", maxHeight: "220px" }}
                    >
                      <div className="p-2 border-b border-[#281B1330]">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-[14px] placeholder:text-[#281B1380] p-1"
                          autoFocus
                        />
                      </div>
                      <div
                        className="flex-1 overflow-y-auto overscroll-contain"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#8E7F72 #F5F2EB" }}
                      >
                        {countries
                          .filter((c) =>
                            c.name.toLowerCase().includes(locationSearch.toLowerCase())
                          )
                          .map((country) => (
                            <button
                              key={`${country.code}-${country.dial}`}
                              type="button"
                              onClick={() => {
                                setSelectedLocation(country);
                                setSelectedCountry(country);
                                setIsLocationOpen(false);
                                setLocationSearch("");
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[#281B1320] transition-colors text-left focus:outline-none cursor-pointer ${selectedLocation?.code === country.code ? "bg-[#281B1315]" : ""
                                }`}
                            >
                              <img
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt={country.name}
                                className="w-[18px] h-[18px] rounded-full object-cover border border-[#281B1320] shrink-0"
                              />
                              <span className="flex-1 truncate text-[14px]">
                                {country.name}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: Enquiry Type Field Group */}
              {/* <div className="mt-6">
                <label className="text-[14px] text-[#281B1360] block mb-3 font-normal">
                  Enquiry Type *
                </label>

                <div className="flex flex-col gap-2.5">
                  {ENQUIRY_OPTIONS.map((option) => {
                    const isChecked = selectedEnquiries.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer select-none group"
                      >
                        <div className="relative flex items-center justify-center shrink-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleEnquiryToggle(option)}
                            className="peer appearance-none size-4 border border-[#281B1380] bg-transparent rounded-none checked:bg-text checked:border-text transition-colors cursor-pointer"
                          />
                          <svg
                            className="absolute size-3 text-white hidden peer-checked:block pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[13px] sm:text-[14px] text-text/70 group-hover:text-black transition-colors font-light">
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div> */}

              {/* Row 4: Message */}
              <div className="relative mt-4">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message*"
                  rows={1}
                  className="py-1 w-full bg-transparent border-0 border-b border-[#281B1380] text-[15px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors resize-none"
                />
              </div>

              {/* Row 5: Phone with Country Code & Flag */}
              <div className="flex items-center border-b border-[#281B1380] pb-1 pt-3 focus-within:border-text transition-colors gap-3 mt-2 relative">
                {/* Flag dropdown trigger */}
                <div className="relative flex items-center">
                  <button
                    ref={phoneBtnRef}
                    type="button"
                    onClick={() => {
                      setIsPhoneDropdownOpen(!isPhoneDropdownOpen);
                      setIsLocationOpen(false);
                    }}
                    className="flex items-center gap-1.5 bg-transparent hover:bg-[#281B1310] p-1 rounded transition-colors focus:outline-none cursor-pointer"
                    style={{ border: "none" }}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${selectedCountry.code}.png`}
                      alt={selectedCountry.name}
                      className="w-[20px] h-[16px] object-cover rounded-xs border border-[#281B1340]"
                    />
                    <svg
                      className={`w-3 h-3 text-text transition-transform duration-200 ${isPhoneDropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isPhoneDropdownOpen && (
                    <div
                      ref={phoneDropdownRef}
                      className="absolute left-0 z-50 bg-[#F5F2EB] border border-[#281B1380] rounded-lg shadow-xl flex flex-col overflow-hidden"
                      style={{ top: "calc(100% + 8px)", width: "280px", maxHeight: "220px" }}
                      data-lenis-prevent="true"
                    >
                      <div className="p-2 border-b border-[#281B1330]">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={phoneSearch}
                          onChange={(e) => setPhoneSearch(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-[14px] placeholder:text-[#281B1380] p-1"
                          autoFocus
                        />
                      </div>
                      <div
                        className="flex-1 overflow-y-auto overscroll-contain"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#8E7F72 #F5F2EB" }}
                      >
                        {countries
                          .filter(
                            (c) =>
                              c.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
                              c.dial.includes(phoneSearch)
                          )
                          .map((country) => (
                            <button
                              key={`phone-${country.code}-${country.dial}`}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                hasDetectedRef.current = true;
                                setIsPhoneDropdownOpen(false);
                                setPhoneSearch("");
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[#281B1320] transition-colors text-left focus:outline-none cursor-pointer ${selectedCountry.code === country.code ? "bg-[#281B1315]" : ""
                                }`}
                            >
                              <img
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt={country.name}
                                className="w-[20px] h-[16px] object-cover rounded-xs border border-[#281B1320] shrink-0"
                              />
                              <span className="flex-1 truncate text-[14px]">
                                {country.name}
                              </span>
                              <span className="text-[#281B1380] text-[12px] shrink-0">
                                +{country.dial}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[15px] shrink-0 text-text">
                  +{selectedCountry.dial}
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setForm({ ...form, phone: value });
                  }}
                  maxLength={15}
                  placeholder="00000 00000"
                  autoComplete="tel"
                  className="w-full bg-transparent text-[15px] placeholder:text-[#281B1380] outline-none border-0 focus:ring-0"
                />
              </div>

              {/* Row 6: Checkbox 1 — Privacy Policy */}
              <div className="flex items-start gap-3 mt-6">
                <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="peer appearance-none size-4 border border-[#281B1380] bg-transparent rounded-none checked:bg-text checked:border-text transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute size-3 text-white hidden peer-checked:block pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[12px] leading-relaxed text-text/50">
                  I agree to be contacted by SELHAYA regarding my enquiry and accept the{" "}
                  <Link
                    to="/policies/privacy"
                    className="underline hover:text-black transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .*
                </p>
              </div>

              {/* Row 6: Checkbox 2 — Marketing */}
              <div className="flex items-start gap-3 mt-3">
                <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    name="marketingAgree"
                    checked={form.marketingAgree}
                    onChange={handleChange}
                    className="peer appearance-none size-4 border border-[#281B1380] bg-transparent rounded-none checked:bg-text checked:border-text transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute size-3 text-white hidden peer-checked:block pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[12px] leading-relaxed text-text/50">
                  I agree to receive marketing and promotional emails from Selhaya (optional)
                </p>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />

              {/* Submit Button */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={handleSubmitClick}
                  disabled={!canSubmit}
                  className={`w-full sm:w-auto px-8 py-3 bg-[#947D68] text-white text-[13px] sm:text-[14px] font-medium tracking-wide uppercase transition-all duration-200 ${canSubmit
                    ? "hover:bg-[#7D6854] cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                    }`}
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </div>

              {/* reCAPTCHA */}
              {showCaptcha && (
                <div className="mt-5">
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                    onExpired={() => setCaptchaToken(null)}
                    theme="light"
                  />
                </div>
              )}

              {/* Back Link */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-[13px] text-text underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Image */}
        <div className="hidden lg:block relative w-full h-[100dvh] sticky top-0 overflow-hidden">
          <img
            src={pressImg}
            alt="SELHAYA Press & Media"
            className="w-full h-full object-cover object-right"
          />
        </div>
      </section>
    </>
  );
};

export default PressEnquiry;
