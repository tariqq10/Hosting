import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: "#333", padding: "1rem", color: "#fff" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", margin: 0 }}>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        </li>
        <li>
          <Link to="/new-donation" style={{ color: "white", textDecoration: "none" }}>New Donation</Link>
        </li>
        <li>
          <Link to="/donation-history" style={{ color: "white", textDecoration: "none" }}>Donation History</Link>
        </li>
        <li>
          <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
        </li>
        <li>
          <Link to="/logout" style={{ color: "white", textDecoration: "none" }}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;