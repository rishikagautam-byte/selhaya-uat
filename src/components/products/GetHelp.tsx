// GetHelpDrawer.tsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type GetHelpDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function GetHelp({
    isOpen,
    onClose,
}: GetHelpDrawerProps) {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        question: "",
    });

    const [loading, setLoading] = useState(false);

    // lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // esc close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await fetch(
                "https://script.google.com/macros/s/AKfycbxwSf4NQkiqaJTEOJdF3NMvDTQqSqTp61ip9MyUZG504inrxvm3QYE-J5_9K_OeOVi5iA/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            toast.success(
                "Your enquiry has been submitted."
            );

            setForm({
                fullName: "",
                email: "",
                phone: "",
                question: "",
            });

            onClose();
        } catch (err) {
            console.error(err);

            toast.error(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 z-[90] bg-black/55"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        data-lenis-prevent
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
              fixed top-0 right-0 z-[100]
              h-screen
              w-full md:w-[48%]
              bg-[#F7F2EA]
              overflow-y-auto
              px-6 md:px-10
              py-6 md:py-8
              flex flex-col
            "
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-black/10 pb-6">
                            <h2 className="text-[13px] uppercase tracking-wide">
                                Get Help
                            </h2>

                            <button
                                onClick={onClose}
                                className="
                  text-[11px]
                  uppercase
                  underline
                  underline-offset-2
                  hover:opacity-60
                  transition
                "
                            >
                                Close
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex-1 flex flex-col"
                        >
                            <div className="pt-8">
                                <h3 className="text-[14px] mb-8">
                                    Want To Ask Questions ?
                                </h3>

                                <div className="space-y-5">
                                    {/* Full Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            required
                                            className="
                        w-full
                        bg-transparent
                        border-b border-black/20
                        pb-2
                        text-[12px]
                        outline-none
                        placeholder:text-black/40
                      "
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Professional Email Address"
                                            required
                                            className="
                        w-full
                        bg-transparent
                        border-b border-black/20
                        pb-2
                        text-[12px]
                        outline-none
                        placeholder:text-black/40
                      "
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="Direct Contact Number"
                                            className="
                        w-full
                        bg-transparent
                        border-b border-black/20
                        pb-2
                        text-[12px]
                        outline-none
                        placeholder:text-black/40
                      "
                                        />
                                    </div>

                                    {/* Question */}
                                    <div>
                                        <textarea
                                            name="question"
                                            value={form.question}
                                            onChange={handleChange}
                                            placeholder="Your Question..."
                                            rows={1}
                                            required
                                            className="
                        w-full
                        resize-none
                        bg-transparent
                        border-b border-black/20
                        pb-2
                        text-[12px]
                        outline-none
                        placeholder:text-black/40
                      "
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                      mt-4
                      flex items-center gap-3
                      text-[14px]
                      hover:opacity-60
                      transition
                    "
                                    >
                                        {loading ? "Submitting..." : "Submit Enquiry"}

                                        <span className="text-lg">→</span>
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-black/10 pt-5 text-[11px] mt-16">
                                <p className="max-w-[420px] leading-[1.45]">
                                    All enquiries are handled with strict discretion.
                                    Your information will never be shared.
                                </p>

                                <p className="mt-4">
                                    The House responds within 24–48 hours.
                                </p>

                                <div className="flex gap-4 mt-4 underline">
                                    <button type="button">
                                        Privacy Policy
                                    </button>

                                    <button type="button">
                                        Terms of Service
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}