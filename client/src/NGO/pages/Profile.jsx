import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar"

const NGOProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token); // Assume you store the JWT token in Redux

  useEffect(() => {
    const fetchProfile = async () => {'http://127.0.0.1:5000/users/ngo'
      try {
        const response = await axios.get("", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

          <p>
            <strong>First Name:</strong> {profile.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.last_name}
          </p>

          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default NGOProfile;
