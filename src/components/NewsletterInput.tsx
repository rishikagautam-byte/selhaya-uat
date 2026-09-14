import { useState } from "react";
import toast from "react-hot-toast";

const NewsletterInput = ({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append(
        "action",
        "Newsletter"
      );

      formData.append(
        "email",
        email.trim()
      );

      formData.append(
        "website",
        ""
      );

      const response = await fetch(
        import.meta.env.VITE_CONTACT_FORM_URL,
        {
          method: "POST",
          body: formData,
        }
      );

      const text =
        await response.text();

      const result =
        JSON.parse(text);

      if (result.success) {
        toast.success(
          "Successfully subscribed"
        );

        setEmail("");
      } else {
        toast.error(
          result.message ||
          "Subscription failed"
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

  return (
    <div
      className="flex items-center bg-[#EDE8DF] rounded-sm px-3"
      style={{
        width: fullWidth
          ? "100%"
          : "349px",
        height: "38px",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Enter Your Email"
        className="bg-transparent border-none outline-none text-[11px] text-[#402C1F] placeholder-[#9C8778] font-[DM_Sans] tracking-[0.3px] flex-1 h-full"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="text-[#402C1F] text-base hover:opacity-60 transition-opacity ml-2 flex-shrink-0 disabled:opacity-50"
        aria-label="Subscribe"
        data-cta="footer_newsletter_subscribe"
      >
        {loading ? "..." : "→"}
      </button>
    </div>
  );
};

export default NewsletterInput;