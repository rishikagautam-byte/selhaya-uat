import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { countries } from "../../../data/countries";
import type { Country } from "../../../data/countries";

import art from "../../../assets/bespoke/consultation/art.png";
import garment from "../../../assets/bespoke/consultation/garment.png";

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const PvtConsultation = ({ silk }: { silk: "art" | "garment" }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
    phone: "",
    agree: false,
    marketingAgree: false,
  });
  const [loading, setLoading] = useState(false);
  const [, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Location (country) dropdown - starts with no default location
  const [selectedLocation, setSelectedLocation] = useState<Country | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const locationBtnRef = useRef<HTMLButtonElement>(null);

  // Phone dropdown
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const phoneBtnRef = useRef<HTMLButtonElement>(null);
  const hasDetectedRef = useRef(false);

  const captchaRef = useRef<ReCAPTCHA>(null);

  // Click outside handler
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

  // Lock scroll when any dropdown is open
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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!form.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (form.fullName.trim().length < 3) {
      toast.error("Enter valid full name");
      return false;
    }
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Enter valid email");
      return false;
    }
    if (!selectedLocation) {
      toast.error("Location is required");
      return false;
    }
    if (!form.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    const fullPhone = selectedCountry.dial + form.phone.trim();
    if (!phoneRegex.test(fullPhone)) {
      toast.error("Enter valid phone number");
      return false;
    }
    if (!form.agree) {
      toast.error("Please accept privacy policy");
      return false;
    }
    return true;
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Show CAPTCHA; actual submission fires in handleCaptchaChange once token is received
    setShowCaptcha(true);
    setCaptchaToken(null);
    captchaRef.current?.reset();
  };

  const handleCaptchaChange = async (token: string | null) => {
    setCaptchaToken(token);
    if (!token) return;

    setLoading(true);

    try {
      const interestType = silk === "art" ? "Silk Art" : "Silk Garment";

      const formData = new FormData();
      formData.append("action", "BespokeEnquiry");
      formData.append("fullName", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("location", selectedLocation?.name || "");
      formData.append("interestType", interestType);
      formData.append("message", form.message.trim());
      formData.append("phone", selectedCountry.dial + form.phone.trim());
      formData.append("captcha", token);
      formData.append("website", "");

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
          message: "",
          phone: "",
          agree: false,
          marketingAgree: false,
        });
        setSelectedLocation(null);
        captchaRef.current?.reset();
        setCaptchaToken(null);
        setShowCaptcha(false);
      } else {
        toast.error(result.message);
        captchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = form.agree && !loading;

  return (
    <section
      id="private-enquiry"
      className="lg:min-h-screen grid lg:grid-cols-2 bg-section-bg overflow-hidden"
    >
      {/* LEFT PANEL */}
      <div
        className="order-2 md:order-1 w-full px-6 md:px-10 py-20 lg:py-10 flex flex-col justify-center"
      >
        <div className="w-full max-w-137.5 mx-auto">

          {/* Heading */}
          <h3 className={`${silk === "art" ? "text-[20px] md:text-[22px] lg:text-[26px]" : "text-[22px] md:text-[24px] lg:text-[28px]"} leading-snug mb-3`}>
            Begin a Private Consultation
          </h3>

          {/* Sub-description */}
          <p className={`${silk === "art" ? "text-[12px]" : "text-[14px]"} mb-5 leading-relaxed`}>
            {silk === "art" ? (
              <>
                The House accepts a limited number of Bespoke Silk Art commissions annually. <br /><br />
                Private consultations are arranged directly through the Maison following submission and review. Every enquiry begins with a conversation about the story, symbolism, purpose, and legacy behind the commission.
              </>
            ) : (
              <>
                The House accepts a limited number of Bespoke Garment commissions annually. <br /><br />
                Private consultations are arranged directly through the Maison following submission and review. Every enquiry begins with a conversation about the occasion, vision, and details that will shape the commission.
              </>
            )}
          </p>

          <div className="w-full flex flex-col relative">
            <p className={`${silk === "art" ? "text-[12px]" : "text-[14px]"} uppercase mb-4 font-bold tracking-wider`}>
              Enquiry Details
            </p>

            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                autoComplete="off"
                className={`w-full bg-transparent pb-1 pt-3.5 border-0 border-b border-[#281B1380] ${silk === "art" ? "text-[12px]" : "text-[14px]"} placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="off"
                className={`w-full bg-transparent pb-1 pt-4 border-0 border-b border-[#281B1380] ${silk === "art" ? "text-[12px]" : "text-[14px]"} placeholder:text-[#8E7F72] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300`}
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
                className={`w-full bg-transparent pb-1 pt-4 border-0 border-b border-[#281B1380] ${silk === "art" ? "text-[12px]" : "text-[14px]"} outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300 flex items-center justify-between cursor-pointer`}
                style={{ border: "none", borderBottom: "1px solid rgba(40,27,19,0.5)" }}
              >
                <span className={selectedLocation ? "" : "text-[#8E7F72]"}>
                  {selectedLocation ? selectedLocation.name : "Location"}
                </span>
                <svg
                  className={`w-3 h-3  transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
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
                      className="w-full bg-transparent border-none outline-none text-[14px]  placeholder:text-[#281B1380] p-1"
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
                          <span className="flex-1 truncate text-[14px] ">
                            {country.name}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={1}
                className={`w-full bg-transparent pb-1 pt-4 border-0 border-b border-[#281B1380] ${silk === "art" ? "text-[12px]" : "text-[14px]"} placeholder:text-[#8E7F72] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300 resize-none`}
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border-b border-[#281B1380] pb-2 pt-2 focus-within:border-[#2D1F1D] transition-all duration-300 gap-3">
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
                    className="w-[21px] h-[21px] rounded-full object-cover border border-[#281B1340]"
                  />
                  <svg
                    className={`w-3 h-3  transition-transform duration-200 ${isPhoneDropdownOpen ? "rotate-180" : ""}`}
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
                    className="absolute left-0 z-50 bg-secondary-2 border border-[#281B1380] rounded-lg shadow-xl flex flex-col overflow-hidden"
                    style={{ top: "calc(100% + 8px)", width: "280px", maxHeight: "220px" }}
                    data-lenis-prevent="true"
                  >
                    <div className="p-2 border-b border-[#281B1330]">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={phoneSearch}
                        onChange={(e) => setPhoneSearch(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px]  placeholder:text-[#281B1380] p-1"
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
                              className="w-[21px] h-[21px] rounded-full object-cover border border-[#281B1320] shrink-0"
                            />
                            <span className="flex-1 truncate text-[14px] ">
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

              <span className={`shrink-0 pt-0.5 ${silk === "art" ? "text-[12px]" : "text-[14px]"}`}>
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
                autoComplete="off"
                className={`w-full bg-transparent ${silk === "art" ? "text-[12px]" : "text-[14px]"} placeholder:text-[#281B1380] outline-none border-0 focus:ring-0 pt-0.5`}
              />
            </div>

            {/* Checkbox 1 — Privacy Policy */}
            <div className="flex items-start gap-3 mt-5">
              <label className="relative flex items-center cursor-pointer mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="peer appearance-none size-4 border border-[#281B1380] bg-transparent checked:bg-text checked:border-text transition-all duration-200 cursor-pointer"
                />
                <svg
                  className="absolute left-0 top-0 size-4 hidden peer-checked:block pointer-events-none text-white p-[2px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </label>
              <p className="text-[12px] leading-relaxed ">
                Submit Private Enquiry I agree to be contacted by selhaya.com{" "}<br />
                regarding my enquiry and accept the{" "}
                <Link
                  to="/policies/privacy"
                  className="underline cursor-pointer hover:text-primary-dark transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Checkbox 2 — Marketing */}
            <div className="flex items-start gap-3 mt-3">
              <label className="relative flex items-center cursor-pointer mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  name="marketingAgree"
                  checked={form.marketingAgree}
                  onChange={handleChange}
                  className="peer appearance-none size-4 border border-[#281B1380] bg-transparent checked:bg-text checked:border-text transition-all duration-200 cursor-pointer"
                />
                <svg
                  className="absolute left-0 top-0 size-4 hidden peer-checked:block pointer-events-none text-white p-[2px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </label>
              <p className="text-[12px] leading-relaxed ">
                I agree to receive marketing and promotional emails from{" "}
                Selhaya <span className="text-text/40">(optional)</span>
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

            {/* Submit */}
            <button
              onClick={handleSubmitClick}
              disabled={!canSubmit}
              className={`w-fit group flex items-center gap-1 md:gap-2 mt-6 text-[16px] pl-0 pr-3 py-1 transition-all duration-200
                ${canSubmit
                  ? "cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
                }`}
            >
              {loading ? "Submitting..." : "Submit Private Enquiry"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &#8594;
              </span>
            </button>

            {/* reCAPTCHA — shown only after submit is clicked and form is valid */}
            {showCaptcha && (
              <div className="mt-1 animate-fade-in">
                <p className="text-[13px] text-[#281B1380] mb-2">Please complete the verification below to submit your enquiry.</p>
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  onExpired={() => setCaptchaToken(null)}
                  theme="light"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — hidden on mobile */}
      <div className="order-1 md:order-2 relative h-[60dvh] md:h-[110dvh] w-full overflow-hidden">
        <img
          src={silk === "art" ? art : garment}
          alt={`Selhaya Bespoke ${silk === "art" ? "Art" : "Garment"}`}
          className="w-full h-full object-cover object-center"
          style={{ display: "block" }}
        />
      </div>
    </section>
  );
};

export default PvtConsultation;