import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { countries } from "../../../data/countries";
import type { Country } from "../../../data/countries";
import circleImg from "../../../assets/salon/circle.png";
import SEO from "../../../components/SEO";

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const SovereignCircle = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    about: "",
    phone: "",
    agree: false,
    marketingAgree: false,
  });

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

  // Auto-detect user's country
  useEffect(() => {
    if (hasDetectedRef.current) return;
    hasDetectedRef.current = true;

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          const userCountryCode = data.country_code.toLowerCase();
          const matched = countries.find(
            (c) => c.code.toLowerCase() === userCountryCode
          );
          if (matched) {
            setSelectedCountry(matched);
          }
        }
      })
      .catch(() => {
        // Silently fallback to default
      });
  }, []);

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
    const phoneRegex = /^[0-9]{7,15}$/;

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
    const fullPhone = form.phone.trim().replace(/\D/g, "");
    if (!fullPhone || !phoneRegex.test(fullPhone)) {
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
      formData.append("action", "SovereignCircleEnquiry");
      formData.append("fullName", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("location", selectedLocation?.name || "");
      formData.append("about", form.about.trim());
      formData.append("phone", selectedCountry.dial + " " + form.phone.trim());
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
          about: "",
          phone: "",
          agree: false,
          marketingAgree: false,
        });
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

  const filteredLocations = countries.filter((c) =>
    c.name.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredPhoneCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
      c.dial.includes(phoneSearch)
  );

  return (
    <>
      <SEO
        title="Join Sovereign Circle | SELHAYA®"
        description="A limited number of founding patrons will be considered for membership in the SELHAYA Sovereign Circle. Share your details below to begin a private conversation with the House."
        canonical="/sovereign-circle"
      />

      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] bg-primary-light text-text">
        {/* LEFT PANEL — FORM */}

        <div className="w-full flex flex-col justify-center px-6 xl:px-16 py-12 md:py-6 mt-20 overflow-y-auto">
          <div className="lg:pr-20">
            {/* Header Title */}
            <h1 className="font-editorial text-[24px] uppercase leading-tight tracking-wider mb-4">
              JOIN SOVEREIGN CIRCLE
            </h1>

            {/* Subtext */}
            <p className="text-[14px] sm:text-[16px] text-text/80 mb-8">
              A limited number of founding patrons will be considered for membership in the SELHAYA
              Sovereign Circle. Members enjoy privileged access to the Royal Cultural Salon, private
              gatherings, Maison publications and selected collection previews. Share your details
              below to begin a private conversation with the House.
            </p>

            {/* Form Section */}
            <div className="w-full flex flex-col">
              <p className="text-[13px] sm:text-[14px] uppercase tracking-widest font-semibold text-text mb-6">
                PRIVATE MEMBERSHIP ENQUIRY
              </p>

              {/* Row 1: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name*"
                    autoComplete="name"
                    className="w-full bg-transparent pb-2 pt-2 border-0 border-b border-[#281B1380] text-[14px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
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
                    className="w-full bg-transparent pb-2 pt-2 border-0 border-b border-[#281B1380] text-[14px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Location */}
              <div className="relative mb-4">
                <button
                  ref={locationBtnRef}
                  type="button"
                  onClick={() => {
                    setIsLocationOpen(!isLocationOpen);
                    setLocationSearch("");
                  }}
                  className="w-full bg-transparent pb-2 pt-2 border-0 border-b border-[#281B1380] text-[14px] text-left flex items-center justify-between outline-none focus:outline-none focus:border-text transition-colors"
                >
                  <span
                    className={
                      selectedLocation ? "text-text" : "text-[#281B1380]"
                    }
                  >
                    {selectedLocation ? selectedLocation.name : "Location*"}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-[#281B1380] transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isLocationOpen && (
                  <div
                    ref={locationDropdownRef}
                    className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#F7F2EA] border border-[#281B1330] shadow-lg max-h-60 overflow-hidden flex flex-col"
                  >
                    <div className="p-2 border-b border-[#281B1320]">
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Search location..."
                        autoFocus
                        className="w-full bg-transparent px-3 py-1.5 text-[13px] border border-[#281B1330] outline-none placeholder:text-[#281B1360] focus:border-text"
                      />
                    </div>
                    <div className="overflow-y-auto flex-1">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setSelectedLocation(country);
                              setIsLocationOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#281B1310] transition-colors flex items-center justify-between ${selectedLocation?.code === country.code
                              ? "bg-[#281B1315] font-medium"
                              : ""
                              }`}
                          >
                            <span>{country.name}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-3 text-[13px] text-[#281B1360] text-center">
                          No location found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 3: Phone Number with Country Flag Dropdown */}
              <div className="relative flex items-center border-b border-[#281B1380] mb-4">
                <button
                  ref={phoneBtnRef}
                  type="button"
                  onClick={() => {
                    setIsPhoneDropdownOpen(!isPhoneDropdownOpen);
                    setPhoneSearch("");
                  }}
                  className="flex items-center gap-1.5 pr-2 py-2 text-[14px] text-text shrink-0 hover:opacity-80 transition-opacity"
                >
                  <span className="text-[18px]">
                    {selectedCountry.code
                      .toUpperCase()
                      .replace(/./g, (char) =>
                        String.fromCodePoint(127397 + char.charCodeAt(0))
                      )}
                  </span>
                  <svg
                    className={`w-3 h-3 text-[#281B1380] transition-transform duration-200 ${isPhoneDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

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
                  className="w-full bg-transparent py-2 pl-2 border-0 text-[14px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
                />

                {isPhoneDropdownOpen && (
                  <div
                    ref={phoneDropdownRef}
                    className="absolute z-50 left-0 top-full mt-1 w-72 bg-[#F7F2EA] border border-[#281B1330] shadow-lg max-h-60 overflow-hidden flex flex-col"
                  >
                    <div className="p-2 border-b border-[#281B1320]">
                      <input
                        type="text"
                        value={phoneSearch}
                        onChange={(e) => setPhoneSearch(e.target.value)}
                        placeholder="Search country or code..."
                        autoFocus
                        className="w-full bg-transparent px-3 py-1.5 text-[13px] border border-[#281B1330] outline-none placeholder:text-[#281B1360] focus:border-text"
                      />
                    </div>
                    <div className="overflow-y-auto flex-1">
                      {filteredPhoneCountries.length > 0 ? (
                        filteredPhoneCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsPhoneDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#281B1310] transition-colors flex items-center justify-between ${selectedCountry.code === c.code
                              ? "bg-[#281B1315] font-medium"
                              : ""
                              }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <span className="text-[16px]">
                                {c.code
                                  .toUpperCase()
                                  .replace(/./g, (char) =>
                                    String.fromCodePoint(
                                      127397 + char.charCodeAt(0)
                                    )
                                  )}
                              </span>
                              <span className="truncate">{c.name}</span>
                            </span>
                            <span className="text-[#281B1360] text-[12px] ml-2 shrink-0">
                              {c.dial}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-3 text-[13px] text-[#281B1360] text-center">
                          No country found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 4: Tell us about yourself / your interest */}
              <div className="relative mb-6">
                <input
                  type="text"
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Tell us about yourself / your interest in the Circle"
                  className="w-full bg-transparent pb-2 pt-2 border-0 border-b border-[#281B1380] text-[14px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-text transition-colors"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-none border border-[#281B1380] text-text focus:ring-0 accent-[#8C7A6B] cursor-pointer"
                  />
                  <span className="text-[13px] text-text/90 leading-snug">
                    I agree to be contacted by SELHAYA regarding my enquiry and accept the{" "}
                    <Link
                      to="/policies/privacy"
                      target="_blank"
                      className="underline hover:opacity-75 transition-opacity"
                    >
                      Privacy Policy
                    </Link>
                    .*
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="marketingAgree"
                    checked={form.marketingAgree}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded-none border border-[#281B1380] text-text focus:ring-0 accent-[#8C7A6B] cursor-pointer"
                  />
                  <span className="text-[13px] text-text/80 leading-snug">
                    I agree to receive marketing and promotional emails from Selhaya (optional)
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleSubmitClick}
                  disabled={!canSubmit}
                  className={`w-full sm:w-auto px-8 py-3.5 text-[14px] font-medium tracking-wider text-white transition-colors duration-300 ${canSubmit
                    ? "bg-[#8C7A6B] hover:bg-[#736356] cursor-pointer"
                    : "bg-[#8C7A6B]/50 cursor-not-allowed"
                    }`}
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </div>

              {/* reCAPTCHA */}
              {showCaptcha && (
                <div className="mb-6">
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </div>
              )}

              {/* Back link */}
              <div>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-[14px] text-text underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — IMAGE */}
        <div className="hidden lg:block w-full h-full min-h-screen relative">
          <img
            src={circleImg}
            alt="SELHAYA Sovereign Circle"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default SovereignCircle;
