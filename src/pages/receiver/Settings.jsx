import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('hemolink_receiver');
    navigate('/Login');
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>Account Settings</h3>
        <p>Manage your account preferences</p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '10px', borderRadius: '50%' }}>
              <Bell size={20} color="var(--primary)" />
            </div>
            <div>
              <h5 style={{ fontSize: '15px', marginBottom: '2px' }}>Notifications</h5>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Email and SMS alerts</p>
            </div>
          </div>
          <button className="btn-outline">Manage</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: 'var(--primary-light)', padding: '10px', borderRadius: '50%' }}>
              <Shield size={20} color="var(--primary)" />
            </div>
            <div>
              <h5 style={{ fontSize: '15px', marginBottom: '2px' }}>Privacy & Security</h5>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Password and data</p>
            </div>
          </div>
          <button className="btn-outline">Manage</button>
        </div>
        
      </div>

      <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)' }}>
          <div>
            <h5 style={{ fontSize: '15px', marginBottom: '2px' }}>Log Out</h5>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Sign out of your account on this device</p>
          </div>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: '#DC2626', color: 'white', padding: '10px 16px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
