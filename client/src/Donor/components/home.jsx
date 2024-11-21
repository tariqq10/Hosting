import React from "react";
import "../styles/home.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";


import NavBar from "./NavBar";

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      {/* Introduction Section */}
      <section className="intro">
        <h1>Welcome to Our Charity Organization</h1>
        <p>
          We are committed to supporting various causes that help improve the
          lives of individuals in need. Join us in making the world a better
          place by supporting our partner NGOs.
        </p>
      </section>

      {/* What We've Done and How We've Helped */}
      <section className="impact">
        <h2>Our Impact</h2>
        <p>
          Over the years, our organization has worked tirelessly to create
          positive change in the communities we serve. Through partnerships with
          various NGOs, we have been able to provide essential resources,
          support, and financial aid to those in need.
        </p>
        <p>
          <strong>Here's how we've helped:</strong>
        </p>
        <ul>
          <li>Provided over $1 million in financial aid to NGOs in need.</li>
          <li>
            Supported over 200 community projects across multiple regions.
          </li>
          <li>
            Delivered food, medical supplies, and education materials to
            thousands of families.
          </li>
          <li>
            Enabled sustainable development initiatives that continue to benefit
            local communities.
          </li>
        </ul>
        <div>
          <h3>You can donate here:</h3>
          <Link to="/requests" className="support-charities-button">
            Donate
          </Link>
        </div>
        <p>
          We are proud of the difference we've made, but there is still much
          more to do. With your support, we can continue to improve lives and
          bring hope to those in need.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
