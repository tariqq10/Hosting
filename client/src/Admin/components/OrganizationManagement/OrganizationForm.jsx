import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrganizationForm = () => {
  const { organization_id } = useParams(); 
  const navigate = useNavigate();

  const [orgData, setOrgData] = useState({
    name: '',
    contactInfo: '',
    address: '',
    description: '', 
  });

  useEffect(() => {
    if (organization_id) {
      const fetchOrganization = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/organizations/${organization_id}`
          );
          setOrgData(response.data);
        } catch (error) {
          console.error('Error fetching organization:', error);
        }
      };
      fetchOrganization();
    }
  }, [organization_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (organization_id) {
        await axios.patch(
          `http://127.0.0.1:5000/organizations/${organization_id}`,
          orgData
        );
      }
      navigate('/admin/organizations'); 
    } catch (error) {
      console.error('Error saving organization:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={orgData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          name="contactInfo"
          value={orgData.contactInfo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={orgData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={orgData.description}
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
