import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ManageDonations.css'; // Ensure you have styling for this page

const ManageDonations = () => {
  return (
    <div className="manage-donations-content">
      <div className="centered-content">
        <h1>Donor Engagement Platform</h1>
        <p>
          Charity Connect is a comprehensive online platform that empowers local charity organizations by providing tools to connect with donors and efficiently manage donations. From creating fundraising campaigns to tracking contributions, the platform simplifies the process of charity management.
        </p>
        <div className="buttons">
          <Link to="/support-charities" className="support-charities-button">
            Support Charities
          </Link>
          <Link to="/learn-more" className="learn-more-button">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageDonations;
