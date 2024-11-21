import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaBell, 
  FaFilter, 
  FaSort, 
  FaPlus, 
  FaChartPie, 
  FaHistory 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import Footer from "../../Donor/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [summaryMetrics, setSummaryMetrics] = useState({
    totalRequests: 0,
    totalAmount: 0,
    approvalBreakdown: {
      pending: 0,
      approved: 0,
      rejected: 0
    }
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Rest of the existing dashboard logic remains the same...

  // New method to incorporate impact section
  const renderImpactSection = () => (
    <section className="impact">
      <h2>Our Impact</h2>
      <p>
        Over the years, our organization has worked tirelessly to create
        positive change in the communities we serve. Through partnerships with
        various NGOs, we have been able to provide essential resources,
        support, and financial aid to those in need.
      </p>
      <p>
        <strong>Here's how we've helped:</strong>
      </p>
      <ul>
        <li>Provided over $1 million in financial aid to NGOs in need.</li>
        <li>Supported over 200 community projects across multiple regions.</li>
        <li>Delivered food, medical supplies, and education materials to thousands of families.</li>
        <li>Enabled sustainable development initiatives that continue to benefit local communities.</li>
      </ul>
      <div>
        <h3>You can make a donation request here:</h3>
        <Link to="/new-donation" className="support-charities-button">
          Make a donation request
        </Link>
      </div>
    </section>
  );

  // Conditional Rendering
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
    <div className="home">
      <Navbar />
      
      {/* Dashboard Section */}
      <div style={{ display: 'flex' }}>
        {/* Main Dashboard Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Existing Dashboard Rendering Logic */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2>Active Donation Requests</h2>
            <div>
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

          {/* Request List Rendering */}
          {filteredRequests.length === 0 ? (
            <div>No donation requests found</div>
          ) : (
            filteredRequests.map((request, index) => (
              <div 
                key={request.id || index} 
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px'
                }}
              >
                <strong>{request.category || 'Unnamed Category'}</strong>
                <p>${request.amount?.toFixed(2) || '0.00'} | {request.status || 'Unknown Status'}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Impact Section */}
      {renderImpactSection()}
      
      <Footer />
    </div>
  );
};

export default Home;