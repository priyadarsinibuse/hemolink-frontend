
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";
import "./AuthPage.css";
import logo from "../assets/logo.png.jpeg";
import { registerUser } from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      return setError("Please fill all fields");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      const data = await registerUser(name.trim(), email.trim(), password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* Logo */}
        <div className="signup-logo">
          <img src={logo} alt="HEMOLINK Logo" />
        </div>

        {/* Heading */}
        <h1>Create Your Account</h1>

        <p className="signup-subtitle">Join HEMOLINK and help save lives</p>

        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-box">
            <User size={21} />
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
          <p className="password-hint">At least 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-box">
            <LockKeyhole size={21} />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#e11d48", fontSize: "14px", margin: "8px 0" }}>
            {error}
          </p>
        )}

        {/* Sign Up Button */}
        <button
          type="button"
          className="signup-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          <span>{loading ? "Please wait..." : "Sign Up"}</span>
        </button>

        {/* Divider */}
        <div className="or-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        {/* Login */}
        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}