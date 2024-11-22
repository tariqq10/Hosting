import React, { useEffect, useState } from "react";
import "../styles/profile.css"; // Corrected path
import NavBar from "./NavBar";

const Profile = () => {
  const [donor, setDonor] = useState({});
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const baseURL = import.meta.env.VITE_SERVER_URL;  // Use baseURL

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        // Fetch donor details from the baseURL
        const response = await fetch(`${baseURL}/users`);
        const data = await response.json();
        setDonor(data);
        setName(data.name);
        setEmail(data.email);

        // Fetch donations based on user_id from the baseURL
        const donationsResponse = await fetch(
          `${baseURL}/api/donations?user_id=${data.user_id}`
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
  }, [baseURL]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedDonor = { name, email };

    try {
      // Update donor profile using the baseURL
      const response = await fetch(`${baseURL}/users`, {
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
      <NavBar />
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
