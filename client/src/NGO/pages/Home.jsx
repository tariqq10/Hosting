import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const containerStyle = {
    backgroundColor: "#f8f8f8", // Light background
    fontFamily: "Arial, sans-serif", // Font family
    height: "100vh", // Full viewport height
    display: "flex", // Flexbox layout
    flexDirection: "column", // Stack content vertically
    justifyContent: "flex-start", // Align content to the top
    width: "100%", // Full width
    maxWidth: "900px", // Prevent too wide container
    margin: "0 auto", // Center the container horizontally
    padding: "100px", // Padding for spacing
  };

  const buttonStyle = {
    border: "1px solid transparent",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "16px",
    margin: "10px 0",
    cursor: "pointer",
    width: "80%",
    maxWidth: "300px",
  };

  const pendingStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    border: "1px solid black",
    color: "black",
  };

  const approvedStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    border: "1px solid lightgreen",
    color: "lightgreen",
  };

  const rejectedStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    border: "1px solid red",
    color: "red",
  };

  const createRequestStyle = {
    ...buttonStyle,
    background: "linear-gradient(to right, purple, indigo)",
    color: "white",
    marginTop: "20px",
  };

  const headerStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(to right, purple, indigo)",
    padding: "8px 20px",
    borderRadius: "5px",
    marginBottom: "20px",
    width: "100%",
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/requests") // Replace with your backend URL
      .then((response) => {
        setRequests(response.data); // Set the data from the backend
      })
      .catch((error) => {
        console.error("There was an error fetching requests:", error);
        setStatusMessage("Error fetching data. Please try again later.");
      });
  }, []);

  // Create a new request
  const handleCreateRequest = () => {
    const newRequest = {
      category: "Food", // Example category (you can update this to be dynamic)
      amount: 100, // Example amount (you can update this as well)
    };

    axios
      .post("http://localhost:5000/api/requests", newRequest) // Replace with your backend URL
      .then((response) => {
        setRequests([...requests, response.data]); // Add the new request to the list
        setStatusMessage("Request created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the request:", error);
        setStatusMessage("Error creating the request. Please try again later.");
      });
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <h2 style={headerStyle}>My Requests</h2>

      {/* Display status message */}
      {statusMessage && <p>{statusMessage}</p>}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {requests.map((request) => (
          <button
            key={request.id}
            style={
              request.status === "pending"
                ? pendingStyle
                : request.status === "approved"
                ? approvedStyle
                : rejectedStyle
            }
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}{" "}
            Request - {request.category} - ${request.amount}
          </button>
        ))}
      </div>

      {/* Create Request Donation button */}
      <button style={createRequestStyle} onClick={handleCreateRequest}>
        Create Request Donation
      </button>
    </div>
  );
};

export default Home;
