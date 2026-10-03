import { Droplet, Users, Clock, CheckCircle, Search, MapPin, Send, Check, X, Bell } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem('hemolink_receiver') || '{}');
  const bloodGroup = userData.bloodGroup || 'O+';
  const bloodType = bloodGroup.includes('+') ? 'Positive' : 'Negative';

  return (
    <div className="dashboard-grid">
      <div className="dashboard-main">
        {/* Stat Cards */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon-wrapper blood-group">
              <Droplet size={24} color="#DE1E25" fill="#DE1E25" />
            </div>
            <div className="stat-info">
              <span className="stat-label">My Blood Group</span>
              <strong className="stat-value">{bloodGroup}</strong>
              <span className="stat-sub">{bloodType}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper active-requests">
              <Users size={24} color="#8B5CF6" fill="#8B5CF6" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Active Requests</span>
              <strong className="stat-value">2</strong>
              <a href="#" className="stat-link">View all</a>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper accepted">
              <Clock size={24} color="#F59E0B" fill="#F59E0B" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Requests Accepted</span>
              <strong className="stat-value">1</strong>
              <span className="stat-sub">Total accepted</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper received">
              <CheckCircle size={24} color="#10B981" fill="#10B981" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Donations Received</span>
              <strong className="stat-value">1</strong>
              <span className="stat-sub">Total received</span>
            </div>
          </div>
        </div>

        {/* Find Donors */}
        <div className="card find-donors-card">
          <div className="card-header">
            <h3>Find Donors</h3>
            <p>Search donors by blood group and location</p>
          </div>
          <div className="search-filters">
            <div className="filter-group">
              <label>Blood Group</label>
              <select className="form-control">
                <option>{bloodGroup}</option>
                <option>A+</option>
                <option>B+</option>
                <option>AB+</option>
              </select>
            </div>
            <div className="filter-group location-group">
              <label>Location</label>
              <input type="text" className="form-control" placeholder="Enter city or area" />
            </div>
            <div className="filter-group">
              <label>Availability</label>
              <select className="form-control">
                <option>Any</option>
                <option>Available</option>
                <option>Busy</option>
              </select>
            </div>
            <div className="filter-action">
              <button className="btn-primary search-btn">Search</button>
            </div>
          </div>
        </div>

        {/* Recommended Donors */}
        <div className="card recommended-donors-card">
          <div className="card-header">
            <h3>Recommended Donors</h3>
            <p>Donors with matching blood group and availability</p>
          </div>
          
          <div className="donors-list">
            {[
              { name: 'Amit Verma', bg: 'O+', dist: '2.3 km away', status: 'Available', initial: 'A', color: '#FEE2E2', text: '#DE1E25' },
              { name: 'Priya Nair', bg: 'O+', dist: '4.7 km away', status: 'Available', initial: 'P', color: '#F3E8FF', text: '#7E22CE' },
              { name: 'Sandeep Kumar', bg: 'O+', dist: '6.1 km away', status: 'Available', initial: 'S', color: '#DBEAFE', text: '#1D4ED8' },
              { name: 'Rohit Singh', bg: 'O+', dist: '8.9 km away', status: 'Busy', initial: 'R', color: '#D1FAE5', text: '#047857' },
            ].map((donor, idx) => (
              <div key={idx} className="donor-row">
                <div className="donor-avatar" style={{ backgroundColor: donor.color, color: donor.text }}>
                  {donor.initial}
                </div>
                <div className="donor-info">
                  <h4>{donor.name}</h4>
                  <div className="donor-meta">
                    <span className="blood-badge"><Droplet size={10} color="#DE1E25" fill="#DE1E25" /> {donor.bg}</span>
                    <span className="distance"><MapPin size={12} /> {donor.dist}</span>
                  </div>
                </div>
                <div className="donor-status">
                  {donor.status === 'Available' ? (
                    <span className="status-available"><span className="dot green"></span> Available</span>
                  ) : (
                    <span className="status-busy"><Clock size={12} className="icon-orange" /> Busy</span>
                  )}
                </div>
                <div className="donor-actions">
                  <button className="btn-outline">View Profile</button>
                  <button className="btn-primary"><Send size={14} /> Send Request</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer-link">
            <a href="#">View all donors</a>
          </div>
        </div>
      </div>

      <div className="dashboard-sidebar">
        {/* My Requests */}
        <div className="card my-requests-card">
          <div className="card-header-flex">
            <h3>My Requests</h3>
            <a href="#" className="view-all-link">View all</a>
          </div>
          <div className="requests-list">
            {[
              { name: 'Amit Verma', bg: 'O+', time: '2 hours ago', status: 'Pending', initial: 'A' },
              { name: 'Priya Nair', bg: 'O+', time: '1 day ago', status: 'Accepted', initial: 'P', isAccepted: true },
              { name: 'Sandeep Kumar', bg: 'O+', time: '2 days ago', status: 'Declined', initial: 'S', isDeclined: true },
              { name: 'Rohit Singh', bg: 'O+', time: '3 days ago', status: 'Pending', initial: 'R' },
            ].map((req, idx) => (
              <div key={idx} className="request-row">
                <div className="req-avatar">
                  {req.isAccepted ? <Check size={16} color="#10B981" /> : req.isDeclined ? <X size={16} color="#EF4444" /> : <Clock size={16} color="#6B7280" />}
                </div>
                <div className="req-info">
                  <h4>Request to {req.name}</h4>
                  <span>{req.bg} <br/> {req.time}</span>
                </div>
                <div className="req-status">
                  <span className={`badge ${req.status.toLowerCase()}`}>{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card recent-activity-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            <div className="activity-row">
              <div className="activity-icon success">
                <CheckCircle size={16} color="white" />
              </div>
              <div className="activity-info">
                <p>Donation received from Priya Nair</p>
                <span>1 day ago</span>
              </div>
            </div>
            <div className="activity-row">
              <div className="activity-icon primary">
                <Send size={14} color="white" />
              </div>
              <div className="activity-info">
                <p>Request sent to Amit Verma</p>
                <span>2 hours ago</span>
              </div>
            </div>
            <div className="activity-row">
              <div className="activity-icon warning">
                <Clock size={16} color="white" />
              </div>
              <div className="activity-info">
                <p>Request pending with Rohit Singh</p>
                <span>3 days ago</span>
              </div>
            </div>
          </div>
          <div className="card-footer-link">
            <a href="#">View all activity</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
