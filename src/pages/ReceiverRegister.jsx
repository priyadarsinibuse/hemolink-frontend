
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, ShieldPlus } from 'lucide-react';
import '../styles/receiver-app.css';
import './ReceiverRegister.css';
import { saveReceiverProfile } from '../api';

const ReceiverRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    let u = null;
    try {
      u = JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      u = null;
    }
    return {
      fullName: u?.name || '',
      email: u?.email || '',
      phone: '',
      bloodGroup: '',
      dateOfBirth: '',
      gender: '',
      city: '',
      address: '',
    };
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.trim().length < 10) newErrors.phone = 'Valid phone number is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate() || saving) return;

    if (!localStorage.getItem('token')) {
      return setApiError('Please sign up or log in first.');
    }

    try {
      setSaving(true);
      const data = await saveReceiverProfile({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        bloodGroup: formData.bloodGroup,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        city: formData.city.trim(),
        address: formData.address.trim(),
      });
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem(
        'hemolink_receiver',
        JSON.stringify({ fullName: formData.fullName.trim() })
      );
      navigate('/receiver/dashboard');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
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
              <h2 className="register-title">Receiver Details</h2>
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
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-control" value={formData.email} readOnly placeholder="john@example.com" />
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
                <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} placeholder="e.g. Visakhapatnam" />
                {errors.city && <div className="form-error">{errors.city}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <textarea name="address" className="form-control address-control" rows="2" value={formData.address} onChange={handleChange} placeholder="Enter your full address"></textarea>
                {errors.address && <div className="form-error">{errors.address}</div>}
              </div>
            </div>

            {apiError && <div className="form-error" style={{ marginBottom: '12px' }}>{apiError}</div>}

            <div className="register-actions">
              <button type="submit" className="btn-primary w-full" disabled={saving}>
                {saving ? 'Saving...' : 'Continue to Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ReceiverRegister;