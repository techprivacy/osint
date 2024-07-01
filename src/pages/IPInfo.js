import React, { useState } from 'react';
import axios from 'axios';
import './IPInfo.css'; // Import custom CSS

const IPInfo = () => {
  const [ip, setIp] = useState('');
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setIp(e.target.value);
  };

  const handleSearch = async () => {
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/json?token=7f94c708942259`);
      setIpInfo(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching IP info. Please make sure the IP address is valid.');
      setLoading(false);
    }
  };

  const renderTableRow = (label, value) => {
    if (!value) return null;
    return (
      <tr>
        <th>{label}</th>
        <td>{value}</td>
      </tr>
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">IP Information</h1>
      <div className="search-bar my-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter IP address" 
          value={ip}
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
      {ipInfo && (
        <div className="ip-info-card p-4 my-4">
          <h2 className="text-center mb-4">IP Details for: <span className="ip-address">{ipInfo.ip}</span></h2>
          <table className="table table-bordered">
            <tbody>
              {renderTableRow('Hostname', ipInfo.hostname)}
              {renderTableRow('City', ipInfo.city)}
              {renderTableRow('Region', ipInfo.region)}
              {renderTableRow('Country', ipInfo.country)}
              {renderTableRow('Location', ipInfo.loc)}
              {renderTableRow('Organization', ipInfo.org)}
              {renderTableRow('Timezone', ipInfo.timezone)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IPInfo;
