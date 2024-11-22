import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";  // Import the custom axios instance

const DonationHistory = () => {
  const [requests, setRequests] = useState([]);

  const access = localStorage.getItem("session");
  const ngoId = JSON.parse(access);

  useEffect(() => {
    if (ngoId?.user?.user_id) {
      axiosInstance
        .get(`/requests/${ngoId?.user?.user_id}`, {
          headers: {
            "Authorization": `Bearer ${ngoId?.access_token}`,
          },
        })
        .then((res) => {
          setRequests(res.data);
        })
        .catch((error) => {
          console.error("Error fetching donation history", error);
          setRequests([]);
        });
    } else {
      console.log("Ngo id not found in session");
    }
  }, [access, ngoId]);

  return (
    <div>
      <Navbar />
      <h2>Donation History</h2>
      <p>Here are the donation records.</p>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Target Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(requests) ? requests : []).map((request) => (
            <tr key={request.donation_id}>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.target_amount}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistory;
