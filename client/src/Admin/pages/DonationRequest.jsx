import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import '../styles/requestManagement.css';
import CategoriesList from "../components/CategoryList";

// Define the baseURL constant
const baseURL = import.meta.env.VITE_SERVER_URL;

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('session');
  let access = JSON.parse(accessToken)?.access_token;

  console.log(access);

  useEffect(() => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    const fetchRequests = async () => {
      try {
        const response = await fetch(`${baseURL}/requests`, {
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch donation requests: ${errorText}`);
        }
      } catch (error) {
        setError(`Error fetching requests: ${error.message}`);
      }
    };

    fetchRequests();
  }, [accessToken]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${baseURL}/approvals/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        setRequests(requests.map(request =>
          request.request_id === id ? { ...request, status: 'approved' } : request
        ));
        setError(null); // Clear error on success
      } else {
        const errorText = await response.text();
        setError(`Failed to approve request: ${errorText}`);
      }
    } catch (error) {
      setError(`Error approving request: ${error.message}`);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${baseURL}/approvals/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (response.ok) {
        setRequests(requests.map(request =>
          request.request_id === id ? { ...request, status: 'rejected' } : request
        ));
        setError(null); // Clear error on success
      } else {
        const errorText = await response.text();
        setError(`Failed to reject request: ${errorText}`);
      }
    } catch (error) {
      setError(`Error rejecting request: ${error.message}`);
    }
  };

  return (
    <div id="donation-content">
      <AdminNavBar />
      <h2 id="requests-title">Pending Donation Requests</h2>
      {error && <p id="error-message" className="text-danger">{error}</p>} {/* Display error messages */}
      <div id="table-container">
        <table id="requests-table" className="table table-striped table-hover">
          <thead id="table-header" className="table-dark">
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
                        <button
                          id={`approve-btn-${request.request_id}`}
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApprove(request.request_id)}
                        >
                          Approve
                        </button>
                        <button
                          id={`reject-btn-${request.request_id}`}
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(request.request_id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span
                        id={`status-badge-${request.request_id}`}
                        className={`badge bg-${request.status === 'approved' ? 'success' : 'danger'}`}
                      >
                        {request.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" id="no-requests-message" className="text-center">
                  No requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequest;
