import { CheckCircle, Calendar } from 'lucide-react';

const ReceivedDonations = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>Received Donations</h3>
        <p>History of blood donations you have received</p>
      </div>

      <div className="donations-list">
        {[
          { name: 'Priya Nair', bg: 'O+', date: 'August 8, 2026', units: 1, hospital: 'City General Hospital' },
        ].map((donation, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', padding: '20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '16px', gap: '16px' }}>
            <div style={{ backgroundColor: 'var(--success-light)', padding: '12px', borderRadius: '50%' }}>
              <CheckCircle size={24} color="#10B981" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Donation from {donation.name}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span><strong>Blood Group:</strong> {donation.bg}</span>
                <span><strong>Units:</strong> {donation.units} Pint</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {donation.date}</span>
                <span><strong>Location:</strong> {donation.hospital}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder if empty */}
        {/* <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No donations received yet.</div> */}
      </div>
    </div>
  );
};

export default ReceivedDonations;
