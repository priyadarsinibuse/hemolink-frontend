import { useState, useEffect } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    city: '',
    address: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('hemolink_receiver') || '{}');
    if (data) {
      setFormData({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        bloodGroup: data.bloodGroup || '',
        city: data.city || '',
        address: data.address || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('hemolink_receiver') || '{}');
    const updatedData = { ...existingData, ...formData };
    localStorage.setItem('hemolink_receiver', JSON.stringify(updatedData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>My Profile</h3>
        <p>Update your personal information</p>
      </div>

      {saved && (
        <div style={{ padding: '16px', backgroundColor: 'var(--success-light)', color: '#047857', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }}>
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <input type="text" className="form-control" value={formData.bloodGroup} disabled style={{ backgroundColor: 'var(--bg-color)' }} />
          <small style={{ color: 'var(--text-muted)' }}>Blood group cannot be changed.</small>
        </div>

        <div className="form-group">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea name="address" className="form-control" rows="3" value={formData.address} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
