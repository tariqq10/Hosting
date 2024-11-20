import React, { useState } from "react";
import "../styles/DonationPage.css"; // Optional: Custom styles for the donation page
import NavBar from "./NavBar";
import { postDonation } from "../slices/charity";
import { useDispatch } from "react-redux";
import {setDonations} from "../slices/donationSlice"

const DonationPage = ({donationRequest, onclose}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const donorPhone = localStorage.getItem("donorPhone")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!amount || amount <= 0){
      setError('Please enter a valid donation amount.')
      return;
    }

    if(!donorPhone){
      setError("Phone number is required")
      return;
    }

    try {
      const donationData = {
        amount: parseFloat(amount),
        donation_request_id: donationRequest.donation_request_id,
        donorPhone: donorPhone,
      }

      const response = await postDonation(donationData);
      alert("Donation Seccessful!")
      dispatch(setDonations(response.data.donations))
      onclose();
    } catch (error) {
      setError("Failed to make donation, Please try again")
    }
  }
    
  return (
    <div className="donation-page">
      <NavBar />
      <button onClick={onclose}>X</button>
      <h2>Donate to {donationRequest}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {error && <div>{error}</div>}
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonationPage;
