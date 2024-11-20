import React, { useEffect, useState } from "react";
import "../styles/profile.css"; // Corrected path

const Profile = () => {
  const [donor, setDonor] = useState({});
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/users");
        const data = await response.json();
        setDonor(data);
        setName(data.name);
        setEmail(data.email);

        const donationsResponse = await fetch(
          `/api/donations?user_id=${data.user_id}`
        );
        const donationsData = await donationsResponse.json();
        setDonations(donationsData);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedDonor = { name, email };

    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDonor),
      });
      if (response.ok) {
        setDonor({ ...donor, ...updatedDonor });
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile">
      <h2>Donor Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>

      <h3>Your Donations</h3>
      <ul>
        {donations.map((donation) => (
          <li key={donation.donations_id}>
            ${donation.amount} donated on{" "}
            {new Date(donation.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
