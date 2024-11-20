import React, { useState, useCallback } from 'react';

const UserRow = ({ user, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = useCallback(() => {
    if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
      onDelete(user.user_id);
    }
  }, [user.user_id, onDelete]);

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        
        <button onClick={handleDelete}>Delete</button>
      </td>
      
    </tr>
  );
};

export default UserRow;
