import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';
import '../../styles/userManagement.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcode the base URL for API requests
  const baseURL = 'https://hosting-33ri.onrender.com'; // Your hardcoded API URL

  const session = JSON.parse(localStorage.getItem('session'));
  const adminToken = session ? session.access_token : null;

  useEffect(() => {
    if (adminToken) {
      fetchUsers();
    } else {
      setError('No admin token found. Please log in.');
    }
  }, [adminToken]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(`Error fetching users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${baseURL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.user_id !== userId));
        alert('User deleted successfully.');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
    } catch (error) {
      setError(`Error deleting user: ${error.message}`);
    }
  };

  return (
    <div className="user-list">
      <h1 className="user-list-heading">User Management</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {users.length === 0 && !loading && !error && <p>No users available to display.</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user.user_id} user={user} onDelete={deleteUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
