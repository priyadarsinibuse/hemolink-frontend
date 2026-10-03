import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import "./AuthPage.css";
import logo from "../assets/logo.png.jpeg";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* Logo */}
        <div className="signup-logo">
          <img src={logo} alt="HEMOLINK Logo" />
        </div>

        {/* Heading */}
        <h1>Create Your Account</h1>

        <p className="signup-subtitle">
          Join HEMOLINK and help save lives
        </p>

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>

          <div className="input-box">
            <User size={21} />

            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>

          <div className="input-box">
            <Mail size={21} />

            <input
              type="email"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>

          <div className="input-box">
            <LockKeyhole size={21} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={21} />
              ) : (
                <Eye size={21} />
              )}
            </button>
          </div>

          <p className="password-hint">
            At least 8 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>

          <div className="input-box">
            <LockKeyhole size={21} />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <EyeOff size={21} />
              ) : (
                <Eye size={21} />
              )}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <Link to="/login" className="signup-btn">
          <span>Sign Up</span>
          
        </Link>

        {/* Divider */}
        <div className="or-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        {/* Login */}
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}