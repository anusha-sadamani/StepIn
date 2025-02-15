import React, { useState } from "react";
import "./ResetPassword.css"; // You can reuse or create a new CSS file for styling

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!token || !newPassword) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage(""); // Clear previous messages

      const response = await fetch(
        `http://localhost:8080/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      className="reset-password-container"
      style={{
        background: `url('/pic3.jpg') no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="reset-password-wrapper">
        <div className="reset-password-card">
          <div className="card-content">
            <div className="card-header">
              <img src="logo.png" alt="Logo" className="logo" />
              <p className="card-description">
                Enter your token and new password to reset your password
              </p>
            </div>

            <div className="form-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter your token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="token-input"
                  required
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-input"
                  required
                />
              </div>

              <button
                onClick={handleResetPassword}
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              {message && (
                <div
                  className={`message ${
                    message.includes("Invalid") || message.includes("expired")
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

export default ResetPassword;