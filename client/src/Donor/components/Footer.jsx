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
