import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import RequestManagement from '../pages/RequestManagement';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />  {/* Added /admin route */}
        <Route path="/request-management" element={<RequestManagement />} />
      </Routes>
    </Router>
  );
}
 
export default AppRouter;
