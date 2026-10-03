import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Droplet, MapPin, ShieldPlus } from 'lucide-react';
import '../styles/receiver-app.css';
import './ReceiverRegister.css';

const ReceiverRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    dateOfBirth: '',
    gender: '',
    city: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo navigation for the frontend: details are not required yet.
    // Backend validation and account creation will be connected later.
    localStorage.setItem('hemolink_receiver', JSON.stringify({
      fullName: formData.fullName.trim() || 'Receiver'
    }));
    navigate('/receiver/dashboard');
  };

  return (
    <div className="register-page">
      <aside className="register-brand-panel">
        <div className="brand-logo-wrap">
          <img src="/helpblood.png" alt="HemoLink Logo" className="register-brand-logo" />
        </div>
        <div className="brand-copy">
          <h1>Save Lives,<br /><span>Be a Hero</span></h1>
        </div>
        <div className="brand-benefits">
          <div className="brand-benefit">
            <div className="benefit-icon"><Droplet size={21} /></div>
            <div><h3>Receive Blood</h3></div>
          </div>
          <div className="brand-benefit">
            <div className="benefit-icon"><MapPin size={21} /></div>
            <div><h3>Connect Nearby</h3></div>
          </div>
          <div className="brand-benefit">
            <div className="benefit-icon"><ShieldPlus size={21} /></div>
            <div><h3>Healing Together</h3></div>
          </div>
        </div>
      </aside>
      <main className="register-container">
        <div className="register-card card">
          <div className="register-header">
            <div>
              <p className="tagline">HemoLink • Request. Receive. Save Lives.</p>
              <h2 className="register-title">Create Receiver Account</h2>
              <p className="register-subtitle">Complete your details to connect with blood donors when you need them.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
                {errors.fullName && <div className="form-error">{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="1234567890" />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group *</label>
                <select name="bloodGroup" className="form-control" value={formData.bloodGroup} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                </select>
                {errors.bloodGroup && <div className="form-error">{errors.bloodGroup}</div>}
              </div>

              {/* PASSWORD */}
<div className="form-group">
  <label className="form-label">Password *</label>

  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      className="form-control password-field"
      value={formData.password}
      onChange={handleChange}
    />

    <button
      type="button"
      className="password-eye"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label="Show or hide password"
    >
      {showPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  </div>

  {errors.password && (
    <div className="form-error">{errors.password}</div>
  )}
</div>


{/* CONFIRM PASSWORD */}
<div className="form-group">
  <label className="form-label">Confirm Password *</label>

  <div className="password-wrapper">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      className="form-control password-field"
      value={formData.confirmPassword}
      onChange={handleChange}
    />

    <button
      type="button"
      className="password-eye"
      onClick={() =>
        setShowConfirmPassword((prev) => !prev)
      }
      aria-label="Show or hide confirm password"
    >
      {showConfirmPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  </div>

  {errors.confirmPassword && (
    <div className="form-error">
      {errors.confirmPassword}
    </div>
  )}
</div>

              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <input type="date" name="dateOfBirth" className="form-control" value={formData.dateOfBirth} onChange={handleChange} />
                {errors.dateOfBirth && <div className="form-error">{errors.dateOfBirth}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option>
                  <option value="Other">Other</option><option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">City / Location *</label>
                <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} placeholder="e.g. New York" />
                {errors.city && <div className="form-error">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <textarea name="address" className="form-control address-control" rows="2" value={formData.address} onChange={handleChange} placeholder="Enter your full address"></textarea>
                {errors.address && <div className="form-error">{errors.address}</div>}
              </div>
            </div>

            <div className="register-actions">
              <button type="submit" className="btn-primary w-full">Continue to Dashboard</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ReceiverRegister;