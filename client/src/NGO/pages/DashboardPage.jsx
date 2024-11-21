import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Home from '../components/Dashboard/Home';

function DashboardPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1e1e1e' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Home />
      </div>
    </div>
  );
}

export default DashboardPage;
