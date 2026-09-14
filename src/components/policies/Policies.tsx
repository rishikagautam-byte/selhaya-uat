import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of services" }, // matches "Terms of services" in screenshots
  { id: "refund", label: "Refund Policy" },
  { id: "shipping", label: "Shipping Policy" },
  { id: "cookies", label: "Cookies" },
];

export default function PoliciesPage() {
  const { tabId } = useParams<{ tabId?: string }>();
  const navigate = useNavigate();
  const activeTab = tabId && tabs.some((t) => t.id === tabId) ? tabId : "privacy";

  // State for Cookies choice
  const [cookieChoice, setCookieChoice] = useState<"accepted" | "rejected" | null>(() => {
    return (localStorage.getItem("selhaya_cookies") as "accepted" | "rejected") || null;
  });

  // Ensure scroll is at the top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleTabChange = (id: string) => {
    navigate(`/policies/${id}`);
  };

  const handleAcceptCookies = () => {
    setCookieChoice("accepted");
    localStorage.setItem("selhaya_cookies", "accepted");
  };

  const handleRejectCookies = () => {
    setCookieChoice("rejected");
    localStorage.setItem("selhaya_cookies", "rejected");
  };

  return (
    <>
      <SEO
        title={SEO_CONFIG.policies.title}
        description={SEO_CONFIG.policies.description}
        canonical={SEO_CONFIG.policies.canonical}
      />
      <div className="min-h-screen bg-primary-light pt-32 pb-24 px-6 md:px-14 lg:px-20">
        {/* Breadcrumb */}
        <div className="text-[12px] uppercase text-text/60 mb-3">
          <Link to="/" className="hover:text-text transition-colors">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-text">Selhaya Policies</span>
        </div>
        <h1 className="text-[32px] lg:text-[36px] font-editorial text-text md:mb-16">
          Selhaya Policies
        </h1>
        {/* Container */}
        <div className="mx-auto">

          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-16 mt-8">

            {/* Sidebar / Left Column */}
            <div className="sticky top-28 self-start col-span-4 flex flex-col pr-8">
              <nav className="flex flex-col gap-6" aria-label="Policies Navigation">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`text-left text-[14px] uppercase transition-all duration-300 font-medium ${isActive
                        ? "text-text w-fit pb-0.5"
                        : "text-text/50 hover:text-text/80"
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Column */}
            <div className="col-span-8 pl-4 lg:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="max-w-2xl texx] text-text/80 space-y-8"
                >
                  {activeTab === "privacy" && <PrivacyPolicyContent />}
                  {activeTab === "terms" && <TermsOfServiceContent />}
                  {activeTab === "refund" && <RefundPolicyContent />}
                  {activeTab === "shipping" && <ShippingPolicyContent />}
                  {activeTab === "cookies" && (
                    <CookiesContent
                      choice={cookieChoice}
                      onAccept={handleAcceptCookies}
                      onReject={handleRejectCookies}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden mt-4">

            {/* Navigation Links listed vertically above content */}
            <div className="flex flex-col gap-4 mb-10 pb-8/10">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`text-left text-[14px] transition-all duration-300 font-medium ${isActive
                      ? "text-text"
                      : "text-text/50"
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content block below navigation */}
            <div className="texx] text-text/80 space-y-8">
              {activeTab === "privacy" && <PrivacyPolicyContent />}
              {activeTab === "terms" && <TermsOfServiceContent />}
              {activeTab === "refund" && <RefundPolicyContent />}
              {activeTab === "shipping" && <ShippingPolicyContent />}
              {activeTab === "cookies" && (
                <CookiesContent
                  choice={cookieChoice}
                  onAccept={handleAcceptCookies}
                  onReject={handleRejectCookies}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   POLICY CONTENT COMPONENTS
   ───────────────────────────────────────────────────────────────────────────── */

function PrivacyPolicyContent() {
  return (
    <>
      <p className="text-[24px] text-text font-medium  mb-8">
        Privacy Policy
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-[#281B1380]">Selhaya Ltd.</p>
          <p className="text-[#281B1380]">Website: selhaya.com</p>
          <p className="text-text mb-4">Last updated: 10 Feb 2026</p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Purpose and Scope
          </p>
          <p className="text-[#281B1380]">
            This Privacy Policy explains how Selhaya Ltd (“we”, “us”, “our”)
            collects, uses, stores, and shares personal information when you visit
            our website or use our services. It applies to all website visitors,
            customers, and account holders.
          </p>
        </div>

        <div>
          <h6 className="font-dm-sans text-[20px] font-medium text-text mb-4">
            Information We Collect
          </h6>

          <div className="mb-5">
            <p className="text-[16px] font-medium text-text mb-2">
              Information You Provide
            </p>

            <p className="text-[#281B1380] mb-2">
              We may collect personal information that you voluntarily provide,
              including:
            </p>

            <ul className="list-none pl-4 text-[#281B1380]">
              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Name and contact details
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Information submitted through contact or inquiry forms
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Account registration details
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Billing and payment information
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Newsletter or marketing subscription details
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <p className="text-[16px] font-medium text-text mb-2">
              Information Collected Automatically
            </p>

            <p className="text-[#281B1380] mb-2">
              When you use our website, we automatically collect:
            </p>

            <ul className="list-none pl-4 text-[#281B1380]">
              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                IP address
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Browser and device information
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Pages visited, time spent, and interaction data
              </li>

              <li className="relative pl-3">
                <span className="absolute left-0 top-0 text-[14px]">•</span>
                Cookies and similar tracking identifiers
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[16px] font-medium text-text mb-2">
              Sensitive Personal Data
            </p>

            <p className="text-[#281B1380]">
              We do not knowingly collect sensitive personal data such as health
              information, biometric data, political opinions, or religious beliefs.
            </p>
          </div>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            How We Use Personal Information
          </p>

          <p className="text-[#281B1380] mb-2">
            We use personal information only for legitimate business purposes,
            including:
          </p>

          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Responding to inquiries and communications
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Creating and managing user accounts
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Processing payments and delivering services
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Sending newsletters and marketing communications (where consented)
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Analyzing website usage and improving services
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Maintaining security and preventing misuse
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Cookies and Tracking Technologies
          </p>

          <p className="text-[#281B1380] mb-2">
            We use cookies and similar technologies to operate and improve the
            website. Third-party tools used include:
          </p>

          <ul className="list-none pl-4 text-[#281B1380] mb-2">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Google Analytics
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Google Tag Manager
            </li>
          </ul>

          <p className="text-[#281B1380]">
            These tools help us understand website usage and marketing performance.
            You can control or disable cookies through your browser settings,
            though some features may be affected.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Sharing and Disclosure of Information
          </p>

          <p className="text-[#281B1380] mb-2">
            We do not sell personal information. We may share information only:
          </p>

          <ul className="list-none pl-4 text-[#281B1380] mb-2">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              With trusted service providers (hosting, analytics, payment
              processing, email services)
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              When required by law or legal process
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              With your explicit consent
            </li>
          </ul>

          <p className="text-[#281B1380]">
            All service providers are limited to using the information solely for
            providing services to us.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            International Data Transfers
          </p>

          <p className="text-[#281B1380]">
            Personal information may be stored or processed outside your country of
            residence. Where this occurs, we apply reasonable contractual,
            technical, and organizational safeguards to protect the information.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Data Retention
          </p>

          <p className="text-[#281B1380] mb-2">
            We retain personal information only for as long as necessary for the
            purposes outlined in this policy or as required by law. Typical
            retention periods include:
          </p>

          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Account and transaction records: up to 7 years
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Marketing data: until you unsubscribe
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Contact and inquiry records: up to 2 years
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Analytics data: up to 26 months or anonymized
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Security Measures
          </p>

          <p className="text-[#281B1380]">
            We use appropriate administrative, technical, and physical safeguards
            to protect personal information against unauthorized access, loss, or
            misuse. No online system is completely secure, but we take reasonable
            steps to reduce risk.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Your Rights
          </p>

          <p className="text-[#281B1380] mb-2">
            Depending on applicable law, you may have the right to:
          </p>

          <ul className="list-none leading-tight pl-4 text-[#281B1380] mb-2">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Access your personal information
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Request corrections
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Withdraw marketing consent
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Request deletion of personal data
            </li>

            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Object to or restrict certain processing
            </li>
          </ul>

          <p className="text-[#281B1380]">
            Requests can be made using the contact details below.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Children’s Privacy
          </p>

          <p className="text-[#281B1380]">
            Our website and services are not intended for children under the age of
            16. We do not knowingly collect personal information from children.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Changes to This Privacy Policy
          </p>

          <p className="text-[#281B1380]">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Contact Information
          </p>
          <p className="text-text font-medium" >For questions, concerns, or support-related inquiries, please contact:</p>
          <p className="text-text font-medium">Selhaya Ltd.</p>

          <a
            href="mailto:concierge@selhaya.com"
            className="text-text underline opacity-80 hover:opacity-100 transition-opacity font-medium block"
          >
            concierge@selhaya.com
          </a>

          <p className="text-text font-medium">
            or visit our{" "}
            Contact Page — we’re here to assist
            with grace.
          </p>
        </div>
      </div>
    </>
  );
}

function TermsOfServiceContent() {
  return (
    <>
      <p className="text-[24px] text-text dm-sans font-medium uppercase mb-4">
        Terms of Service
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-[#281B1380]">Selhaya Ltd.</p>
          <p className="text-[#281B1380]">Website: selhaya.com</p>
          <p className="text-text mb-4">Last updated: 10 Feb 2026</p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Acceptance of Terms</p>
          <p className="text-[#281B1380]">
            These Terms of Service (“Terms”) govern your access to and use of selhaya.com and any related services provided by Selhaya Ltd (“Selhaya,” “we,” “us,” or “our”).
            By accessing or using the website or our services, you agree to be bound by these Terms. If you do not agree, you must not use the website or services.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Use of the Website and Services</p>
          <p className="text-[#281B1380]">
            You agree to use the website and services only for lawful purposes and in a manner that does not violate any applicable laws or regulations.
          </p>
          <p className="text-text mb-1">You must not:</p>
          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Use the website for fraudulent, misleading, or unlawful activity
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Attempt to gain unauthorized access to systems or data
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>

              Interfere with website security, performance, or functionality
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>

              Introduce malicious code, viruses, or harmful material
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Accounts and User Information</p>
          <p className="text-[#281B1380]">If you create an account with Selhaya, you are responsible for:</p>
          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Providing accurate and complete information
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Maintaining the confidentiality of your login credentials
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              All activity that occurs under your account
            </li>
          </ul>
          <p className="text-[#281B1380]">We reserve the right to suspend or terminate accounts that violate these Terms.</p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Payments and Transactions</p>
          <p className="text-[#281B1380] mb-2">Where applicable, payments made through the website are subject to:</p>
          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              The pricing and payment terms displayed at the time of purchase
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Third-party payment processor terms
            </li>
          </ul>
          <p className="text-[#281B1380]">
            Selhaya does not store full payment card details and is not responsible for errors or failures caused by payment processors.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Intellectual Property</p>
          <p className="text-[#281B1380]">
            All content on selhaya.com, including text, graphics, branding, logos, layout, and design, is owned by Selhaya Ltd or its licensors and is protected by intellectual property laws.
          </p>
          <p className="text-[#281B1380]">
            You may not copy, reproduce, modify, distribute, or commercially exploit any content without prior written permission, except for personal, non-commercial use.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Third-Party Services and Links</p>
          <p className="text-[#281B1380]">
            The website may include links to third-party websites or services. Selhaya does not control and is not responsible for third-party content, policies, or practices. Your use of third-party services is at your own risk and subject to their terms.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Limitation of Liability</p>
          <p className="text-[#281B1380] mb-2">
            To the fullest extent permitted by law, Selhaya Ltd shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:
          </p>
          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Use or inability to use the website or services
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Errors, omissions, or inaccuracies in content
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Unauthorized access, data loss, or service interruptions
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Indemnification</p>
          <p className="text-[#281B1380] mb-2">
            You agree to indemnify and hold harmless Selhaya Ltd from any claims, losses, damages, or expenses arising out of:
          </p>
          <ul className="list-none pl-4 text-[#281B1380]">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Your use of the website or services
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Your violation of these Terms
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Your infringement of third-party rights
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Termination</p>
          <p className="text-[#281B1380]">
            We may suspend or terminate access to the website or services at any time, without notice, if you violate these Terms or engage in unlawful activity.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Governing Law</p>
          <p className="text-[#281B1380]">
            These Terms are governed by and construed in accordance with the applicable laws of the jurisdiction in which Selhaya Ltd operates, without regard to conflict of law principles.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Changes to These Terms</p>
          <p className="text-[#281B1380]">
            We may update these Terms from time to time. Updates will be posted on this page with the updated "Last updated" date. Continued use of the website after changes constitute acceptance of the new Terms.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Contact Information
          </p>
          <p className="text-text font-medium" >For questions, concerns, or support-related inquiries, please contact:</p>
          <p className="text-text font-medium">Selhaya Ltd.</p>

          <a
            href="mailto:concierge@selhaya.com"
            className="text-text underline opacity-80 hover:opacity-100 transition-opacity font-medium block"
          >
            concierge@selhaya.com
          </a>

          <p className="text-text font-medium">
            or visit our{" "}
            Contact Page — we’re here to assist
            with grace.
          </p>
        </div>
      </div>
    </>
  );
}

function RefundPolicyContent() {
  return (
    <>
      <p className="text-[24px] text-text dm-sans font-medium uppercase mb-4">
        REFUND POLICY
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-[16px] font-medium text-text mb-2">Origin In Grace</p>
          <p className="text-[#281B1380]">
            At Selhaya, each garment is crafted with intention, care, and limited release. We kindly ask you to review the following policy before placing your order.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">No Refunds:</p>
          <p className="text-[#281B1380]">Custom-Fit Sizes all made-to-measure or adjusted garments.</p>
          <p className="mt-2">These pieces are made in sacred small batches, and all sales are considered final.</p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">14-Day Refunds:</p>
          <ul className="list-none leading-snug">
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              All non-custom items are eligible.
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Must be unused, unworn, and in all original packaging.
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Requests must be submitted within 14 days of receiving your order.
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Return shipping is the responsibility of the customer. Once received and approved, refunds will be issued to the original payment method.
            </li>
            <li className="relative pl-3">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              If more than 15 business days have passed since we’ve approved your return, please contact us at{" "}
              <a href="mailto:concierge@selhaya.com" className="underline hover:opacity-70 transition-opacity font-medium">
                concierge@selhaya.com
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ShippingPolicyContent() {
  return (
    <>
      <p className="text-[24px] text-text dm-sans font-medium uppercase mb-4">
        Shipping Policy
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-[#281B1380]">
            At Selhaya, we are proud to offer complimentary international shipping on all orders - a gesture of elegance extended across borders.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Processing Time</p>
          <p className="text-[#281B1380]">
            All orders are carefully prepared and packaged with intention. Please allow 3-5 business days for processing before dispatch. For limited or pre-order items, estimated dispatch dates will be clearly noted on the product page.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Shipping Timeframes</p>
          <p className="text-[#281B1380] mb-3">
            We partner with trusted global couriers to ensure safe and timely delivery. Typical shipping timelines are as follows:
          </p>
          <ul className="list-none mb-3">
            <li className="relative pl-3 text-[#281B1380] font-semibold">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              United Kingdom & Europe: 5-8 business days
            </li>
            <li className="relative pl-3 text-[#281B1380] font-semibold">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Middle East & GCC: 6-10 business days
            </li>
            <li className="relative pl-3 text-[#281B1380] font-semibold">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              North America: 7-12 business days
            </li>
            <li className="relative pl-3 text-[#281B1380] font-semibold">
              <span className="absolute left-0 top-0 text-[14px]">•</span>
              Rest of the World: 10-15 business days
            </li>
          </ul>
          <p className="text-[#281B1380] mt-3">
            These timeframes are estimates and may vary slightly depending on customs clearance or local courier delays.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Tracking</p>
          <p className="text-[#281B1380]">
            Once your order ships, you will receive a confirmation email with tracking details. We invite you to follow your parcel's journey to your doorstep.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Duties & Taxes</p>
          <p className="text-[#281B1380]">
            International orders may be subject to customs duties or import taxes upon arrival. These are the responsibility of the customer. We recommend checking with your local customs authority if you have concerns.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">Pre-Orders & Collector Pieces</p>
          <p className="text-[#281B1380]">
            Select Maison Collector items are released in limited quantities and on a pre-order basis. These pieces will have clearly stated dispatch timelines on the product page (e.g. June 2025 for The Yaqeen Abaya). Kindly review this before placing your order.
          </p>
        </div>

        <div className="pt-2 text-text border-t border-text/10">
          <p>
            If you have any questions or require support, please visit our{" "}
            <Link to="/contact" className="underline hover:opacity-70 transition-opacity font-medium">
              Contact Page
            </Link>{" "}
            we're here to assist with grace.
          </p>
        </div>
      </div>
    </>
  );
}

interface CookiesContentProps {
  choice: "accepted" | "rejected" | null;
  onAccept: () => void;
  onReject: () => void;
}

function CookiesContent({ choice, onAccept, onReject }: CookiesContentProps) {
  return (
    <>
      <p className="text-[24px] text-text dm-sans font-medium mb-8">
        Cookies
      </p>

      <div className="space-y-6">
        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            We Value Your Privacy
          </p>
          <p className="text-[#281B1380] leading-relaxed mb-4">
            SELHAYA uses cookies and similar technologies to provide a seamless experience across our website, remember your preferences, understand how visitors engage with the Maison, and continually refine our digital experience. Some cookies are essential for the website to function correctly. With your permission, we may also use optional cookies to understand website performance, personalise content, and improve the way SELHAYA is presented to you. Your choices will be respected and can be changed whenever you wish.
          </p>
          <p className="text-[#281B1380] leading-relaxed">
            Selhaya approaches your data with discretion and integrity respectfully, securely, and without excess.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Essential Cookies
          </p>
          <p className="text-[#281B1380] leading-relaxed">
            Required for core website functions, security, navigation, and remembering your privacy preferences.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Analytics &amp; Performance
          </p>
          <p className="text-[#281B1380] leading-relaxed">
            Help us understand how visitors use the website so we can improve its functionality, content, and overall experience.
          </p>
        </div>

        <div>
          <p className="text-[16px] font-medium text-text mb-2">
            Preferences &amp; Personalisation
          </p>
          <p className="text-[#281B1380] leading-relaxed">
            Allow the website to remember selected preferences and provide a more considered experience. You can change your cookie preferences at any time.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-text/10">
          {choice === "accepted" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#5B4636] font-medium text-[14px]"
            >
              You have accepted cookies to ensure a seamless and refined experience. Thank you.
            </motion.p>
          )}

          {choice === "rejected" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#281B1380] text-[14px]"
            >
              You have rejected non-essential cookies. You can change it to Accept All at any time.
            </motion.p>
          )}

          <div className="flex gap-8 items-center pt-2">
            <button
              onClick={onReject}
              className="text-[16px] text-text underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Reject All
            </button>
            <button
              onClick={onAccept}
              className="text-[16px] text-text font-medium hover:opacity-75 transition-opacity cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
