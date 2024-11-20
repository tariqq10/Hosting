import { useEffect, useState } from "react";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(""); // State for selected description
  
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) return;

    const accessToken = session.access_token;
    fetch("http://127.0.0.1:5000/categories", {
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
    setSelectedDescription(description); // Update description based on button clicked
  };

  return (
    <div>
      <div className="category-div">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={`${category.category_id}-${category.name}`}
              onClick={() => handleCategoryClick(category.description)} // Pass description to handler
              style={{
                margin: "5px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "#113047",
                cursor: "pointer",
              }}
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>No categories available on the backend</p>
        )}
      </div>
      {selectedDescription && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h4>Category Description</h4>
          <p>{selectedDescription}</p>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
