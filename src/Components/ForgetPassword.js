import React, { useState } from "react";
import "./ForgetPassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleForgotPassword = async () => {
    if (!isVerified) {
      setMessage("Please verify that you're not a robot");
      return;
    }

    try {
      setLoading(true);
      setMessage(""); // Clear previous messages

      // Send the email as a query parameter
      const response = await fetch(
        `http://localhost:8080/auth/forgot-password?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Read response as plain text instead of JSON
      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Something went wrong");
      }

      setMessage(data); // Show success message
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="forgot-password-container"
      style={{
        background: `url('/pic3.jpg') no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="forgot-password-wrapper">
        <div className="forgot-password-card">
          <div className="card-content">
            <div className="card-header">
              <img src="logo.png" alt="Logo" className="logo" />
              <p className="card-description">
                Enter your email to receive a password reset link
              </p>
            </div>

            <div className="form-container">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  required
                />
                <svg
                  className="email-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0z"
                  />
                </svg>
              </div>

              <div className="captcha-wrapper">
                <label className="captcha-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="captcha-checkbox"
                  />
                  <span className="captcha-checkbox-custom"></span>
                </label>
                <div className="captcha-text">
                  <span>I'm not a robot</span>
                  <div className="captcha-logo">
                    <img
                      src="recaptcha-logo.png"
                      alt="reCAPTCHA"
                      className="recaptcha-logo"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <span className="loading-content">
                    <svg
                      className="spinner"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="spinner-circle"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="spinner-path"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              {message && (
                <div
                  className={`message ${
                    message.includes("not found") || message.includes("robot")
                      ? "error"
                      : "success"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
