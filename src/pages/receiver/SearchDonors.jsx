import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Droplet, Send } from 'lucide-react';
import { searchDonors } from '../../api';
import '../../styles/receiver-app.css';

const headerStyle = { marginBottom: '24px' };
const filtersStyle = { display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'flex-end' };
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
};
const rowStyle = { display: 'flex', alignItems: 'center', marginBottom: '16px' };
const avatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#FEE2E2',
  color: '#DE1E25',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  marginRight: '16px',
};
const metaStyle = { fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '12px' };
const metaItem = { display: 'flex', alignItems: 'center', gap: '4px' };

const groups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const SearchDonors = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const runSearch = (cityValue, groupValue) => {
    setLoading(true);
    setError('');
    searchDonors(groupValue, cityValue)
      .then((data) => setDonors(data.donors || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    runSearch('', '');
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    runSearch(city, bloodGroup);
  };

  const showEmpty = !loading && !error && donors.length === 0;

  return (
    <div className="card">
      <div className="card-header" style={headerStyle}>
        <h3>Search Donors</h3>
        <p>Find blood donors in your area</p>
      </div>

      <form className="search-filters" style={filtersStyle} onSubmit={onSubmit}>
        <div className="filter-group" style={{ flex: 1 }}>
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label className="form-label">Blood Group</label>
          <select
            className="form-control"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All Groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
          <Search size={18} /> Search
        </button>
      </form>

      {loading ? <p>Searching donors...</p> : null}
      {error ? <p style={{ color: '#B91C1C' }}>{error}</p> : null}
      {showEmpty ? <p>No donors found. Try a different city or blood group.</p> : null}

      <div className="donors-grid" style={gridStyle}>
        {donors.map((d) => (
          <div key={d.id} className="card" style={{ padding: '20px' }}>
            <div style={rowStyle}>
              <div style={avatarStyle}>{d.name ? d.name[0].toUpperCase() : 'D'}</div>
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{d.name}</h4>
                <div style={metaStyle}>
                  <span style={metaItem}>
                    <Droplet size={12} color="#DE1E25" /> {d.bloodGroup}
                  </span>
                  <span style={metaItem}>
                    <MapPin size={12} /> {d.city || 'Location not set'}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn-primary w-full"
              style={{ width: '100%' }}
              onClick={() => navigate('/receiver/send-request')}
            >
              <Send size={16} /> Request Blood
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDonors;