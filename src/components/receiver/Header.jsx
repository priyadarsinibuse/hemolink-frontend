import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard': return 'Receiver Dashboard';
    case '/search-donors': return 'Search Donors';
    case '/send-request': return 'Send Request';
    case '/my-requests': return 'My Requests';
    case '/received-donations': return 'Received Donations';
    case '/profile': return 'My Profile';
    case '/help': return 'Help & Support';
    case '/settings': return 'Settings';
    default: return 'HemoLink';
  }
};

const Header = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  
  // Get user from local storage
  const userData = JSON.parse(localStorage.getItem('hemolink_receiver') || '{}');
  const userName = userData.fullName || 'User';

  return (
    <header className="header">
      <div className="header-title">
        <h2>{title}</h2>
        {location.pathname === '/dashboard' && (
          <p className="welcome-text">Welcome, <strong>{userName}</strong> 👋</p>
        )}
      </div>

      <div className="header-actions">
        
        <div className="user-profile">
          <div className="avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">Receiver</span>
          </div>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
