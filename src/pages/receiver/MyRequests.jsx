import { useEffect, useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { getMyRequests } from '../../api';

const norm = (s) => (s || '').toLowerCase();

const timeAgo = (iso) => {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return mins + ' min ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + ' hr ago';
  const days = Math.floor(hrs / 24);
  return days + ' day(s) ago';
};

const label = (status) => {
  const s = norm(status);
  if (s === 'accepted') return 'Accepted';
  if (s === 'declined' || s === 'rejected' || s === 'reject') return 'Declined';
  return 'Pending';
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  borderBottom: '1px solid var(--border-color)',
  gap: '16px',
};

const iconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: 'var(--bg-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--border-color)',
};

const headerStyle = { marginBottom: '24px' };
const errorStyle = { color: '#B91C1C' };
const titleStyle = { margin: '0 0 4px 0', fontSize: '15px' };
const subStyle = { fontSize: '13px', color: 'var(--text-muted)' };
const badgeStyle = { padding: '6px 12px', fontSize: '13px' };

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyRequests()
      .then((data) => setRequests(data.requests || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const showEmpty = !loading && !error && requests.length === 0;

  return (
    <div className="card">
      <div className="card-header" style={headerStyle}>
        <h3>My Blood Requests</h3>
        <p>Track the status of your sent requests</p>
      </div>

      {loading ? <p>Loading your requests...</p> : null}

      {error ? <p style={errorStyle}>{error}</p> : null}

      {showEmpty ? <p>You have not sent any requests yet.</p> : null}

      <div className="requests-list">
        {requests.map((req) => {
          const status = label(req.status);
          const when = timeAgo(req.createdAt || req.postedAt);
          return (
            <div key={req.id} style={rowStyle}>
              <div style={iconStyle}>
                {status === 'Accepted' ? (
                  <Check size={20} color="#10B981" />
                ) : status === 'Declined' ? (
                  <X size={20} color="#EF4444" />
                ) : (
                  <Clock size={20} color="#6B7280" />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={titleStyle}>Request for {req.patientName}</h4>
                <span style={subStyle}>
                  Blood Group: {req.bloodGroup} | Units: {req.units} | {req.urgency} | Sent: {when}
                </span>
              </div>
              <div>
                <span className={'badge ' + status.toLowerCase()} style={badgeStyle}>
                  {status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRequests;