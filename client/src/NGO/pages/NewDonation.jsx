import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";  // Corrected import path
import { useFormik } from "formik";
import * as Yup from "yup";

const NewDonationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const access = localStorage.getItem("session");

  console.log(JSON.parse(access).access_token);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/categories")  // Use relative path since baseURL is already set
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Error fetching categories:", res);
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
      status: "pending",
    },
    onSubmit: async (values) => {
      const res = await axiosInstance.post("/requests", {
        title: values.title,
        description: values.description,
        target_amount: values.target_amount,
        category_name: values.category_name,
        status: values.status,
      }, {
        headers: {
          "Authorization": `Bearer ${JSON.parse(access).access_token}`,
        },
      });

      console.log(values);
      const data = res.data;

      console.log(data);

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
            {formik.touched.category_name && formik.errors.category_name ? (
              <div style={{ color: "red" }}>{formik.errors.category_name}</div>
            ) : null}

            <button type="submit">Create Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDonationForm;
