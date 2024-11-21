import React from "react";
import "../styles/NgoCard.css";

const NgoCard = ({ ngo }) => {
  return (
    <div className="ngo-card">
      <h3>{ngo.name}</h3>
      <p>{ngo.description}</p>
      <p>Total Donations: ${ngo.total_donations}</p>
      <button>View NGO</button>
    </div>
  );
};

export default NgoCard;
