import React, { useState, useEffect } from 'react';
import AdminNavBar from '../AdminNavBar';
import OrganizationItem from './OrganizationItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard.css';

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hardcoding the URL directly
  const baseURL = 'https://hosting-33ri.onrender.com'; // Hardcoded base URL

  const fetchOrganizations = async () => {
    const accessToken = localStorage.getItem('session');
    let access = null;
    if (accessToken) {
      access = JSON.parse(accessToken).access_token;
    }

    if (!access) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/organizations`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setOrganizations(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setError('Failed to fetch organizations. Please try again.');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const deleteOrganization = async (organization_id) => {
    const accessToken = localStorage.getItem('session');
    let access = null;
    if (accessToken) {
      access = JSON.parse(accessToken).access_token;
    }

    if (!access) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`${baseURL}/organizations/${organization_id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      fetchOrganizations();
    } catch (error) {
      console.error('Error deleting organization:', error);
      setError('Failed to delete organization. Please try again.');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const updateOrganization = async (organization_id, updatedData) => {
    const accessToken = localStorage.getItem('session');
    let access = null;
    if (accessToken) {
      access = JSON.parse(accessToken).access_token;
    }

    if (!access) {
      navigate('/login');
      return;
    }

    try {
      await axios.patch(
        `${baseURL}/organizations/${organization_id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${access}` } }
      );
      fetchOrganizations();
    } catch (error) {
      console.error('Error updating organization:', error);
      setError('Failed to update organization. Please try again.');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <AdminNavBar />
      <div className="dashboard-main-content">
        <h1 id="organization-management-heading">Organization Management</h1> 
        {organizations.map((organization) => (
          <OrganizationItem
            key={organization.organization_id}
            organization={organization}
            deleteOrganization={deleteOrganization}
            updateOrganization={updateOrganization}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;
