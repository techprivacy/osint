import React, { useState } from 'react';
import axios from 'axios';

const SubdomainScanner = () => {
  const [domain, setDomain] = useState('rajasthan.gov.in');
  const [subdomains, setSubdomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubdomains = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://subdomain-finder5.p.rapidapi.com/subdomain-finder',
      params: { domain: domain },
      headers: {
        'x-rapidapi-key': 'df6ce07f73msh8ab9573fe2e672dp1086a8jsn0d9483b3ebf4',
        'x-rapidapi-host': 'subdomain-finder5.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);

      // Extract subdomains from the response and format type names
      if (response.data && response.data.data) {
        const formattedSubdomains = response.data.data.map(subdomain => ({
          ...subdomain,
          type: subdomain.type === 'IP' ? 'A' : subdomain.type === 'NAME' ? 'CNAME' : subdomain.type
        }));
        setSubdomains(formattedSubdomains);
      } else {
        setSubdomains([]);
      }

      setLoading(false);
    } catch (error) {
      setError('Error fetching subdomains. Please check your domain and try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setDomain(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSubdomains();
  };

  const handleSubdomainClick = (url) => {
    window.open(`http://${url}`, '_blank');
  };

  const handleIPClick = (ip) => {
    window.open(`https://ipinfo.io/${ip}`, '_blank');
  };

  // Calculate number of unique IPs
  const uniqueIPs = [...new Set(subdomains.map((subdomain) => subdomain.dest))];

  // Sorting state
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  // Sorting function
  const sortedSubdomains = [...subdomains].sort((a, b) => {
    const columnA = sortBy === 'subdomain' ? a.subdomain.toLowerCase() : sortBy === 'type' ? a.type.toLowerCase() : a.dest.toLowerCase();
    const columnB = sortBy === 'subdomain' ? b.subdomain.toLowerCase() : sortBy === 'type' ? b.type.toLowerCase() : b.dest.toLowerCase();

    if (columnA < columnB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center">Subdomain Scanner</h1>
      <form onSubmit={handleSubmit} className="search-form my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter domain"
          value={domain}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="text-danger text-center mt-3">{error}</div>}
      {subdomains.length > 0 && (
        <div className="subdomains-list">
          <h2 className="text-center mb-4">
            {subdomains.length} Subdomains found for: {domain}
          </h2>
          <p className="text-center">
            {uniqueIPs.length} Unique IP addresses found
          </p>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" onClick={() => handleSort('subdomain')} style={{ cursor: 'pointer' }}>
                    Subdomain {sortBy === 'subdomain' && <i className={`fas fa-sort-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>}
                  </th>
                  <th scope="col" onClick={() => handleSort('type')} style={{ cursor: 'pointer' }}>
                    Type {sortBy === 'type' && <i className={`fas fa-sort-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>}
                  </th>
                  <th scope="col" onClick={() => handleSort('dest')} style={{ cursor: 'pointer' }}>
                    Destination IP {sortBy === 'dest' && <i className={`fas fa-sort-${sortOrder === 'asc' ? 'down' : 'up'}`}></i>}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedSubdomains.map((subdomain, index) => (
                  <tr key={index}>
                    <td>
                      <span
                        className="subdomain-link"
                        onClick={() => handleSubdomainClick(subdomain.subdomain)}
                      >
                        {subdomain.subdomain}
                      </span>
                    </td>
                    <td>{subdomain.type}</td>
                    <td>
                      <span
                        className="ip-link"
                        onClick={() => handleIPClick(subdomain.dest)}
                      >
                        {subdomain.dest}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubdomainScanner;
