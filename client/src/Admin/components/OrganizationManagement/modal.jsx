import React from 'react';
import '../../styles/modal.css';


const Modal = ({ isOpen, onClose, organization }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{organization.name}</h2>
        <p><strong>Contact Info:</strong> {organization.contactInfo}</p>
        <p><strong>Address:</strong> {organization.address}</p>
        <p><strong>Description:</strong> {organization.description}</p>
      </div>
    </div>
  );
};

export default Modal;
