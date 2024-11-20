import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavBar from '../AdminNavBar'; 
import OrganizationForm from './OrganizationForm';
import '../../styles/dashboard.css'; 

const OrganizationDetails = () => {
  const { organization_id } = useParams();  
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      const token = localStorage.getItem('access_token'); 
      if (!token) {
        setError('No access token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:5000/organizations/${organization_id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setOrganization(response.data);
      } catch (error) {
        setError('Failed to fetch organization details.');
        console.error('Error fetching organization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organization_id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('access_token'); 
    if (!token) return;
    try {
      await axios.delete(`http://127.0.0.1:5000/organizations/${organization_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      navigate('/admin/organizations'); 
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <AdminNavBar />
      <div className="dashboard-main-content">
        <h2>{organization.name}</h2>
        <p>Contact Info: {organization.contactInfo}</p>
        <p>Address: {organization.address}</p>
        <p>Description: {organization.description}</p> 
        <button onClick={handleDelete}>Delete Organization</button>
        <OrganizationForm 
          organization={organization}
          setOrganization={setOrganization}
        />
      </div>
    </div>
  );
};

export default OrganizationDetails;
