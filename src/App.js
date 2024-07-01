import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import DNSInfo from './pages/DNSInfo';
import IPInfo from './pages/IPInfo';
import EmailChecker from './pages/EmailChecker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Whois from './pages/Whois'
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
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dns-info" element={<DNSInfo />} />
            <Route path="/ip-info" element={<IPInfo />} />
            <Route path="/email-checker" element={<EmailChecker />} />
            <Route path="/whois" element={<Whois />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
