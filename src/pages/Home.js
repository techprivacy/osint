import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Import custom CSS

const Home = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/json?token=7f94c708942259');
        setIpInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchIpInfo();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error.message}</div>;

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
      <h1 className="text-center">Welcome to the Network Tools App</h1>
      <p className="text-center">Your current IP details are shown below:</p>
      {ipInfo && (
        <div className="ip-info-card p-4 my-4">
          <h2 className="text-center mb-4">Your IP: <span className="ip-address">{ipInfo.ip}</span></h2>
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

export default Home;
