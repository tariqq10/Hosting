import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrganizationForm = ({ initialData, onSubmitSuccess }) => {
  const { organization_id } = useParams();
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState({
    name: '',
    contactInfo: '',
    address: '',
    description: '',
  });
  const [error, setError] = useState(null);

  // Fetch the base URL from the environment variable
  const baseURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (initialData) {
      setOrgData(initialData);
    } else if (organization_id) {
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
            `${baseURL}/organizations/${organization_id}`,
            {
              headers: { Authorization: `Bearer ${access}` },
            }
          );
          setOrgData(response.data);
        } catch (error) {
          console.error('Error fetching organization:', error);
          setError('Failed to fetch organization details');
          if (error.response && error.response.status === 401) {
            navigate('/login');
          }
        }
      };

      fetchOrganization();
    }
  }, [organization_id, initialData, navigate, baseURL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!orgData.name.trim()) {
      setError('Organization name is required');
      return;
    }

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
      if (organization_id) {
        await axios.patch(
          `${baseURL}/organizations/${organization_id}`,
          orgData,
          { headers: { Authorization: `Bearer ${access}` } }
        );
      } else {
        await axios.post(
          `${baseURL}/organizations`,
          orgData,
          { headers: { Authorization: `Bearer ${access}` } }
        );
      }

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate('/admin/organizations');
      }
    } catch (error) {
      console.error('Error saving organization:', error);
      setError('Failed to save organization');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={orgData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          name="contactInfo"
          value={orgData.contactInfo || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={orgData.address || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={orgData.description || ''}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">
        {organization_id ? 'Update Organization' : 'Add Organization'}
      </button>
    </form>
  );
};

export default OrganizationForm;
