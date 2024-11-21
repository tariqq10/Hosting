import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./home";
import Profile from "../Donor-app/profile";
import NavBar from "./NavBar";
import Footer from "./Footer";
import DonationPage from "./DonationPage";
import "./assets/styles/App.css";

// Component to conditionally render NavBar based on the current route
const AppNavBar = () => {
  const location = useLocation(); // Use location hook inside a rendered component
  // Hide NavBar on /make-donation page
  if (location.pathname === "/make-donation") {
    return null;
  }
  return <NavBar isHome={true} />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Conditionally render NavBar based on route */}
        <AppNavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor" element={<Home />} />
          <Route path="/donor-profile" element={<Profile />} />
          <Route path="/make-donation" element={<DonationPage />} />{" "}
          {/* Route for donation page */}
        </Routes>

        {/* Footer is always visible */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
