import React from "react";
import "../styles/NavBar.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2>Contact Information</h2>
        <div className="contact-details">
          <p>
            <strong>Phone:</strong> +123 456 7890
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:Donation@charity.com">contact@example.com</a>
          </p>
          <p>
            <strong>Address:</strong>
            <br />
            1234 Street Name,
            <br />
            City, State, Zip Code,
            <br />
            Country
          </p>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <p>
            <a href="https://facebook.com/yourpage">Facebook</a> |
            <a href="https://twitter.com/yourhandle"> Twitter</a> |
            <a href="https://instagram.com/yourprofile"> Instagram</a>
          </p>
        </div>
        <div className="business-hours">
          <h3>Business Hours</h3>
          <p>Monday to Friday: 9 AM - 5 PM EAT</p>
          <p>Saturday: 10 AM - 2 PM EAT</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer


// import React from 'react';

// const DonationPage = ({ donationRequest, amount, onAmountChange, onDonate, onClose }) => {
//   if (!donationRequest) return null;  // If no donation request is selected, don't render the page

//   return (
//     <div className="donation-page">
//       <div className="donation-modal">
//         <h2>Donate to {donationRequest.title}</h2>
//         <p>{donationRequest.description}</p>
//         <p><strong>Target Amount:</strong> {donationRequest.target_amount}</p>

//         {/* Donation Amount Input */}
//         <div>
//           <label htmlFor="donationAmount">Enter Donation Amount</label>
//           <input
//             type="number"
//             id="donationAmount"
//             value={amount}
//             onChange={onAmountChange}
//             placeholder="Enter amount"
//           />
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button onClick={onDonate}>Donate</button>
//         </div>

//         {/* Close Button */}
//         <div>
//           <button onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonationPage;


