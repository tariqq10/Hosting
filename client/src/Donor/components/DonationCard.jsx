import React from "react";
import "./assets/styles/DonationCard.css";

const DonationCard = ({ donation }) => {
  return (
    <div className="donation-card">
      <h3 className="donation-amount">${donation.amount.toFixed(2)}</h3>
      <p>Donor ID: {donation.user_id}</p>
      <p>Category ID: {donation.category_id}</p>
      <p>Donated On: {new Date(donation.created_at).toLocaleString()}</p>
    </div>
  );
};

export default DonationCard;
