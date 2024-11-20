import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import '../styles/sidebar.css';
import StatsCard from '../components/Dashboard/StatsCard';
import AdminNavBar from '../components/AdminNavBar';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    denied: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetching stats and categories data
    const fetchData = async () => {
      const session = JSON.parse(localStorage.getItem('session')); 
      if (!session || !session.access_token) {
        console.error('No session or access token found');
        return;
      }

      const accessToken = session.access_token;

      try {
        // Fetching stats
        const statsResponse = await fetch('http://127.0.0.1:5000/reports', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!statsResponse.ok) {
          throw new Error('Failed to fetch stats');
        }

        const statsData = await statsResponse.json();
        setStats({
          approved: statsData.data.total_approved_requests,
          pending: statsData.data.total_pending_requests,
          denied: statsData.data.total_donation_requests - statsData.data.total_approved_requests - statsData.data.total_pending_requests,
        });

        
        const categories = statsData.data.donations_by_category;
        setCategories(categories);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-main-content">
          <h2>Admin Dashboard</h2>
          <div className="stats-container">
            <StatsCard label="Approved" count={stats.approved} />
            <StatsCard label="Pending" count={stats.pending} />
            <StatsCard label="Denied" count={stats.denied} />
          </div>

          <div className="category-list">
            <h3>Category Donations</h3>
            {categories.length > 0 ? (
              categories.map((category) => (
                <div className="category-item" key={category.category_id}>
                  <p>
                    <strong>Category ID:</strong> {category.category_id} - <strong>Total Amount:</strong> ${category.total_amount.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
