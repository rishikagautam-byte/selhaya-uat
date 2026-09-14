import { type FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

const EDITORIAL_IMAGE = "/forgot.png";

export default function ForgotPage() {
  const { forgotPassword, isLoading, authError, clearAuthError } = useUser();
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    clearAuthError();
  }, []);

  const handleForgot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authError) clearAuthError();
    setSuccessMsg("");
    
    if (!email.trim()) return;

    try {
      await forgotPassword(email.trim());
      setSuccessMsg("We've sent you an email with a link to update your password.");
    } catch (err) {
      console.log(err);
      // Error is handled in context
    }
  };

  return (
    <>
      <SEO
        title={SEO_CONFIG.forgot.title}
        description={SEO_CONFIG.forgot.description}
        canonical={SEO_CONFIG.forgot.canonical}
        noindex={SEO_CONFIG.forgot.noindex}
      />
      <style>{`

        .auth-page, .auth-page * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-input::placeholder { color: #b0a89e; font-size: 14px; font-weight: 400; letter-spacing: 0.01em; }
        .login-input:focus { outline: none; }

        .login-btn { transition: background-color 0.25s ease, letter-spacing 0.25s ease; }
        .login-btn:hover { background-color: #c4b9ae !important; letter-spacing: 0.18em; }

        .underline-field { transition: border-color 0.25s ease; }

        @media (max-width: 768px) {
          .selhaya-wrapper { flex-direction: column !important; }
          .left-panel { width: 100% !important; padding: 100px 28px 36px 28px !important; }
          .right-panel { width: 100% !important; min-height: 260px; }
        }
      `}</style>

      <div className="auth-page" style={{ display: "contents" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            backgroundColor: "#f5f5f3",
            minHeight: "100vh",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div
            className="selhaya-wrapper"
            style={{
              display: "flex",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {/* LEFT PANEL — 50% */}
            <div
              className="left-panel"
              style={{
                backgroundColor: "#efebe6",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "50%",
                flexShrink: 0,
                padding: "80px 72px",
              }}
            >
              <h5
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  color: "#2e2a26",
                  textTransform: "uppercase",
                  marginBottom: "36px",
                  lineHeight: 1.2,
                }}
              >
                Reset your Password
              </h5>

              <form onSubmit={handleForgot} style={{ width: "100%", maxWidth: "420px" }}>
                {authError && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fcebe8", border: "1px solid #c0392b", color: "#c0392b", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                    {authError}
                  </div>
                )}
                {successMsg && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#e8fcf0", border: "1px solid #27ae60", color: "#27ae60", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                    {successMsg}
                  </div>
                )}
                <div style={{ marginBottom: "28px" }}>
                  <div className="underline-field" style={{ borderBottom: `1px solid ${emailFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px" }}>
                    <input
                      id="email" type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
                      placeholder="Email" autoComplete="email" className="login-input"
                      style={{ width: "100%", background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#2e2a26", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <p style={{ fontSize: "14px", color: "#281B13", fontFamily: "'DM Sans', sans-serif", marginTop: "8px", fontWeight: 400 }}>
                    We will send you an email to reset your password
                  </p>
                </div>

                <button type="submit" disabled={isLoading || !email.trim()} className="login-btn" style={{ width: "100%", backgroundColor: isLoading || !email.trim() ? "#c4b9ae" : "#998169", border: "none", padding: "14px 0", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", color: "#F5F1EB", textTransform: "uppercase", cursor: isLoading || !email.trim() ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
                  {isLoading ? "Sending..." : "Confirm"}
                </button>

                <Link to="/login" style={{ fontSize: "12px", fontWeight: 500, color: "#2e2a26", letterSpacing: "0.04em", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>
                  Log in
                </Link>
              </form>
            </div>

            {/* RIGHT PANEL — 50% */}
            <div
              className="right-panel"
              style={{
                width: "50%",
                flexShrink: 0,
                backgroundColor: "#e8e3dc",
              }}
            >
              <img
                src={EDITORIAL_IMAGE}
                alt="Password recovery visual"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}