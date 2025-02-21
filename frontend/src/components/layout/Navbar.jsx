import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-graph-up"></i> Data Dashboard
        </Link>
        <button
          className="navbar-toggler rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/fda-substances">
                FDA Substances
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fsis-recalls">
                FSIS Recalls
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/obesity-data">
                Obesity Data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gras-notices">
                GRAS Notices
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 