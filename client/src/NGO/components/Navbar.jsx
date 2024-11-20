import React from "react";
import { Link } from "react-router-dom";
import Logout from "../../Donor/components/logout";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderBottom: "2px solid #ddd",
      }}
    >
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          justifyContent: "center",
        }}
      >
        <li>
          <Link
            to="/ngo"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/new-donation"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            New donations
          </Link>
        </li>
        <li>
          <Link
            to="/donation-history"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Donation History
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Profile
          </Link>
        </li>
        <li
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
