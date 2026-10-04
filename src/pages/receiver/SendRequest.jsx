import { useState } from 'react';
import { createRequest } from '../../api';

const successStyle = {
  padding: '16px',
  backgroundColor: 'var(--success-light)',
  color: '#047857',
  borderRadius: 'var(--radius-sm)',
  marginBottom: '24px',
};

const errorStyle = {
  padding: '16px',
  backgroundColor: '#FEE2E2',
  color: '#B91C1C',
  borderRadius: 'var(--radius-sm)',
  marginBottom: '24px',
};

const SendRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    patientName: '',
    bloodGroup: '',
    units: '',
    address: '',
    urgency: 'Normal',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createRequest({ ...form, units: Number(form.units) });
      setSubmitted(true);
      setForm({
        patientName: '',
        bloodGroup: '',
        units: '',
        address: '',
        urgency: 'Normal',
      });
      setSelectedFile(null);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>Send Blood Request</h3>
        <p>Fill out the form below to request blood from donors</p>
      </div>

      {submitted && (
        <div style={successStyle}>
          Your request has been sent successfully! Donors can now see it.
        </div>
      )}

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Blood Group Required</label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Units Required (Pints)</label>
            <input
              type="number"
              name="units"
              min="1"
              max="10"
              value={form.units}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
            placeholder="Enter the address where blood is needed"
          ></textarea>
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
            Optional. Document upload will be available in the next phase.
          </small>
          {selectedFile && (
            <small style={{ color: 'var(--primary)', display: 'block', marginTop: '4px' }}>
              Selected: {selectedFile.name}
            </small>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Urgency</label>
          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="Normal">Normal (Within 24-48 hours)</option>
            <option value="Urgent">Urgent (Within 12-24 hours)</option>
            <option value="Immediate">Immediate (Emergency)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
          style={{ width: '100%', marginTop: '16px' }}
        >
          {loading ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default SendRequest;