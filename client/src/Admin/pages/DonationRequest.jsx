import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import '../styles/requestManagement.css';

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);

  // Retrieve the access token from local storage

  const access = localStorage.getItem("session");

  const ngoId = JSON.parse(access);


  useEffect(() => {
    // Ensure the token is available before making the request
    if (accessToken) {
      const fetchRequests = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/requests", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(access).access_token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setRequests(data); 
          } else {
            console.error("Failed to fetch donation requests:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };
      fetchRequests();
    } else {
      console.error("No access token found.");
    }
  }, [accessToken]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/approvals/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setRequests(requests.map(request =>
          request.request_id === id ? { ...request, status: 'approved' } : request
        ));
      } else {
        console.error("Failed to approve request:", response.statusText);
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/approvals/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: 'rejected' }), 
      });

      if (response.ok) {
        setRequests(requests.map(request =>
          request.request_id === id ? { ...request, status: 'rejected' } : request
        ));
      } else {
        console.error("Failed to reject request:", response.statusText);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="dashboard-main-content">
      <AdminNavBar />
      <h2>Pending Donation Requests</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Target Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map(request => (
              <tr key={request.request_id}>
                <td>{request.title}</td>
                <td>{request.description}</td>
                <td>{request.target_amount}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'pending' ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(request.request_id)}>Approve</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleReject(request.request_id)}>Reject</button>
                    </>
                  ) : (
                    <span className={`badge bg-${request.status === 'approved' ? 'success' : 'danger'}`}>{request.status}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No requests available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationRequest; 
