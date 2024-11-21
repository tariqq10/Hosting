import React, { useState, useEffect } from 'react';
import Modal from "./modal";  // lowercase 'm' if the file is named 'modal.jsx'
  // Import the Modal component

const OrganizationItem = ({ organization, deleteOrganization, updateOrganization }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    name: organization.name,
    contactInfo: organization.contactInfo || '',
    address: organization.address || '',
    description: organization.description || '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility

  useEffect(() => {
    setEditedData({
      name: organization.name,
      contactInfo: organization.contactInfo || '',
      address: organization.address || '',
      description: organization.description || '',
    });
  }, [organization]);

  const handleDelete = () => {
    if (!organization.organization_id) {
      console.error('Invalid organization ID');
      return;
    }
    
    const confirmDelete = window.confirm('Are you sure you want to delete this organization?');
    if (confirmDelete) {
      deleteOrganization(organization.organization_id);
    }
  };

  const handleUpdate = () => {
    if (!editedData.name.trim()) {
      alert('Organization name is required');
      return;
    }

    updateOrganization(organization.organization_id, editedData);
    setEditMode(false);
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  return (
    <div className="organization-item">
      {editMode ? (
        <div>
          <input
            type="text"
            placeholder="Organization Name"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={editedData.contactInfo}
            onChange={(e) => setEditedData({ ...editedData, contactInfo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={editedData.address}
            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={editedData.description}
            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{organization.name}</h3>
          <p>{organization.contactInfo}</p>
          <p>{organization.address}</p>
          <p>{organization.description}</p>
          <button id='orgDel-btn' onClick={handleViewDetails}>View Details</button> 
          <button id='orgDel-btn' onClick={() => setEditMode(true)}>Edit</button>
          <button id='orgDel-btn' onClick={handleDelete}>Delete</button>
        </div>
      )}

      
      <Modal isOpen={isModalOpen} onClose={closeModal} organization={organization} />
    </div>
  );
};

export default OrganizationItem;
