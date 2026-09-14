import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { countries } from "../../data/countries";
import type { Country } from "../../data/countries";
import { Link } from "react-router-dom";

// Use your real site key via env var; falls back to Google's public test key
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const Advisory = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    affiliation: "",
    requirement: "",
    phone: "",
    agree: false,
    marketingAgree: false,
  });
  const [loading, setLoading] = useState(false);
  const [, setCaptchaToken] = useState<string | null>(null);
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

    if (!form.affiliation.trim()) {
      toast.error("Affiliation is required");
      return false;
    }

    if (!form.requirement.trim()) {
      toast.error("Requirement is required");
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
    // Show CAPTCHA for the user to solve; actual submission happens in handleCaptchaChange
    setShowCaptcha(true);
    setCaptchaToken(null);
    captchaRef.current?.reset();
  };

  const handleCaptchaChange = async (token: string | null) => {
    setCaptchaToken(token);
    if (!token) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("action", "Advisory");
      formData.append("fullName", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("affiliation", form.affiliation.trim());
      formData.append("requirement", form.requirement.trim());
      formData.append("phone", selectedCountry.dial + form.phone.trim());
      formData.append("captcha", token);

      // Honeypot
      formData.append("website", "");

      const response = await fetch(
        import.meta.env.VITE_CONTACT_FORM_URL,
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        toast.success("Enquiry submitted successfully");

        setForm({
          fullName: "",
          email: "",
          affiliation: "",
          requirement: "",
          phone: "",
          agree: false,
          marketingAgree: false,
        });

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
    <>
      <section
        className=" grid lg:grid-cols-2 bg-primary-light "
      >
        {/* LEFT PANEL */}
        <div
          className="w-full flex flex-col justify-center h-full px-8 pb-8 sm:px-10 md:px-12 lg:px-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="pt-10">

            {/* Heading — kept at a size that wraps in exactly 2 lines on desktop */}
            <h3
              className="text-[24px] lg:text-[28px] leading-snug mb-4"
            >
              Tell us what requires greater clarity, direction or considered counsel, and begin a private conversation.
            </h3>

            <div className="w-full flex flex-col relative">
              <p className="text-[16px] uppercase mb-1 font-semibold">
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
                  className="w-full bg-transparent pb-1 pt-3.5 border-0 border-b border-[#281B1380] text-[16px] placeholder:text-[#281B1380] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300" />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Professional Email Address"
                  autoComplete="off"
                  className="w-full bg-transparent pb-1 pt-4 border-0 border-b border-[#281B1380] text-[16px] placeholder:text-[#8E7F72] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300"
                />
              </div>

              {/* Affiliation */}
              <div className="relative">
                <input
                  type="text"
                  name="affiliation"
                  value={form.affiliation}
                  onChange={handleChange}
                  placeholder="Industry / Institutional Affiliation"
                  autoComplete="off"
                  className="w-full bg-transparent pb-1 pt-4 border-0 border-b border-[#281B1380] text-[16px] placeholder:text-[#8E7F72] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300" />
              </div>

              {/* Requirement */}
              <div className="relative">
                <textarea
                  name="requirement"
                  value={form.requirement}
                  onChange={handleChange}
                  placeholder="Nature of Advisory Requirement"
                  rows={1}
                  className="w-full bg-transparent pb-1 pt-4 border-0 border-b border-[#281B1380] text-[16px] placeholder:text-[#8E7F72] outline-none focus:outline-none focus:ring-0 focus:border-[#2D1F1D] transition-all duration-300 resize-none" />
              </div>

              {/* Phone */}
              <div className="flex items-center border-b border-[#281B1380] pb-2 pt-2 focus-within:border-[#2D1F1D] transition-all duration-300 gap-3">

                {/* Country Code (Custom Flag Dropdown) */}
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
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Selected Country Code Display */}
                <span className="text-[16px] text-[#2D1F1D] flex-shrink-0 pt-0.5">
                  +{selectedCountry.dial}
                </span>

                {/* Phone Number */}
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setForm({
                      ...form,
                      phone: value,
                    });
                  }}
                  maxLength={15}
                  placeholder="12345 67890"
                  autoComplete="off"
                  className="w-full bg-transparent text-[16px] text-[#2D1F1D] placeholder:text-[#281B1380] outline-none border-0 focus:ring-0 pt-0.5"
                />
              </div>

              {/* Checkbox 1 — Privacy Policy (required) */}
              <div className="flex items-start gap-3 mt-5">
                <label className="relative flex items-center cursor-pointer mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="peer appearance-none size-4 border border-[#281B1380] bg-transparent checked:bg-[#2D1F1D] checked:border-[#2D1F1D] transition-all duration-200 cursor-pointer" />
                  {/* Checkmark */}
                  <svg
                    className="absolute left-0 top-0 size-4 hidden peer-checked:block pointer-events-none text-white p-[2px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>

                <p className="text-[12px] leading-relaxed text-[#2D1F1D]">
                  I agree to be contacted by selhaya.com{" "}<br />regarding my enquiry and accept the{" "}
                  <Link to="/policies/privacy" className="underline cursor-pointer">Privacy Policy</Link>.
                </p>
              </div>

              {/* Checkbox 2 — Marketing (optional) */}
              <div className="flex items-start gap-3 mt-3">
                <label className="relative flex items-center cursor-pointer mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    name="marketingAgree"
                    checked={form.marketingAgree}
                    onChange={handleChange}
                    className="peer appearance-none size-4 border border-[#281B1380] bg-transparent checked:bg-[#2D1F1D] checked:border-[#2D1F1D] transition-all duration-200 cursor-pointer" />
                  {/* Checkmark */}
                  <svg
                    className="absolute left-0 top-0 size-4 hidden peer-checked:block pointer-events-none text-white p-[2px]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>

                <p className="text-[12px] leading-relaxed text-[#2D1F1D]">
                  I agree to receive marketing and promotional emails from <br />
                  Selhaya. <span className="text-[#281B1380]">(optional)</span>
                </p>
              </div>

              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
              />

              {/* Country Dropdown Popup */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 z-50 bg-[#F5F2EB] border border-[#281B1380] rounded-lg shadow-xl w-full sm:w-[320px] flex flex-col overflow-hidden"
                  style={{ top: "130px", bottom: "75px" }}
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
                      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.dial.includes(searchQuery))
                      .map((country) => (
                        <button
                          key={`${country.code}-${country.dial}`}
                          type="button"
                          onClick={() => {
                            handleSelectCountry(country);
                            setSearchQuery("");
                          }}
                          title={`${country.name} (+${country.dial})`}
                          className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-[#281B1320] transition-colors text-left focus:outline-none cursor-pointer ${selectedCountry.code === country.code
                            ? "bg-[#281B1315]"
                            : ""
                            }`}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${country.code}.png`}
                            alt={country.name}
                            className="w-[21px] h-[21px] rounded-full object-cover border border-[#281B1320] flex-shrink-0"
                          />
                          <span className="flex-1 truncate text-[14px] text-[#2D1F1D]">{country.name}</span>
                          <span className="text-[#281B1380] text-[12px] flex-shrink-0">+{country.dial}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Submit — left-aligned, matching text baseline of form */}
              <button
                onClick={handleSubmitClick}
                disabled={!canSubmit}
                className={`w-fit group flex items-center gap-1 md:gap-2 mt-6 text-[16px] pl-0 pr-3 py-1 transition-all duration-200
                  ${canSubmit
                    ? "cursor-pointer hover:bg-primary-dark hover:text-section-bg"
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
                <div className="mt-4 animate-fade-in">
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
        {/* 
        <div className="order-1 md:order-2 w-full h-125 md:h-auto">
          <img src="/images/home/salon.png"
            alt="Garments of Presence"
            className="w-full h-125 md:h-screen object-cover object-top" />
        </div>
        */}
        <div className="order-1 md:order-2 md:h-[110dvh] w-full">
          <img
            src="/contact.png"
            alt="Selhaya"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Advisory;