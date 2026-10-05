import { useEffect, useState } from 'react';
import { CheckCircle, Calendar } from 'lucide-react';
import { getMyRequests } from '../../api';

const cardStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  padding: '20px',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)',
  marginBottom: '16px',
  gap: '16px',
};

const iconWrap = {
  backgroundColor: 'var(--success-light)',
  padding: '12px',
  borderRadius: '50%',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  fontSize: '13px',
  color: 'var(--text-muted)',
};

const dateStyle = { display: 'flex', alignItems: 'center', gap: '4px' };
const titleStyle = { margin: '0 0 8px 0', fontSize: '16px' };
const headerStyle = { marginBottom: '24px' };
const emptyStyle = { textAlign: 'center', padding: '40px', color: 'var(--text-muted)' };

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const ReceivedDonations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyRequests()
      .then((data) => {
        const accepted = (data.requests || []).filter(
          (r) => String(r.status).toLowerCase() === 'accepted'
        );
        setItems(accepted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const showEmpty = !loading && !error && items.length === 0;

  return (
    <div className="card">
      <div className="card-header" style={headerStyle}>
        <h3>Received Donations</h3>
        <p>Requests accepted by donors</p>
      </div>

      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: '#B91C1C' }}>{error}</p> : null}
      {showEmpty ? <div style={emptyStyle}>No donations received yet.</div> : null}

      <div className="donations-list">
        {items.map((donation) => (
          <div key={donation.id} style={cardStyle}>
            <div style={iconWrap}>
              <CheckCircle size={24} color="#10B981" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={titleStyle}>Donor accepted request for {donation.patientName}</h4>
              <div style={gridStyle}>
                <span><strong>Blood Group:</strong> {donation.bloodGroup}</span>
                <span><strong>Units:</strong> {donation.units} Pint</span>
                <span style={dateStyle}>
                  <Calendar size={14} /> {formatDate(donation.createdAt)}
                </span>
                <span><strong>Location:</strong> {donation.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedDonations;