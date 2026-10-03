import { useState, useEffect } from "react";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png.jpeg";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    alert("Reset link has been sent to your email!");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <img src={logo} alt="HemoLink Logo" className="forgot-logo" />
        <h2>Forgot Password?</h2>
        <p className="forgot-text">
          Don't worry! Enter your registered email address
          and we'll help to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <div className="email-box">
            <FiMail className="mail-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Link to="/Reset-Password" className="reset-btn">
            Reset
          </Link>
        </form>
        <div className="back-login">
          <FiArrowLeft />
          <Link to="/Login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;