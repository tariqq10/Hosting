import React from "react";

const DonationRequests = ({ donationRequests }) => {
  return (
    <div>
      <h1>Donation Requests</h1>
      <ul>
        {donationRequests.map((request) => (
          <li key={request.id}>
            <h3>{request.category}</h3>
            <p>{request.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationRequests;