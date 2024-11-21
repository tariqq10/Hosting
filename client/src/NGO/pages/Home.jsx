import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { 
  FaBell, 
  FaFilter, 
  FaSort, 
  FaPlus, 
  FaChartPie, 
  FaHistory 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Enhanced Summary Metrics State
  const [summaryMetrics, setSummaryMetrics] = useState({
    totalRequests: 0,
    totalAmount: 0,
    approvalBreakdown: {
      pending: 0,
      approved: 0,
      rejected: 0
    }
  });

  // Improved Data Fetching with Error Handling
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Parallel API Calls
      const [requestsResponse, notificationsResponse] = await Promise.all([
        axios.get('/api/requests'),
        axios.get('/api/notifications')
      ]);

      const requestData = requestsResponse.data || [];
      const notificationData = notificationsResponse.data || [];

      setRequests(requestData);
      setNotifications(notificationData);
      calculateSummaryMetrics(requestData);
      
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      toast.error('Error loading dashboard data');
      setLoading(false);
    }
  }, []);

  // Lifecycle Hook
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Enhanced Filtering and Sorting
  useEffect(() => {
    const filterAndSortRequests = () => {
      let result = [...requests];

      // Status Filtering
      if (statusFilter !== 'all') {
        result = result.filter(req => req.status === statusFilter);
      }

      // Smart Sorting with Fallback
      result.sort((a, b) => {
        switch(sortBy) {
          case 'date':
            return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
          case 'amount':
            return (b.amount || 0) - (a.amount || 0);
          default:
            return 0;
        }
      });

      setFilteredRequests(result);
    };

    filterAndSortRequests();
  }, [requests, statusFilter, sortBy]);

  // Robust Metrics Calculation
  const calculateSummaryMetrics = (requestData) => {
    if (!Array.isArray(requestData)) {
      console.error('Invalid request data', requestData);
      return;
    }

    const totalRequests = requestData.length;
    const totalAmount = requestData.reduce((sum, req) => sum + (req.amount || 0), 0);

    const approvalBreakdown = {
      pending: requestData.filter(req => req.status === 'pending').length,
      approved: requestData.filter(req => req.status === 'approved').length,
      rejected: requestData.filter(req => req.status === 'rejected').length
    };

    setSummaryMetrics({
      totalRequests,
      totalAmount,
      approvalBreakdown
    });
  };

  // Enhanced Request Creation Handler
  const handleCreateRequest = () => {
    navigate('/create-request');
  };

  // Notification Interaction Handler
  const handleNotificationClick = (notification) => {
    // Implement notification interaction logic
    toast.info(`Notification: ${notification.message}`);
  };

  // Render Conditional Content
  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Navbar />
      
      <div style={{ display: 'flex' }}>
        {/* Main Dashboard */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2>Active Donation Requests</h2>
            <div>
              {/* Enhanced Filtering */}
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
          </div>

          {/* Requests List with Enhanced Rendering */}
          {filteredRequests.length === 0 ? (
            <div>No donation requests found</div>
          ) : (
            filteredRequests.map((request, index) => (
              <div 
                key={request.id || index} 
                style={{
                  ...cardStyle,
                  borderLeft: `5px solid ${
                    request.status === 'pending' ? 'orange' :
                    request.status === 'approved' ? 'green' : 'red'
                  }`
                }}
              >
                <div>
                  <strong>{request.category || 'Unnamed Category'}</strong>
                  <p>${request.amount?.toFixed(2) || '0.00'} | {request.status || 'Unknown Status'}</p>
                </div>
                <span 
                  style={{
                    color: 
                      request.status === 'pending' ? 'orange' :
                      request.status === 'approved' ? 'green' : 'red'
                  }}
                >
                  {request.status || 'Unknown'}
                </span>
              </div>
            ))
          )}

          <button onClick={handleCreateRequest}>
            <FaPlus /> Create New Request
          </button>
        </div>

        {/* Sidebar */}
        <div style={sidebarStyle}>
          {/* Notifications Section */}
          <div>
            <h3><FaBell /> Notifications</h3>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div 
                  key={notification.id || index}
                  onClick={() => handleNotificationClick(notification)}
                  style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #eee' }}
                >
                  {notification.message || 'No message'}
                </div>
              ))
            ) : (
              <p>No notifications</p>
            )}
          </div>

          {/* Summary Metrics */}
          <div>
            <h3><FaChartPie /> Donation Summary</h3>
            <p>Total Requests: {summaryMetrics.totalRequests}</p>
            <p>Total Amount: ${summaryMetrics.totalAmount.toFixed(2)}</p>
            <p>Pending: {summaryMetrics.approvalBreakdown.pending }</p>
            <p>Approved: {summaryMetrics.approvalBreakdown.approved}</p>
            <p>Rejected: {summaryMetrics.approvalBreakdown.rejected}</p>
          </div>

          {/* Quick Access Links */}
          <div>
            <h3>Quick Access</h3>
            <button onClick={handleCreateRequest}><FaPlus /> New Request</button>
            <button onClick={() => navigate('/donation-history')}><FaHistory /> Donation History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;