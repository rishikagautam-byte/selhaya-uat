import { type FormEvent, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const EDITORIAL_IMAGE = "/forgot.png";

export default function ResetPage() {
  const { resetPassword, isLoading, authError, clearAuthError } = useUser();
  const navigate = useNavigate();
  const { id, token } = useParams<{ id: string; token: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    clearAuthError();
    if (!id || !token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalError("Invalid or missing password reset link. Please request a new password reset email.");
    }
  }, [id, token, clearAuthError]);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authError) clearAuthError();
    setLocalError("");
    setSuccessMsg("");

    if (!id || !token) {
      setLocalError("Invalid password reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setLocalError("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (password.length < 5) {
      setLocalError("Password must be at least 5 characters long.");
      return;
    }

    try {
      await resetPassword(id, token, password);
      setSuccessMsg("Your password has been reset successfully. Redirecting to profile...");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.log("error", err);
      alert("Error resetting password. Please try again.");
    }
  };

  const displayError = localError || authError;

  return (
    <>
      <style>{`
        .auth-page, .auth-page * { box-sizing: border-box; margin: 0; padding: 0; }
        .login-input::placeholder { color: #b0a89e; font-size: 14px; font-weight: 400;}
        .login-input:focus { outline: none; }
        .login-btn { transition: background-color 0.25s ease, letter-spacing 0.25s ease; }
        .login-btn:hover:not(:disabled) { background-color: #c4b9ae !important;}
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
                  color: "#2e2a26",
                  textTransform: "uppercase",
                  marginBottom: "36px",
                  lineHeight: 1.2,
                }}
              >
                Reset your Password
              </h5>

              <form onSubmit={handleReset} style={{ width: "100%", maxWidth: "420px" }}>
                {displayError && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fcebe8", border: "1px solid #c0392b", color: "#c0392b", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                    {displayError}
                  </div>
                )}
                {successMsg && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#e8fcf0", border: "1px solid #27ae60", color: "#27ae60", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                    {successMsg}
                  </div>
                )}

                {/* Only show inputs if we have id and token */}
                {id && token ? (
                  <>
                    <div style={{ marginBottom: "28px" }}>
                      <div className="underline-field" style={{ borderBottom: `1px solid ${passwordFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px" }}>
                        <input
                          id="password" type="password" value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)}
                          placeholder="New Password" required className="login-input"
                          style={{ width: "100%", background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#2e2a26", fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                      <div className="underline-field" style={{ borderBottom: `1px solid ${confirmPasswordFocused ? "#7a6e65" : "#c9c1b9"}`, paddingBottom: "8px" }}>
                        <input
                          id="confirmPassword" type="password" value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onFocus={() => setConfirmPasswordFocused(true)} onBlur={() => setConfirmPasswordFocused(false)}
                          placeholder="Confirm Password" required className="login-input"
                          style={{ width: "100%", background: "transparent", border: "none", fontSize: "14px", fontWeight: 400, color: "#2e2a26", fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading || !password || !confirmPassword} className="login-btn" style={{ width: "100%", backgroundColor: isLoading || !password || !confirmPassword ? "#c4b9ae" : "#998169", border: "none", padding: "14px 0", fontSize: "11px", fontWeight: 600, color: "#F5F1EB", textTransform: "uppercase", cursor: isLoading || !password || !confirmPassword ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </button>
                  </>
                ) : (
                  <div style={{ marginBottom: "28px" }}>
                    <Link to="/forgot" style={{ display: "inline-block", backgroundColor: "#998169", border: "none", padding: "14px 24px", fontSize: "11px", fontWeight: 600, color: "#F5F1EB", textTransform: "uppercase", textDecoration: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Request New Link
                    </Link>
                  </div>
                )}

                <Link to="/login" style={{ fontSize: "12px", fontWeight: 500, color: "#2e2a26", textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer" }}>
                  Back to Log in
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
