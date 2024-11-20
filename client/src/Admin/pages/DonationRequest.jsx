import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import '../styles/requestManagement.css';
import CategoriesList from "../components/CategoryList";

const DonationRequest = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null); // State for managing errors

  // Retrieve the access token from local storage
  const accessToken = localStorage.getItem('session');
  let access = JSON.parse(accessToken).access_token

  console.log(access)

  useEffect(() => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    const fetchRequests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/requests', {
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
    const response = await fetch(`http://127.0.0.1:5000/approvals/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'approved' }), // Ensure this matches the API's expected body format
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
      const response = await fetch(`http://127.0.0.1:5000/approvals/${id}`, {
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
    <div className="donation-content">
      <AdminNavBar />
      <h2>Pending Donation Requests</h2>
      {error && <p className="text-danger">{error}</p>} {/* Display error messages */}
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
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleApprove(request.request_id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(request.request_id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`badge bg-${request.status === 'approved' ? 'success' : 'danger'}`}>
                      {request.status}
                    </span>
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
