import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import logo from "../assets/logo.png.jpeg";
import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      return setError("Please enter email and password");
    }

    try {
      setLoading(true);
      const data = await loginUser(email.trim(), password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/select-role");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* WHITE LOGIN CARD */}
      <div className="login-card">
        {/* LOGO */}
        <img src={logo} alt="HemoLink Logo" className="login-logo" />

        {/* HEADING */}
        <h1>Welcome Back!</h1>

        <p className="login-subtitle">Please log in to your account</p>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="login-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Show or hide password"
              >
                {showPassword ? (
                  /* EYE OFF */
                  <svg viewBox="0 0 24 24" className="eye-icon">
                    <path
                      d="M3 3l18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M9.9 4.3A10.8 10.8 0 0 1 12 4c5.2 0 8.7 4 9.8 6-.8 1.5-2.1 3-3.7 4.1M6.1 6.1C4.4 7.3 3.1 8.8 2.2 10c1.1 2 4.6 6 9.8 6 1 0 2-.2 2.8-.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  /* EYE */
                  <svg viewBox="0 0 24 24" className="eye-icon">
                    <path
                      d="M2.2 12s3.5-6 9.8-6 9.8 6 9.8 6-3.5 6-9.8 6-9.8-6-9.8-6z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />

              <span>Remember Me</span>
            </label>

            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          {/* ERROR */}
          {error && (
            <p style={{ color: "#e11d48", fontSize: "14px", margin: "8px 0" }}>
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Please wait..." : "Log In"}
          </button>
        </form>

        {/* SIGN UP */}
        <p className="signup-text">
          Don't have an account? <a href="/">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;