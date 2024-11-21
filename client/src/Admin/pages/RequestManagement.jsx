import React, { useEffect, useState } from 'react';
import '../styles/requestManagement.css';
import AdminNavBar from '../components/AdminNavBar';

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        const data = await response.json();
        setRequests(data.requests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []); 

  const handleApprove = async (id) => {
    try {
      await fetch(`/api/requests/${id}/approve`, { method: 'POST' });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`/api/requests/${id}/reject`, { method: 'POST' });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'rejected' } : request
        )
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <div className="dashboard-main-content">
          <div className="container my-4">
            <div className="request-card">
              <h2 className="mb-4">Request Management</h2>
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>NGO Name</th>
                    <th>Amount Requested</th>
                    <th>Reason</th>
                    <th>Category</th>
                    <th>Request Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.ngoName}</td>
                        <td>{request.amountRequested}</td>
                        <td>{request.reason}</td>
                        <td>{request.category}</td>
                        <td>{request.requestDate}</td>
                        <td>
                          {request.status === 'pending' ? (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => handleApprove(request.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleReject(request.id)}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span
                              className={`badge bg-${
                                request.status === 'approved' ? 'success' : 'danger'
                              }`}
                            >
                              {request.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No requests available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;
