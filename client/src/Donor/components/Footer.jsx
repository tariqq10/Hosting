import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2>Contact Us</h2>
        <div className="contact-details">
          <p>
            <strong>Phone:</strong> +123 456 7890
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:Donation@charity.com">contact@example.com</a>
          </p>
        </div>
        <div className="social-media">
          <a href="https://facebook.com/yourpage">Facebook</a> |
          <a href="https://twitter.com/yourhandle"> Twitter</a> |
          <a href="https://instagram.com/yourprofile"> Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
