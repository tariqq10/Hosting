import React from 'react';

const UserDetailsModal = ({ user, closeModal }) => {
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="viewUserDetails">
      <div className="modal-content">
        <h3 id="viewUserDetails">User Details</h3>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username || ''}
            disabled
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={user.last_name || ''}
            disabled
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email || ''}
            disabled
          />
        </label>
        <label>
          Role:
          <select name="role" value={user.role || ''} disabled>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="ngo">NGO</option>
          </select>
        </label>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
