import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";
import Logout from "./logout";

const NavBar = () => {
  // Using useLocation to check current route for conditional styling if needed
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-links">

        <ul>
          <li><Link to="/donor" className="nav-link">
            Home
          </Link>
          </li>
          <li>
            <Link to="/donor-category" className="nav-link">
            Category
            </Link>
          </li>
          <li>
          <Link to="/requests" className="nav-link">Donation request</Link>
          </li>
          {/* Add Make a Donation link */}
          <li>
          <Link to="" className="nav-link">
            Profile
          </Link>
          </li>
          <li><Logout/></li>
        </ul>
        </div>
        
    </nav>
  );
};

export default NavBar;
