import { useEffect, useState } from "react";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(""); 

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) return;

    // Hardcoded URL instead of using environment variable
    const baseURL = "https://hosting-33ri.onrender.com"; // Hardcoded URL
    const accessToken = session.access_token;

    fetch(`${baseURL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (description) => {
    setSelectedDescription(description); 
  };

  return (
    <div>
      <h2 className="category-Title">Categories</h2> 

      <div className="category-div">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              id="category-btn"
              key={`${category.category_id}-${category.name}`}
              onClick={() => handleCategoryClick(category.description)} 
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>No categories available on the backend</p>
        )}
      </div>

      {selectedDescription && (
        <div className="category-description">
          <h4>Category Description</h4>
          <p>{selectedDescription}</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
