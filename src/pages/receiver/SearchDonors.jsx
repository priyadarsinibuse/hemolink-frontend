import { Search, MapPin, Droplet, Send } from 'lucide-react';
import '../../styles/receiver-app.css';

const SearchDonors = () => {
  return (
    <div className="card">
      <div className="card-header" style={{ marginBottom: '24px' }}>
        <h3>Search Donors</h3>
        <p>Find blood donors in your area</p>
      </div>

      <div className="search-filters" style={{ display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'flex-end' }}>
        <div className="filter-group" style={{ flex: 1 }}>
          <label className="form-label">Location</label>
          <input type="text" className="form-control" placeholder="Enter city or zip code" />
        </div>
        <div className="filter-group">
          <label className="form-label">Blood Group</label>
          <select className="form-control">
            <option>All Groups</option>
            <option>A+</option><option>O+</option><option>B+</option><option>AB+</option>
          </select>
        </div>
        <button className="btn-primary" style={{ padding: '12px 24px' }}><Search size={18} /> Search</button>
      </div>

      <div className="donors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEE2E2', color: '#DE1E25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', marginRight: '16px' }}>
                D
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>Donor {i}</h4>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Droplet size={12} color="#DE1E25" /> O+</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {i} km away</span>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full" style={{ width: '100%' }}><Send size={16} /> Request Blood</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDonors;
