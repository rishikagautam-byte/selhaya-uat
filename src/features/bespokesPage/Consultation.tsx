import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import privateImg from "../../assets/bespoke/private.png";

const Consultation = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    interestType: '',
    message: ''
  });
  const [isInterestOpen, setIsInterestOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { value: "bridal", label: "Bridal" },
    { value: "evening", label: "Evening Wear" },
    { value: "tailoring", label: "Tailoring" },
    { value: "other", label: "Other" },
  ];
  
  const countries = [
    "United Kingdom",
    "United States",
    "Europe",
    "Canada",
    "Australia",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "Japan",
    "China",
    "India",
    "United Arab Emirates",
    "Other",
  ];

  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (formData.fullName.trim().length < 3) {
      toast.error("Enter a valid full name");
      return false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Enter a valid email");
      return false;
    }

    if (!formData.location) {
      toast.error("Please select a location");
      return false;
    }

    if (!formData.interestType) {
      toast.error("Please select an interest type");
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required");
      return false;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Message is too short");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Tab name in Google Sheet
      formDataToSend.append(
        "action",
        "Consultation"
      );

      formDataToSend.append(
        "fullName",
        formData.fullName.trim()
      );

      formDataToSend.append(
        "email",
        formData.email.trim()
      );

      formDataToSend.append(
        "location",
        formData.location
      );

      formDataToSend.append(
        "interestType",
        formData.interestType
      );

      formDataToSend.append(
        "message",
        formData.message.trim()
      );

      // Honeypot
      formDataToSend.append(
        "website",
        ""
      );

      const response = await fetch(
        import.meta.env.VITE_CONTACT_FORM_URL,{ 
          method: "POST",
          body: formDataToSend,
        }
      );

      const text = await response.text();
      console.log("response text", text);
      const result = JSON.parse(text);
      console.log("result", result);

      if (result.success) {
        toast.success(
          "Consultation request submitted"
        );

        setFormData({
          fullName: "",
          email: "",
          location: "",
          interestType: "",
          message: "",
        });

        setIsLocationOpen(false);
        setIsInterestOpen(false);
      } else {
        toast.error(
          result.message ||
          "Submission failed"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full bg-transparent border-0 border-b border-secondary-2/60 py-4 text-[15px] text-primary-dark focus:ring-0 focus:border-primary-dark outline-none placeholder:text-primary-dark/50 transition-all duration-300 `;

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      {/* Left Panel - Form */}
      <div className="w-full md:w-1/2 bg-section-bg px-6 lg:px-20 py-24 flex flex-col justify-center">
        <div className="max-w-xl mx-auto w-full">
          <h2 className="text-[24px] md:text-[36px] font-serif text-gray-900 mb-8 tracking-tight font-light">
            Begin a Private Consultation
          </h2>

          <div className="text-gray-800 space-y-6 mb-16 text-lg font-light leading-relaxed">
            <p>
              The House accepts a limited number of Bespoke{" "}
              <br className="hidden lg:block" />
              commissions annually.
            </p>
            <p>
              Private consultations are arranged directly through{" "}
              <br className="hidden lg:block" />
              the Maison following submission and review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className="text-[13px] font-bold tracking-[0.15em] text-gray-800 mb-6 uppercase">
              Enquiry Details
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
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

              <div className="relative" ref={locationRef}>
                <button
                  type="button"
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className={`${inputClasses} flex items-center justify-between text-left cursor-pointer w-full`}
                >
                  <span className={formData.location ? "text-primary-dark" : "text-primary-dark/50"}>
                    {formData.location || "Location"}
                  </span>

                  <svg
                    className={`w-4 h-4 text-primary-dark/60 transition-transform duration-300 ${isLocationOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isLocationOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 z-50 max-h-56 overflow-y-auto bg-[#F9F4EE] border border-secondary-2/20 rounded-md shadow-[0_12px_30px_rgba(64,44,31,0.08)]">
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            location: country,
                          });
                          setIsLocationOpen(false);
                        }}
                        className="w-full px-5 py-3 text-left text-[14px] text-primary-dark border-b border-secondary-2/10 last:border-b-0 hover:bg-[#E4DDCB] hover:pl-6 transition-all duration-200">
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsInterestOpen(!isInterestOpen)}
                  className={`${inputClasses} flex items-center justify-between text-left cursor-pointer `}>
                  <span className={formData.interestType
                    ? "text-primary-dark"
                    : "text-primary-dark/50"
                  }>
                    {interestOptions.find(
                      (item) => item.value === formData.interestType
                    )?.label || "Interest Type"}
                  </span>

                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isInterestOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isInterestOpen && (
                  <div className=" absolute top-full left-0 right-0 mt-2 bg-primary-light border border-secondary-2/30 shadow-xl z-50 max-h-60 overflow-y-auto rounded-sm">
                    {interestOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            interestType: option.value,
                          });
                          setIsInterestOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-primary-dark hover:bg-secondary-1 transition-colors ">
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-1 px-2 py-1 transition-all duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark hover:text-section-bg"}`}>
                <span className="text-[16px] font-medium">
                  {loading ? "Submitting..." : "Submit Private Enquiry"}
                </span>

                {!loading && <span>⟶</span>}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block w-1/2 relative min-h-[50vh] lg:min-h-screen flex flex-col justify-center items-center">
        <img src={privateImg} alt="Consultation" className="absolute inset-0 w-full h-full object-cover" />

      </div>
    </section>
  );
};

export default Consultation;
