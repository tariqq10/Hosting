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
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/organizations/${organization_id}`,
          {
            headers: { Authorization: `Bearer ${access}` }
          }
        );
        setOrganization(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organization:', error);
        setError('Failed to fetch organization details');
        setLoading(false);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchOrganization();
  }, [organization_id, navigate]);

  const deleteOrganization = async () => {
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
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/organizations/${organization_id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      navigate('/admin/organizations');
    } catch (error) {
      console.error('Error deleting organization:', error);
      setError('Failed to delete organization. Please try again.');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <AdminNavBar />
      <div className="dashboard-main-content">
        {error && <div className="error-message">{error}</div>}
        <h1 id="organization-management-heading">Organization Management</h1> 
        {organization && (
          <div>
            <h2>{organization.name}</h2>
            <p>{organization.description}</p>
            <button onClick={deleteOrganization}>Delete</button>
            <OrganizationForm initialData={organization} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationDetails;
