import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewDonationForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const access = localStorage.getItem("session");

  console.log(JSON.parse(access).access_token)

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_SERVER_URL}/categories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Error", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      target_amount: Yup.string().required("Target Amount is required"),
      category_name: Yup.string().required("Category is required"),
    }),
    initialValues: {
      title: "",
      description: "",
      target_amount: "",
      category_name: "",
      status:"pending",
    },
    onSubmit: async (values) => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(access).access_token}`,
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          target_amount: values.target_amount,
          category_name: values.category_name,
          status: values.status,
        }),
      });

      console.log(values)
      const data = await res.json();

      console.log(data)

      if (Object.keys(data).length > 1) {
        navigate("/new-donation");
      }
    },
  });

  return (
    <div>
      <Navbar />
      <div>
        <h2>Create Donation Request</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />

            <input
              type="number"
              name="target_amount"
              placeholder="Target Amount"
              onChange={formik.handleChange}
              value={formik.values.target_amount}
            />

            <select
              name="category_name"
              value={formik.values.category_name}
              onChange={formik.handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => {
                return (
                  <option
                    key={category.category_id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
            {formik.touched.category_id && formik.errors.category_id ? (
              <div style={{ color: "red" }}>{formik.errors.category_id}</div>
            ) : null}

            <button type="submit">Create Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewDonationForm;
