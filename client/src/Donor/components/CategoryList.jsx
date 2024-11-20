import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import NavBar from "./NavBar";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const handleFilter = (category) => {
    const filtered = categories.filter((cat) => cat.name === category);
    setFilteredRequests(filtered);
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session) return;

    const accessToken = session.access_token;
    fetch("http://127.0.0.1:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
        setFilteredRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      {filteredRequests.length > 0 ? (
        filteredRequests.map((category) => (
          <CategoryItem key={`${category.id}-${category.name}`} {...category} />
        ))
      ) : (
        <p>No categories available on the backend</p>
      )}
    </div>
  );
};

export default CategoriesList;
