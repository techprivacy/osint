import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import DNSInfo from './pages/DNSInfo';
import IPInfo from './pages/IPInfo';
import Whois from './pages/Whois';
import EmailChecker from './pages/EmailChecker';
import SubdomainScanner from './pages/SubdomainScanner'; // Import the SubdomainScanner component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Network Tools</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dns-info">DNS Info</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ip-info">IP Info</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/whois">Whois</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/email-checker">Email Checker</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/subdomain-scanner">Subdomain Scanner</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dns-info" element={<DNSInfo />} />
          <Route path="/ip-info" element={<IPInfo />} />
          <Route path="/whois" element={<Whois />} />
          <Route path="/email-checker" element={<EmailChecker />} />
          <Route path="/subdomain-scanner" element={<SubdomainScanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
