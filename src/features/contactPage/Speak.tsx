import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { countries } from "../../data/countries";
import type { Country } from "../../data/countries";
import contactImg from "../../assets/contact.webp";
import SEO from "../../components/SEO";
import { SEO_CONFIG } from "../../config/seo";

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const Speak = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === "hu") || countries[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const hasDetectedRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isDropdownOpen]);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    hasDetectedRef.current = true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let updatedValue = value;
    if (type !== "checkbox") {
      updatedValue = value.replace(/\s{2,}/g, " ");
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : updatedValue
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      toast.error("Enter a valid name");
      return false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Enter a valid email");
      return false;
    }

    const fullPhone = selectedCountry.dial + formData.phone.trim();
    if (!phoneRegex.test(fullPhone)) {
      toast.error("Enter a valid phone number");
      return false;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      toast.error("Message is too short");
      return false;
    }

    if (!formData.agree) {
      toast.error("Please accept the privacy policy");
      return false;
    }

    return true;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowCaptcha(true);
  };

  const submitForm = async (token: string) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("action", "Contact");
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("phone", selectedCountry.dial + formData.phone.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("message", formData.message.trim());
      formDataToSend.append("captcha", token);
      formDataToSend.append("website", ""); // Honeypot

      const response = await fetch(import.meta.env.VITE_CONTACT_FORM_URL, {
        method: "POST",
        body: formDataToSend,
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        toast.success("Enquiry submitted");
        setFormData({ name: '', phone: '', email: '', message: '', agree: false });
        captchaRef.current?.reset();
        setCaptchaToken(null);
        setShowCaptcha(false);
      } else {
        toast.error(result.message || "Submission failed");
        captchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = formData.agree && !loading;

  const inputClasses = `w-full bg-transparent border-0 border-b border-secondary-2/60 py-4 text-[15px] text-primary-dark focus:ring-0 focus:border-primary-dark outline-none placeholder:text-primary-dark/50 transition-all duration-300`;

  return (
    <>
      <SEO
        title={SEO_CONFIG.contact.title}
        description={SEO_CONFIG.contact.description}
        canonical={SEO_CONFIG.contact.canonical}
      />
      <section className="flex flex-col md:flex-row md:h-[100dvh] overflow-hidden">

        {/* Left Panel — Form */}
        <div className="w-full md:w-1/2 bg-[#F9F4EE] px-6 lg:px-16 flex flex-col justify-center overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="w-full max-w-xl mx-auto pt-30 pb-20">

            {/* Heading */}
            <h2 className="text-[26px] md:text-[32px]  text-gray-900 mb-3 tracking-tight font-light leading-snug">
              Speak with the house
            </h2>

            {/* Sub-copy */}
            <p className="text-[14px] text-black font-light leading-relaxed mb-8 max-w-sm">
              Whether a whisper of gratitude, a question about the collection,
              or a special request — your words are received with intention.
            </p>

            {/* Form */}
            <form onSubmit={handleInitialSubmit} className="space-y-1">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              {/* Phone with Country Code */}
              <div className="flex items-center border-b border-secondary-2/60 pb-2 pt-2 focus-within:border-primary-dark transition-all duration-300 gap-3 mt-2 relative">
                {/* Flag Dropdown */}
                <div className="relative flex items-center">
                  <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1.5 bg-transparent hover:bg-[#281B1310] p-1 rounded transition-colors focus:outline-none cursor-pointer"
                    style={{ border: "none" }}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${selectedCountry.code}.png`}
                      alt={selectedCountry.name}
                      className="w-[21px] h-[21px] rounded-full object-cover border border-[#281B1340]"
                    />
                    <svg
                      className={`w-3 h-3 text-[#2D1F1D] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <span className="text-[15px] text-[#2D1F1D] shrink-0 pt-0.5">
                  +{selectedCountry.dial}
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, phone: value });
                  }}
                  maxLength={15}
                  placeholder="12345 67890"
                  autoComplete="off"
                  className="w-full bg-transparent text-[15px] text-[#2D1F1D] placeholder:text-primary-dark/50 outline-none border-0 focus:ring-0 pt-0.5"
                />

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 z-50 bg-[#F5F2EB] border border-[#281B1380] rounded-lg shadow-xl w-full sm:w-[320px] flex flex-col overflow-hidden"
                    style={{ top: "100%", marginTop: "8px", maxHeight: "220px" }}
                    data-lenis-prevent="true"
                  >
                    <div className="p-2 border-b border-[#281B1330]">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-[14px] text-[#2D1F1D] placeholder:text-[#281B1380] p-1"
                        autoFocus
                      />
                    </div>
                    <div
                      className="flex-1 overflow-y-auto overscroll-contain"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#8E7F72 #F5F2EB",
                      }}
                    >
                      {countries
                        .filter(
                          (c) =>
                            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.dial.includes(searchQuery)
                        )
                        .map((country) => (
                          <button
                            key={`${country.code}-${country.dial}`}
                            type="button"
                            onClick={() => {
                              handleSelectCountry(country);
                              setSearchQuery("");
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[#281B1320] transition-colors text-left focus:outline-none cursor-pointer ${selectedCountry.code === country.code ? "bg-[#281B1315]" : ""
                              }`}
                          >
                            <img
                              src={`https://flagcdn.com/w40/${country.code}.png`}
                              alt={country.name}
                              className="w-[21px] h-[21px] rounded-full object-cover border border-[#281B1320] shrink-0"
                            />
                            <span className="flex-1 truncate text-[14px] text-[#2D1F1D]">
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

              <div>
                <input
                  type="text"
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3 mt-5 pb-3">
                <label className="relative flex items-center cursor-pointer mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="peer appearance-none size-4 border border-secondary-2/60 bg-transparent checked:bg-primary-dark checked:border-primary-dark transition-all duration-200 cursor-pointer"
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
                <p className="text-[12px] leading-relaxed text-black font-light">
                  All enquiries are handled with strict discretion. Your information will never be shared.{" "}
                  <br />
                  The House responds within 24–48 hours. I accept the{" "}
                  <a href="/policies/privacy" className="underline cursor-pointer hover:text-primary-dark transition-colors">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/policies/terms" className="underline cursor-pointer hover:text-primary-dark transition-colors">Terms of Service</a>.
                </p>
              </div>

              {/* Submit button & CAPTCHA */}
              {!showCaptcha ? (
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full py-3 text-[14px] tracking-[0.1em] uppercase font-medium transition-all duration-200 ${!canSubmit
                        ? "opacity-50 cursor-not-allowed bg-[#8B6F52] text-white"
                        : "bg-[#8B6F52] text-white hover:bg-[#6e5640]"
                      }`}
                  >
                    Submit Enquiry
                  </button>
                </div>
              ) : (
                <div className="pt-3 pb-8 flex flex-col items-center">
                  {loading ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 text-[14px] tracking-[0.1em] uppercase font-medium transition-all duration-200 opacity-50 cursor-not-allowed bg-[#8B6F52] text-white mb-4"
                    >
                      Submitting...
                    </button>
                  ) : (
                    <p className="text-[13px] text-gray-600 mb-3 text-center">Please verify you are human to submit the enquiry.</p>
                  )}

                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      if (token) submitForm(token);
                    }}
                    onExpired={() => setCaptchaToken(null)}
                    theme="light"
                  />
                </div>
              )}

            </form>

            {/* Back link */}
            <div className="mt-8 pb-10">
              <a
                href="/"
                className="text-[13px] text-black underline underline-offset-4 hover:text-primary-dark transition-colors"
              >
                Back
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel — Image */}
        <div className="hidden md:block w-1/2 relative min-h-[50vh] lg:min-h-screen">
          <img
            src={contactImg}
            alt="The House"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </section>
    </>
  );
};

export default Speak;