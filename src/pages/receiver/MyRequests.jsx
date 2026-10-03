import { Check, X, Clock } from 'lucide-react';

const MyRequests = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>My Blood Requests</h3>
        <p>Track the status of your sent requests</p>
      </div>

      <div className="requests-list">
        {[
          { name: 'Amit Verma', bg: 'O+', time: '2 hours ago', status: 'Pending', initial: 'A' },
          { name: 'Priya Nair', bg: 'O+', time: '1 day ago', status: 'Accepted', initial: 'P', isAccepted: true },
          { name: 'Sandeep Kumar', bg: 'O+', time: '2 days ago', status: 'Declined', initial: 'S', isDeclined: true },
        ].map((req, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid var(--border-color)', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
              {req.isAccepted ? <Check size={20} color="#10B981" /> : req.isDeclined ? <X size={20} color="#EF4444" /> : <Clock size={20} color="#6B7280" />}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px' }}>Request to {req.name}</h4>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Blood Group: {req.bg} | Sent: {req.time}</span>
            </div>
            <div>
              <span className={`badge ${req.status.toLowerCase()}`} style={{ padding: '6px 12px', fontSize: '13px' }}>{req.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
