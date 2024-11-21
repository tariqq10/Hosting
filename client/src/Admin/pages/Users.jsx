import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import UserList from '../components/UserManagement/UserList';
import '../styles/dashboard.css';

const Users = () => {
  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <div className="dashboard-main-content">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Users;
