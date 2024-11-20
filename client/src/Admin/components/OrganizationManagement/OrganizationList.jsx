import React, { useState, useEffect } from 'react';
import AdminNavBar from '../AdminNavBar'; 
import OrganizationItem from './OrganizationItem';
import axios from 'axios';
import '../../styles/dashboard.css'; 

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('http://127.0.0.1:5000/organizations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const deleteOrganization = async (organization_id) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      await axios.delete(`http://127.0.0.1:5000/organizations/${organization_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchOrganizations();
    }
  };

  const updateOrganization = async (organization_id, updatedData) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      await axios.patch(
        `http://127.0.0.1:5000/organizations/${organization_id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrganizations();
    }
  };

  return (
    <div className="dashboard-container">
      <AdminNavBar />
      <div className="dashboard-main-content">
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
