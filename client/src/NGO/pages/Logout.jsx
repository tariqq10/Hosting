import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you would clear any authentication tokens, user data, etc.
    localStorage.removeItem("authToken");

    // Redirect to the Home or Login page after logout
    navigate("/login");
  };

  return (
    <div className="page logout-page">
      <Navbar/>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;