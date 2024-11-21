import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Inline styles
  const sidebarStyles = {
    width: isOpen ? "250px" : "0", // Dynamic width based on isOpen
    height: "100vh",
    backgroundColor: "#f4f4f4",
    position: "fixed",
    top: "0",
    left: "0",
    transition: "width 0.3s ease", // Smooth transition for width change
  };

  const navStyles = {
    padding: "20px",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const toggleButtonStyles = {
    position: "absolute",
    top: "20px",
    right: "-50px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  };

  return (
    <div style={sidebarStyles}>
      {/* Sidebar Toggle Button */}
      <button style={toggleButtonStyles} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>

      {/* Navigation Links */}
      <nav>
        <ul style={navStyles}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/donations">Donation Requests</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
