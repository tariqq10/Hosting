import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NgoCard from "./NgoCard"; // Assuming NgoCard is already styled
import "../styles/home.css";

const Home = () => {
  const [ngos, setNgos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingNgos, setLoadingNgos] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetching categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories/<int:id>");
        const data = await response.json();
        setCategories(data); // Assuming this is an array of categories
      } catch (error) {
        setErrorMessage("Error fetching categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetching NGOs from the backend
  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await fetch("/approved");
        const data = await response.json();

        // Only show NGOs with approved status
        const approvedNgos = data.filter((ngo) => ngo.status === "approved");

        // Sort NGOs by category_id (if we want to sort by category_id)
        const sortedNgos = approvedNgos.sort(
          (a, b) => a.category_id - b.category_id
        );

        setNgos(sortedNgos);
      } catch (error) {
        setErrorMessage("Error fetching NGOs");
      } finally {
        setLoadingNgos(false);
      }
    };

    fetchNgos();
  }, []);

  // Helper function to get category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div className="home">
      <NavBar isHome={true} />
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* NGO Cards */}
      <div className="ngo-cards">
        <h2>Our Approved NGOs</h2>
        <div className="home">
          {/* {/ Introduction Section /} */}
          <section className="intro">
            <h1>Welcome to Our Charity Organization</h1>
            <p>
              We are committed to supporting various causes that help improve
              the lives of individuals in need. Join us in making the world a
              better place by supporting our partner NGOs.
            </p>
          </section>
        </div>
        {loadingNgos || loadingCategories ? (
          <p>Loading...</p>
        ) : ngos.length > 0 ? (
          ngos.map((ngo) => (
            <NgoCard
              key={ngo.ngo_id}
              ngo={{ ...ngo, category_name: getCategoryName(ngo.category_id) }}
            />
          ))
        ) : (
          <p>No approved NGOs available.</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
