import { type FormEvent, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

const EDITORIAL_IMAGE = "/loginImage.png";

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, authError, clearAuthError } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    clearAuthError();
  }, []);
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authError) clearAuthError();
    
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    
    setErrors({});
    try {
      await login(email.trim(), password);
      const from = location.state?.from || "/";
      navigate(from);
    } catch (err) {
      console.log(err);
      // Error is also saved in context as authError
    }
  };

  return (
    <>
      <SEO
        title={SEO_CONFIG.login.title}
        description={SEO_CONFIG.login.description}
        canonical={SEO_CONFIG.login.canonical}
        noindex={SEO_CONFIG.login.noindex}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

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
                Login
              </h5>

              <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "420px" }}>
                {authError && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fcebe8", border: "1px solid #c0392b", color: "#c0392b", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                    {authError}
                  </div>
                )}
                {/* Email */}
                <div style={{ marginBottom: errors.email ? "8px" : "28px" }}>
                  <div className="underline-field" style={{ borderBottom: `1px solid ${errors.email ? "#c0392b" : emailFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px" }}>
                    <input
                      id="email" type="email" value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                      onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)}
                      placeholder="Email" autoComplete="email" className="login-input"
                      style={{ width: "100%", background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#281B13", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  {errors.email && <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom: errors.password ? "8px" : "14px" }}>
                  <div className="underline-field" style={{ borderBottom: `1px solid ${errors.password ? "#c0392b" : passwordFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px", display: "flex", alignItems: "center" }}>
                    <input
                      id="password" type={showPassword ? "text" : "password"} value={password}
                      onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }}
                      onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)}
                      placeholder="Password" autoComplete="current-password" className="login-input"
                      style={{ flex: 1, background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#2e2a26", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} style={{ background: "none", border: "none", cursor: "pointer", color: "#9e9188", padding: "0 2px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                      {showPassword ? <EyeClosed /> : <EyeOpen />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>{errors.password}</p>}
                </div>

                {/* Forgot */}
                <div style={{ marginBottom: "32px" }}>
                  <Link to="/forgot" style={{ fontSize: "12px", fontWeight: 400, color: "#281B13", letterSpacing: "0.01em", textUnderlineOffset: "3px", textDecorationColor: "#c9c1b9", fontFamily: "DM Sans" }}>
                    Have you forgotten your password?
                  </Link>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading} className="login-btn" style={{ width: "100%", backgroundColor: isLoading ? "#c4b9ae" : "#998169", border: "none", padding: "14px 0", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", color: "#F5F1EB", textTransform: "uppercase", cursor: isLoading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
                  {isLoading ? "Logging in..." : "Log in"}
                </button>

                <p style={{ fontSize: "12px", fontWeight: 400, color: "#2e2a26", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }}>
                  Don't have an account?{" "}
                  <Link to="/register" state={{ from: location.state?.from }} style={{ fontSize: "12px", fontWeight: 500, color: "#2e2a26", letterSpacing: "0.04em", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>
                    Create your maison profile.
                  </Link>
                </p>
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
                alt="Editorial fashion visual"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}