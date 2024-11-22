import React, { useEffect, useState, useRef } from "react";
import NavBar from "./NavBar";
import "../styles/home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [amount, setAmount] = useState("");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const access = localStorage.getItem("session");
  const token = access ? JSON.parse(access).access_token : null;

  // Ref for donation form to scroll to it automatically
  const donationFormRef = useRef(null);

  // Hardcoded base URL for the API
  const baseURL = "https://hosting-33ri.onrender.com";  // Replace with your actual API URL

  useEffect(() => {
    if (token) {
      const fetchRequests = async () => {
        try {
          const response = await fetch(`${baseURL}/approved`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setRequests(data.approved_donations || []);
          } else {
            const errorText = await response.text();
            setError(`Failed to fetch donation requests: ${errorText}`);
          }
        } catch (error) {
          setError("An error occurred while fetching donation requests.");
          console.error(error);
        }
      };

      fetchRequests();
    } else {
      setError("No access token found. Please log in.");
    }
  }, [token]);  // baseURL doesn't need to be in the dependencies

  const handleClick = (donationRequest) => {
    setSelectedDonation(donationRequest);
    setAmount("");

    // Scroll to donation form
    if (donationFormRef.current) {
      donationFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid donation amount.", {
        position: "top-center",  // Center the error toast at the top
      });
      return;
    }

    try {
      const response = await fetch(`${baseURL}/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donation_request_id: selectedDonation.request_id,
          amount: parseFloat(amount),
        }),
      });

      if (response.ok) {
        const { message } = await response.json();
        toast.success("Thank you for your generous donation! You will receive an M-Pesa STK push shortly. Please confirm the transaction by typing your mpesa pin.", {
          position: "top-center",  // Center the success toast at the top
        });
        setSelectedDonation(null); // Close the donation modal
      } else {
        const errorData = await response.json();

        // Check if transaction cancellation message is returned
        if (errorData.message && errorData.message.includes("Transaction canceled")) {
          toast.warn(`${errorData.message}`, { position: "top-center" }); // Yellow for warnings, positioned at the top center
        } else {
          toast.error(`Donation failed: ${errorData.message}`, { position: "top-center" });
        }
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast.error("An error occurred while processing your donation.", {
        position: "top-center",  // Center the error toast at the top
      });
    }
  };

  return (
    <div className="home">
      <NavBar isHome={true} />
      <h2>Approved Requests</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Target Amount</th>
            <th>Action</th>
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
              <td colSpan="4" className="text-center">
                No requests available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedDonation && (
        <div className="donation-form" ref={donationFormRef}>
          <h3>Donate to: {selectedDonation.title}</h3>
          <form onSubmit={handleDonateSubmit}>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                required
              />
            </div>
            <button type="submit">Donate</button>
            <button type="button" onClick={() => setSelectedDonation(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Requests;
