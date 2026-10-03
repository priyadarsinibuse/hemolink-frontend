import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Send, 
  FileText, 
  Droplet, 
  User, 
  HelpCircle, 
  Settings,
  PhoneCall
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/receiver/dashboard', label: 'Dashboard', icon: Home },
  { path: '/receiver/search-donors', label: 'Search Donors', icon: Search },
  { path: '/receiver/send-request', label: 'Send Request', icon: Send },
  { path: '/receiver/my-requests', label: 'My Requests', icon: FileText },
  { path: '/receiver/received-donations', label: 'Received Donations', icon: Droplet },
  { path: '/receiver/profile', label: 'My Profile', icon: User },
  { path: '/register', label: 'Donate Blood', icon: Droplet },
  { path: '/receiver/help', label: 'Help & Support', icon: HelpCircle },
  { path: '/receiver/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/helpblood.png" alt="HemoLink Logo" style={{ width: '150px', height: 'auto', maxHeight: '80px', objectFit: 'contain' }} />
        {/* <div className="logo-icon">
          <img src="/home/user/Desktop/reciever dashbaord/my-app/dist/assets/helpblood.png"></img>
        </div>
        <div className="logo-text">
          <h1>HemoLink</h1>
          <p>Request. Receive. Save Lives.</p>
        </div> */}
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* <div className="sidebar-footer">
        <div className="emergency-card">
          <div className="emergency-header">
            <PhoneCall size={18} color="#DE1E25" />
            <span>Emergency Need?</span>
          </div>
          <p>Call for immediate help</p>
          <strong>1800-123-4567</strong>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
