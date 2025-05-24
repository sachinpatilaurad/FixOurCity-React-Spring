// frontend/src/components/common/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styling
import './Navbar.css'; // We'll create this CSS file next

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          FixOurCity
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/issues" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            View Issues
          </NavLink>
        </li>
        <li className="nav-item">
          {/* We will add logic later for conditional rendering of Login/Register vs Profile/Logout */}
          <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;