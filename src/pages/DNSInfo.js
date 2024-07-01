import React, { useState } from 'react';
import axios from 'axios';
import './DNSInfo.css'; // Import custom CSS

const DNSInfo = () => {
  const [domain, setDomain] = useState('');
  const [dnsInfo, setDnsInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setDomain(e.target.value);
  };

  const handleSearch = async () => {
    if (!domain) {
      setError('Please enter a domain');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.apilayer.com/dns_lookup/api/a/${domain}`, {
        headers: {
          'apikey': 'bqwhB6JrNxfyfK2qza5ESaNRojl8pZjj'
        }
      });
      setDnsInfo(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching DNS info. Please make sure the domain is valid.');
      setLoading(false);
    }
  };

  const renderARecords = () => {
    if (!dnsInfo || !dnsInfo.results) return null;

    return (
      <div className="a-records">
        <h2 className="text-center mb-4">A Records for: <span className="domain-name">{dnsInfo.domain}</span></h2>
        <ul className="list-group">
          {dnsInfo.results.map((record, index) => (
            <li key={index} className="list-group-item">{record.ipAddress}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">DNS Information</h1>
      <div className="search-bar my-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter domain" 
          value={domain}
          onChange={handleInputChange}
        />
        <button 
          className="btn btn-primary mt-2" 
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div className="text-danger text-center mt-3">{error}</div>}
      {dnsInfo && renderARecords()}
    </div>
  );
};

export default DNSInfo;
