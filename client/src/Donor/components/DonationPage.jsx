import React, { useState } from "react";
import "../styles/DonationPage.css"; // Optional: Custom styles for the donation page
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { setDonations } from "../slices/donationSlice";
import { toast } from "react-hot-toast";

const DonationPage = ({ donationRequest, onClose, onDonate }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const donorPhone = localStorage.getItem("donorPhone");

  const onAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setAmount(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const num = parseFloat(amount);

    if (isNaN(num) || amount <= 0) {
      toast.success("Please enter a valid donation amount.");
      return;
    }

    if (!donorPhone) {
      setError("Phone number is required");
      return;
    }

    try {
      const donationData = {
        amount: parseFloat(amount),
        donation_request_id: donationRequest.donation_request_id,
        donorPhone: donorPhone,
      };

      const accessToken = localStorage.getItem("session");
      // Hardcoding the server URL
      const baseURL = "https://hosting-33ri.onrender.com"; // Hardcoded URL

      const response = await fetch(`${baseURL}/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(accessToken).access_token}`,
        },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Donation Successful!");
        dispatch(setDonations(data.donations));
        onClose(); // Close the donation modal
      } else {
        setError("Failed to make donation, please try again.");
      }
    } catch (error) {
      setError("An error occurred while processing the donation.");
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div className="donation-page">
      <NavBar />
      <div className="donation-modal">
        <h2>Donate to {donationRequest.title}</h2>
        <p>{donationRequest.description}</p>
        <p>
          <strong>Target Amount:</strong> {donationRequest.target_amount}
        </p>

        {/* Donation Amount Input */}
        <div>
          <label htmlFor="donationAmount">Enter Donation Amount</label>
          <input
            type="number"
            id="donationAmount"
            value={amount}
            onChange={onAmountChange}  // Corrected the event handler
            placeholder="Enter amount"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button onClick={handleSubmit}>Donate</button>
        </div>

        {/* Close Button */}
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
