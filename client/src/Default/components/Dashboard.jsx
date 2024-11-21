import React from 'react';
import '../styles/Dashboard.css'; // Import Dashboard-specific CSS

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your private area after logging in. Here you can manage your activities.</p>
      <button className="dashboard-btn">Go to Settings</button>
      <button className="dashboard-btn">Logout</button>
    </div>
  );
};

export default Dashboard;
