import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar"


  useEffect(() => {
    axios.get('/api/ngos/profile')
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    axios.put('/api/ngos/profile', profileData)
      .then(response => {
        setIsEditing(false);
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile data:', error);
      });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.confirmNewPassword) {
      axios.post('/api/ngos/change-password', passwordData)
        .then(response => {
          alert('Password changed successfully');
        })
        .catch(error => {
          console.error('Error changing password:', error);
        });
    } else {
      alert('Passwords do not match');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('document', file);

axios.post('/api/ngos/upload-doc', formData)
  .then(response => {
    alert('Document uploaded successfully');
  })
  .catch(error => {
    console.error('Error uploading document:', error);
  });
  };

  return (
    <div>
      <Navbar />
      {profile && (
        <div>
          <h2>Organization Details</h2>
          <p>
            <strong>Organization Name:</strong> {profile.organization_name}
          </p>
          <h2>Organization Details</h2>
          <p>
            <strong>Organization Name:</strong> {profile.organization_name}
          </p>
          <p>
            <strong>Organization Description:</strong>{" "}
            {profile.organization_description}
          </p>

          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Organization Address:</strong>{" "}
            {profile.organization_address}
          </p>
          <h4>Contact Person</h4>


    {isEditing ? (
      <button type="button" onClick={handleSaveChanges}>Save Changes</button>
    ) : (
      <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
    )}
  </form>

  {/* Change Password */}
  <h3>Change Password</h3>
  <form onSubmit={handlePasswordSubmit}>
    <div className="form-group">
      <label>Current Password:</label>
      <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} />
    </div>
    <div className="form-group">
      <label>New Password:</label>
      <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
    </div>
    <div className="form-group">
      <label>Confirm New Password:</label>
      <input type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} />
    </div>
    <button type="submit">Change Password</button>
  </form>

  {/* Document Upload */}
  <h3>Upload Document (Proof of Registration, Tax Forms, etc.)</h3>
  <input type="file" onChange={handleFileChange} />
  <button type="button" onClick={handleFileUpload}>Upload Document</button>
</div>
  );
}

export default Profile;

