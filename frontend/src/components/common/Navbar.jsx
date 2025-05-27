// frontend/src/components/common/Navbar.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, currentUser, logout } = useAuth(); // Get auth state and logout from context
  const navigate = useNavigate(); // Hook for navigation

  // This handleLogout IS USED by the "Logout" button below if isAuthenticated is true
  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          FixOurCity
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/issues"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            View Issues
          </NavLink>
        </li>

        {/* Conditional rendering based on authentication state USES these variables */}
        {isAuthenticated ? ( // <<-- isAuthenticated IS USED HERE
          <>
            {currentUser && ( // <<-- currentUser IS USED HERE
              <li className="nav-item nav-greeting">
                Hi,{" "}
                {currentUser.email ? currentUser.email.split("@")[0] : "User"}!
              </li>
            )}
            <li className="nav-item">
              <NavLink
                to="/profile" // Assuming you'll have a profile page
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              {/* handleLogout IS USED HERE */}
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;