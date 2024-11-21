import React, { useState } from "react";
import "../styles/DonationPage.css"; // Optional: Custom styles for the donation page
import NavBar from "./NavBar";
import { postDonation } from "../slices/charity";
import { useDispatch } from "react-redux";
import {setDonations} from "../slices/donationSlice"
import {toast} from "react-hot-toast"

const DonationPage = ({donationRequest, onClose, onDonate}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const donorPhone = localStorage.getItem("donorPhone")

  const onAmountChange = (e) => {
    const value = e.target.value;

    if (!isNaN(value) || value === "") {
      setAmount(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const num = parseFloat(amount)

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
      const response = await fetch("http://127.0.0.1:5000/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(accessToken).access_token}`,
        },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Donation Successful!");
        dispatch(setDonations(data.donations));
        onclose(); // Close the donation modal
      } else {
        setError("Failed to make donation, please try again.");
      }
    } catch (error) {
      setError("An error occurred while processing the donation.");
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
            onChange={handleSubmit}
            placeholder="Enter amount"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button onClick={onDonate}>Donate</button>
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






