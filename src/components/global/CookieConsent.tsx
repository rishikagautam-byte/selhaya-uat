import { motion, AnimatePresence }             from 'framer-motion';
import React, { useState, useEffect }           from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db }                                  from '@/lib/firebase';

// ─────────────────────────────────────────────
// GA4 Consent Mode helpers
// ─────────────────────────────────────────────
declare function gtag(...args: unknown[]): void;

/** Grant analytics tracking — called after user accepts cookies. */
function enableGATracking(): void {
  if (typeof gtag === 'undefined') return;
  gtag('consent', 'update', {
    analytics_storage:  'granted',
    ad_storage:         'denied',   // keep ads denied unless you add ad consent
    ad_user_data:       'denied',
    ad_personalization: 'denied',
  });
  // Fire the first page_view now that consent is granted
  gtag('event', 'page_view');
}

/** Deny / revoke analytics tracking — called on reject or withdraw. */
function disableGATracking(): void {
  if (typeof gtag === 'undefined') return;
  gtag('consent', 'update', {
    analytics_storage:  'denied',
    ad_storage:         'denied',
    ad_user_data:       'denied',
    ad_personalization: 'denied',
  });
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const CONSENT_ID_KEY     = 'selhaya_consent_id';
const CONSENT_LOG_KEY    = 'selhaya_consent_audit_log';
const CONSENT_STATUS_KEY = 'selhaya_cookie_consent';
const POLICY_VERSION     = '1.0';
const CONSENT_DURATION_YEARS = 1;

// Firestore collection name
const FIRESTORE_COLLECTION = 'consent_logs';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type ConsentAction = 'Accepted' | 'Rejected' | 'Withdrawn';

interface DeviceInfo {
  userAgent:    string;
  platform:     string;   // "Win32", "MacIntel", etc.
  language:     string;   // "en-IN", "en-GB", etc.
  screenWidth:  number;
  screenHeight: number;
  timezone:     string;   // "Asia/Kolkata"
}

interface AuditEntry {
  consentId:     string;
  timestamp:     string;   // ISO 8601 UTC – local log
  action:        ConsentAction;
  analytics:     boolean;
  policyVersion: string;
  device:        DeviceInfo;
  expiresAt:     string;   // ISO 8601 – when consent expires
}

// ─────────────────────────────────────────────
// Local Storage Helpers
// ─────────────────────────────────────────────

/** Returns existing Consent ID or generates a new one and persists it. */
function getOrCreateConsentId(): string {
  try {
    const existing = localStorage.getItem(CONSENT_ID_KEY);
    if (existing) return existing;
    const id = `cns_${crypto.randomUUID()}`;
    localStorage.setItem(CONSENT_ID_KEY, id);
    return id;
  } catch {
    return `cns_${Math.random().toString(36).slice(2, 18)}`;
  }
}

/** Reads the local audit log array from localStorage. */
function readLocalLog(): AuditEntry[] {
  try {
    const raw = localStorage.getItem(CONSENT_LOG_KEY);
    return raw ? (JSON.parse(raw) as AuditEntry[]) : [];
  } catch {
    return [];
  }
}

/** Appends one entry to the local audit log. */
function appendLocalEntry(entry: AuditEntry): void {
  try {
    const log = readLocalLog();
    log.push(entry);
    localStorage.setItem(CONSENT_LOG_KEY, JSON.stringify(log));
  } catch { /* storage quota / unavailable */ }
}

/** Reads whether consent was already given. */
function getConsentStatus(): 'accepted' | 'rejected' | null {
  try {
    const raw = localStorage.getItem(CONSENT_STATUS_KEY);
    if (raw === 'accepted' || raw === 'rejected') return raw;
  } catch { /* ignore */ }
  return null;
}

// ─────────────────────────────────────────────
// Device Info
// ─────────────────────────────────────────────
function collectDeviceInfo(): DeviceInfo {
  return {
    userAgent:    navigator.userAgent,
    platform:     (navigator as { platform?: string }).platform ?? 'unknown',
    language:     navigator.language,
    screenWidth:  window.screen.width,
    screenHeight: window.screen.height,
    timezone:     Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

// ─────────────────────────────────────────────
// Core: record consent
// ─────────────────────────────────────────────

/**
 * Called on every Accept / Reject / Withdraw.
 * 1. Builds an audit entry
 * 2. Saves it to localStorage  (instant, offline-safe)
 * 3. Pushes it to Firestore    (async, best-effort)
 * 4. Sets a 1-year browser cookie
 */
async function recordConsent(
  action:           ConsentAction,
  analyticsEnabled: boolean,
): Promise<void> {
  const consentId = getOrCreateConsentId();
  const now       = new Date();
  const expiresAt = new Date(now);
  expiresAt.setFullYear(expiresAt.getFullYear() + CONSENT_DURATION_YEARS);

  const entry: AuditEntry = {
    consentId,
    timestamp:     now.toISOString(),
    action,
    analytics:     analyticsEnabled,
    policyVersion: POLICY_VERSION,
    device:        collectDeviceInfo(),
    expiresAt:     expiresAt.toISOString(),
  };

  // 1️⃣ Save locally first (works even if Firestore is slow/offline)
  appendLocalEntry(entry);

  // 2️⃣ Persist status flag
  try {
    localStorage.setItem(
      CONSENT_STATUS_KEY,
      analyticsEnabled ? 'accepted' : 'rejected',
    );
  } catch { /* ignore */ }

  // 3️⃣ Push to Firestore – serverTimestamp() used so Firestore Console
  //    shows the correct time regardless of the user's device clock.
  try {
    await addDoc(collection(db, FIRESTORE_COLLECTION), {
      consentId,
      action,
      analytics:     analyticsEnabled,
      policyVersion: POLICY_VERSION,
      expiresAt:     expiresAt.toISOString(),
      device:        collectDeviceInfo(),
      // createdAt is the authoritative server-side timestamp
      createdAt:     serverTimestamp(),
      // clientTimestamp is the user's device time (for cross-reference)
      clientTimestamp: now.toISOString(),
    });
  } catch (err) {
    // Network error or Firestore rules blocked — local log is the fallback
    console.warn('[CookieConsent] Firestore write failed (local log saved):', err);
  }

  // 4️⃣ 1-year browser cookie (both accept & reject)
  const cookieValue = analyticsEnabled ? 'accepted' : 'rejected';
  const cookieBase  = `expires=${expiresAt.toUTCString()}; path=/; SameSite=Lax`;

  document.cookie = `selhaya_consent=${cookieValue}; ${cookieBase}`;
  document.cookie = `selhaya_consent_id=${consentId}; ${cookieBase}`;
}

// ─────────────────────────────────────────────
// Accordion Section
// ─────────────────────────────────────────────
interface AccordionSectionProps {
  title:    string;
  children: React.ReactNode;
}

function AccordionSection({ title, children }: AccordionSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-2 text-left cursor-pointer border-b border-[#281B131F]"
        aria-expanded={open}
      >
        <span className="text-[12px] md:text-[14px] font-medium tracking-wide text-[#2A1F14]">
          {title}
        </span>
        {/* Chevron */}
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="shrink-0"
        >
          <path d="M2 5L7 10L12 5" stroke="#A8916F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.25, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.28, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.18 },
              },
            }}
            className="overflow-hidden"
          >
            <p className="text-[12px] md:text-[14px] text-[#2A1F14] pt-2 pb-1 ">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function CookieConsent() {
  const [visible,   setVisible]   = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const status = getConsentStatus();
    if (!status) {
      const timer = setTimeout(() => {
        setVisible(true);
        setAnimating(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (accepted: boolean) => {
    const action: ConsentAction = accepted ? 'Accepted' : 'Rejected';

    // Update GA4 consent BEFORE recording (so first event is captured correctly)
    if (accepted) enableGATracking();
    else          disableGATracking();

    // Fire-and-forget – UI doesn't need to wait for Firestore
    void recordConsent(action, accepted);
    setAnimating(false);
    setTimeout(() => setVisible(false), 700);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
        style={{
          opacity:    animating ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Modal */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        style={{
          opacity:    animating ? 1 : 0,
          transform:  animating ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div
          className="bg-[#F9F4EE] w-full max-w-sm md:max-w-3xl p-8 relative"
          style={{ boxShadow: '0 8px 60px rgba(40,27,19,0.18)' }}
        >
          {/* Thin top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-section-bg" />

          {/* Title */}
          <h3
            id="cookie-consent-title"
            className="text-[16px] mb-4"
          >
            Cookies &amp; Privacy
          </h3>

          {/* Divider */}
          <div className="w-full h-px bg-[#281B13] mb-6" />

          {/* Body */}
          <div className="text-[12px] md:text-[14px] space-y-3 mb-5">
            <p className="font-medium text-[#2A1F14]">We Value Your Privacy</p>
            <p className="text-[#2A1F14] ">
              SELHAYA uses cookies and similar technologies to provide a seamless experience
              across our website, remember your preferences, understand how visitors engage
              with the Maison, and continually refine our digital experience.{' '}
              Some cookies are essential for the website to function correctly. With your
              permission, we may also use optional cookies to understand website performance,
              personalise content, and improve the way SELHAYA is presented to you.{' '}
              Your choices will be respected and can be changed whenever you wish.
            </p>
            <p className="text-[#2A1F14] ">
              Selhaya approaches your data with discretion and integrity&nbsp; respectfully,
              securely, and without excess.
            </p>
          </div>

          {/* Accordion sections */}
          <div className="mb-6 space-y-3">
            <AccordionSection title="Essential Cookies">
              Required for core website functions, security, navigation, and remembering your
              privacy preferences.
            </AccordionSection>
            <AccordionSection title="Analytics &amp; Performance">
              Help us understand how visitors use the website so we can improve its
              functionality, content, and overall experience.
            </AccordionSection>
            <AccordionSection title="Preferences &amp; Personalisation">
              Allow the website to remember selected preferences and provide a more considered
              experience. You can change your cookie preferences at any time.
            </AccordionSection>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              id="cookie-accept-btn"
              onClick={() => handleClose(true)}
              className="flex-1 py-3 px-4 bg-[#A8916F] text-[#F9F4EE] text-[12px] tracking-[1.8px] uppercase font-medium hover:bg-[#402C1F] transition-colors duration-300 cursor-pointer"
            >
              Accept All
            </button>
            <button
              id="cookie-essential-btn"
              onClick={() => handleClose(false)}
              className="flex-1 py-3 px-4 bg-[#A8916F] text-[#F9F4EE] text-[12px] tracking-[1.8px] uppercase font-medium hover:bg-[#402C1F] transition-colors duration-300 cursor-pointer"
            >
              Accept Essential Only
            </button>
            <a
              id="cookie-policy-link"
              href="/policies/cookies"
              className="flex-1 py-3 px-4 border border-[#A8916F] text-[#2A1F14] text-[12px] tracking-[1.8px] uppercase font-medium hover:bg-[#E4DDCB] transition-colors duration-300 cursor-pointer flex items-center justify-center"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────
// Public utilities
// ─────────────────────────────────────────────

/**
 * Returns the local consent audit log for this browser.
 * Example: import { getConsentAuditLog } from '@/components/global/CookieConsent';
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getConsentAuditLog(): AuditEntry[] {
  return readLocalLog();
}

/**
 * Call this when the user withdraws consent (e.g. from a settings page).
 * Writes a "Withdrawn" entry to both localStorage and Firestore,
 * and revokes GA4 analytics tracking immediately.
 */
// eslint-disable-next-line react-refresh/only-export-components
export async function withdrawConsent(): Promise<void> {
  disableGATracking();
  await recordConsent('Withdrawn', false);
}