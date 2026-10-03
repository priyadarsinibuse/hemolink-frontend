import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import "./ResetPassword.css";
import logo from "../assets/logo.png.jpeg";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="reset-page">
      <div className="reset-card">

        {/* ================= LOGO ================= */}
        <div className="logo-area">
  <img
    src={logo}
    alt="HEMOLINK"
    className="hemolink-image"
  />
</div>


        {/* ================= TITLE ================= */}
        <div className="title-area">
          <h1>Reset Password</h1>

          <p>
            Enter your new password below. Make sure it's strong
            and secure.
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit}>

          {/* New Password */}
          <div className="field">
            <label htmlFor="password">
              New Password
            </label>

            <div className="input-box">
              <LockKeyhole className="lock-icon" size={22} />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={23} />
                ) : (
                  <Eye size={23} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="field confirm-field">
            <label htmlFor="confirmPassword">
              Confirm New Password
            </label>

            <div className="input-box">
              <LockKeyhole className="lock-icon" size={22} />

              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff size={23} />
                ) : (
                  <Eye size={23} />
                )}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <Link to="/Login" className="reset-btn">
  Reset Password
</Link>
        </form>

        {/* ================= BACK LOGIN ================= */}
        <Link to="/Login" className="back-login">
  <ArrowLeft size={21} strokeWidth={2} />
  <span>Back to Login</span>
</Link>
      </div>
    </div>
  );
}
