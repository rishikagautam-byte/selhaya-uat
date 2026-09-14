import { type FormEvent, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import SEO from "../SEO";
import { SEO_CONFIG } from "../../config/seo";

const EDITORIAL_IMAGE = "/register.png";

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

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading, authError, clearAuthError } = useUser();
  const [name, setName] = useState("");
  
  useEffect(() => {
    clearAuthError();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authError) clearAuthError();
    
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (!confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    
    setErrors({});
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/login", { state: { from: location.state?.from } });
    } catch (err) {
      console.log(err);
      // Error is also saved in context as authError
    }
  };

  return (
    <>
      <SEO
        title={SEO_CONFIG.register.title}
        description={SEO_CONFIG.register.description}
        canonical={SEO_CONFIG.register.canonical}
        noindex={SEO_CONFIG.register.noindex}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        .auth-page, .auth-page * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }

        .reg-input::placeholder { color: #b0a89e; font-size: 14px; font-weight: 400; letter-spacing: 0.01em; }
        .reg-input:focus { outline: none; }

        .reg-btn { transition: background-color 0.25s ease, letter-spacing 0.25s ease; }
        .reg-btn:hover { background-color: #c4b9ae !important; letter-spacing: 0.18em; }

        .reg-underline { transition: border-color 0.25s ease; }

        @media (max-width: 768px) {
          .reg-wrapper { flex-direction: column !important; }
          .reg-left { width: 100% !important; padding: 100px 28px 36px 28px !important; }
          .reg-right { width: 100% !important; min-height: 260px; }
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
            className="reg-wrapper"
            style={{
              display: "flex",
              width: "100%",
              minHeight: "100vh",
            }}
          >
            {/* LEFT PANEL — 50% */}
            <div
              className="reg-left"
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
              <h5 style={{ fontFamily: "DM Sans", fontSize: "20px", fontWeight: 300, letterSpacing: "0.12em", color: "#2e2a26", textTransform: "uppercase", marginBottom: "10px", lineHeight: 1.2 }}>
                CREATE YOUR MAISON PROFILE
              </h5>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 400, color: "#7a6e65", letterSpacing: "0.01em", marginBottom: "32px", lineHeight: 1.6 }}>
                For order history, robe tracking and <br /> personalised client access.
              </p>

              <form onSubmit={handleRegister} style={{ width: "100%", maxWidth: "420px" }}>
                {authError && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fcebe8", border: "1px solid #c0392b", color: "#c0392b", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                    {authError}
                  </div>
                )}
                {/* Full Name */}
                <div style={{ marginBottom: errors.name ? "8px" : "28px" }}>
                  <div className="reg-underline" style={{ borderBottom: `1px solid ${errors.name ? "#c0392b" : nameFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px" }}>
                    <input id="name" type="text" value={name} onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: undefined })); }} onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)} placeholder="Full name" className="reg-input" style={{ width: "100%", background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#281B13", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                  {errors.name && <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: errors.email ? "8px" : "28px" }}>
                  <div className="reg-underline" style={{ borderBottom: `1px solid ${errors.email ? "#c0392b" : emailFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px" }}>
                    <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} placeholder="Email" autoComplete="email" className="reg-input" style={{ width: "100%", background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#281B13", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                  {errors.email && <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom: errors.password ? "8px" : "28px" }}>
                  <div className="reg-underline" style={{ borderBottom: `1px solid ${errors.password ? "#c0392b" : passwordFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px", display: "flex", alignItems: "center" }}>
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: undefined })); }} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} placeholder="Password" autoComplete="new-password" className="reg-input" style={{ flex: 1, background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#281B13", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password" style={{ background: "none", border: "none", cursor: "pointer", color: "#9e9188", padding: "0 2px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                      {showPassword ? <EyeClosed /> : <EyeOpen />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: errors.confirmPassword ? "8px" : "32px" }}>
                  <div className="reg-underline" style={{ borderBottom: `1px solid ${errors.confirmPassword ? "#c0392b" : confirmFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px", display: "flex", alignItems: "center" }}>
                    <input id="confirmPassword" type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined })); }} onFocus={() => setConfirmFocused(true)} onBlur={() => setConfirmFocused(false)} placeholder="Confirm password" autoComplete="new-password" className="reg-input" style={{ flex: 1, background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#281B13", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle confirm password" style={{ background: "none", border: "none", cursor: "pointer", color: "#9e9188", padding: "0 2px", display: "flex", alignItems: "center", flexShrink: 0 }}>
                      {showConfirm ? <EyeClosed /> : <EyeOpen />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p style={{ fontSize: "11px", color: "#c0392b", marginTop: "6px", fontFamily: "'DM Sans', sans-serif" }}>{errors.confirmPassword}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading} className="reg-btn" style={{ width: "100%", backgroundColor: isLoading ? "#c4b9ae" : "#998169", border: "none", padding: "14px 0", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", color: "#F5F1EB", textTransform: "uppercase", cursor: isLoading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
                  {isLoading ? "Creating..." : "Create account"}
                </button>

                <p style={{ fontSize: "12px", fontWeight: 400, color: "#2e2a26", letterSpacing: "0.01em", fontFamily: "'DM Sans', sans-serif" }}>
                  Already have an account?{" "}
                  <Link to="/login" state={{ from: location.state?.from }} style={{ fontSize: "12px", fontWeight: 500, color: "#2e2a26", letterSpacing: "0.04em", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>
                    Log in
                  </Link>
                </p>
              </form>
            </div>

            {/* RIGHT PANEL — 50% */}
            <div
              className="reg-right"
              style={{
                width: "50%",
                flexShrink: 0,
                backgroundColor: "#e8e3dc",
              }}
            >
              <img
                src={EDITORIAL_IMAGE}
                alt="Registration visual"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}