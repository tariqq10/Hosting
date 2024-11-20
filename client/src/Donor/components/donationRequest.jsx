import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
// import Footer from "./Footer";
import "../styles/home.css";
import DonationPage from "./DonationPage";


const Requests= () => {

  const [selectedDonation, setSelectedDonation] = useState(null)
  const [amount, setAmount] = useState([])

  const handleClick = (donationRequest) => {
    setSelectedDonation(donationRequest)
    setAmount('')
  }

    const handleAmountChange = (e) => {
      setAmount(e.target.value); // Update the amount as user types
    };

    const handleDonateSubmit = (e) => {
      e.preventDefault();
      if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      // Here you can handle the actual donation process (e.g., API call or processing)
      alert(`Thank you for donating ${amount} to ${selectedDonation.title}`);

      // Reset the form or close the donation prompt
      setSelectedDonation(null); // Close the donation page/modal
    };
const [requests, setRequests] = useState([]);
const [error, setError] = useState(null); // State for managing errors

// Retrieve the access token from local storage

const access = localStorage.getItem("session");

const ngoId = JSON.parse(access);
// console.log(access)

useEffect(() => {
  // Ensure the token is available before making the request
  if (access) {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/approved", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(access).access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)

          if(data && data.approved_donations && Array.isArray(data.approved_donations)){
          setRequests(data.approved_donations);
          } else {
            console.error("No approved requests")
            setError("No approved donations")
          }
        } else {
          console.error(
            "Failed to fetch donation requests:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  } else {
    console.error("No access token found.");
  }
}, [access]);


  return (
    <div className="home">
      <NavBar isHome={true} />
      <h2> Donation Requests</h2>
      {error && <p className="text-danger">{error}</p>}{" "}
      {/* Display error messages */}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Target Amount</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.request_id}>
                <td>{request.title}</td>
                <td>{request.description}</td>
                <td>{request.target_amount}</td>
                <td>
                  <button onClick={() => handleClick(request)}>Donate</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No requests available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {""}
      <div>
      {selectedDonation && (
        <DonationPage
          donationRequest={selectedDonation}
          amount={amount}
          onAmountChange={handleAmountChange}
          onDonate={handleDonateSubmit}
          onClose={() => setSelectedDonation(null)}
        />
      )}
      </div>
    </div>
  );
};

export default Requests;




      
