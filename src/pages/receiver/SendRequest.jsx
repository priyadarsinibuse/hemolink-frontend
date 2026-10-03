import { useState } from 'react';

const SendRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>Send Blood Request</h3>
        <p>Fill out the form below to request blood from donors</p>
      </div>

      {submitted && (
        <div style={{ padding: '16px', backgroundColor: 'var(--success-light)', color: '#047857', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }}>
          Your request has been prepared successfully! These details and the attached document will be sent to suitable donors by email for their review and approval once the backend is connected.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Patient Name</label>
          <input type="text" className="form-control" required />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Blood Group Required</label>
            <select className="form-control" required>
              <option value="">Select</option>
              <option>A+</option><option>O+</option><option>B+</option><option>AB+</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Units Required (Pints)</label>
            <input type="number" min="1" max="10" className="form-control" required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea className="form-control" rows="3" required placeholder="Enter the address where blood is needed"></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Supporting Image / Document</label>
          <input
            type="file"
            className="form-control"
            accept="image/*,.pdf"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
          <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
            Upload a relevant prescription, request letter, or image. Your request details will be shared with donors by email for review before they approve.
          </small>
          {selectedFile && <small style={{ color: 'var(--primary)', display: 'block', marginTop: '4px' }}>Selected: {selectedFile.name}</small>}
        </div>

        <div className="form-group">
          <label className="form-label">Urgency</label>
          <select className="form-control" required>
            <option value="Normal">Normal (Within 24-48 hours)</option>
            <option value="Urgent">Urgent (Within 12-24 hours)</option>
            <option value="Immediate">Immediate (Emergency)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full" style={{ width: '100%', marginTop: '16px' }}>Submit Request</button>
      </form>
    </div>
  );
};

export default SendRequest;
