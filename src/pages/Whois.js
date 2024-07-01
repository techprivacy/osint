import React, { useState } from 'react';
import axios from 'axios';
import './Whois.css'; // Import custom CSS

const Whois = () => {
  const [domain, setDomain] = useState('');
  const [whoisInfo, setWhoisInfo] = useState(null);
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
      const response = await axios.get(`https://api.apilayer.com/whois/query?domain=${domain}`, {
        headers: {
          'apikey': 'bqwhB6JrNxfyfK2qza5ESaNRojl8pZjj'
        }
      });
      setWhoisInfo(response.data.result);
      setLoading(false);
    } catch (err) {
      setError('Error fetching WHOIS info. Please make sure the domain is valid.');
      setLoading(false);
    }
  };

  const renderTableRow = (label, value) => {
    if (!value) return null;
    return (
      <tr key={label}>
        <th>{label}</th>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">WHOIS Information</h1>
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
      {whoisInfo && (
        <div className="whois-info-card p-4 my-4">
          <h2 className="text-center mb-4">WHOIS Records for: <span className="domain-name">{whoisInfo.domain_name}</span></h2>
          <table className="table table-bordered">
            <tbody>
              {renderTableRow('Domain Name', whoisInfo.domain_name)}
              {renderTableRow('Registrar', whoisInfo.registrar)}
              {renderTableRow('Creation Date', whoisInfo.creation_date)}
              {renderTableRow('Expiration Date', whoisInfo.expiration_date)}
              {renderTableRow('Updated Date', whoisInfo.updated_date)}
              {renderTableRow('Status', whoisInfo.status.join(', '))}
              {renderTableRow('Name Servers', whoisInfo.name_servers.join(', '))}
              {renderTableRow('Emails', whoisInfo.emails)}
              {renderTableRow('DNSSEC', whoisInfo.dnssec)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Whois;
