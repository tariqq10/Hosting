import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Hardcoded base URL for API
const baseURL = "https://hosting-33ri.onrender.com"; // Replace with the actual API URL

const CategoriesForm = () => {
    const [categories, setCategories] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const session = JSON.parse(localStorage.getItem("session")); 
    const accessToken = session?.access_token; 

    // Fetch categories on component mount
    useEffect(() => {
        fetch(`${baseURL}/categories`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
                setFetchError(null);
            })
            .catch((error) => {
                setFetchError(error.message);
                console.error("Error fetching categories:", error);
            });
    }, []);

    const formik = useFormik({
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            created_at: Yup.string().required("Creation date is required"),
        }),
        initialValues: {
            name: "",
            description: "",
            created_at: "",
        },
        onSubmit: async (values, { resetForm }) => {
            console.log("Access Token:", accessToken); 

            if (!accessToken) {
                toast.error("You are not logged in. Please login first.");
                return;
            }

            try {
                const res = await fetch(`${baseURL}/categories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`, 
                    },
                    body: JSON.stringify(values),
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success(`Successfully added category: ${values.name}`);
                    resetForm();

                    // Refetch categories to update the list
                    setCategories((prev) => [...prev, data]);
                } else {
                    toast.error(data.message || "An error occurred");
                }
            } catch (error) {
                toast.error("Network or server error occurred");
                console.error("Error:", error);
            }
        },
    });

    return (
        <div>
            <h1 className="category-Title">Add Category</h1>

            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Category name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={formik.errors.name ? "failure" : undefined}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className={formik.errors.description ? "failure" : undefined}
                />
                <input
                    type="text"
                    name="created_at"
                    placeholder="Created At"
                    value={formik.values.created_at}
                    onChange={formik.handleChange}
                    className={formik.errors.created_at ? "failure" : undefined}
                />
                <button id="categoryAdd-btn" type="submit">Add Category</button>
            </form>

            <h2 className="category-Title">Existing Categories</h2>
            {fetchError && <p className="error">Error: {fetchError}</p>}
            {!fetchError && categories.length === 0 && <p>No categories found.</p>}
            <ul>
                {categories.map((category) => (
                    <li key={category.category_id}>
                        <strong>{category.name}</strong>: {category.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesForm;
