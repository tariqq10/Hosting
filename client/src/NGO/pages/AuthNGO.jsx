// import React, { useState } from 'react';
import Swal from "sweetalert2";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import "../styles/Auth.css"; // Ensure your CSS file is imported
import DefaultDashboard from "../../Default/components/DefaultDashboard";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const themes = [
  // Same theme array...
];

const setTheme = (theme) => {
  const root = document.querySelector(":root");
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--color", theme.color);
  root.style.setProperty("--primary-color", theme.primaryColor);
  root.style.setProperty(
    "--glass-color",
    theme.glassColor || "rgba(255, 255, 255, 0.2)"
  );
};

const AuthNGO = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      role: Yup.string().required("Please input your role"),
      organization_name: Yup.string().required("Organization name is required"),
      organization_description: Yup.string().required("Description is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string().required("Role is required"),
      organization_address: Yup.string().required("Address is required"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    initialValues: {
      role:"",
      organization_name: "",
      organization_description: "",
      email: "",
      password: "",
      confirm_password: "",
      organization_address: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
    onSubmit: async (values) => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: values.role,
          organization_name: values.organization_name,
          organization_description: values.organization_description,
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
          organization_address: values.organization_address,
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
        }),
      });
      const data = await res.json();
      console.log(data)

      if (data?.access_token) {
        toast.success(data.message);
        localStorage.setItem("session", JSON.stringify(data));
        navigate("/ngo");
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleRole = (event) => {
    const selectedRole = event.target.value;

    formik.setFieldValue("role", selectedRole);

    if (selectedRole === "donor") {
      navigate("/register");
    }
  };

  


  return (
    <div className="auth-container">
      <DefaultDashboard />

      <div className="card-3d-wrap mx-auto">
        <div className="card-3d-wrapper">
          {/* Register Card */}
          <div >
            <div className="center-wrap">
              <h4>Register</h4>
              <form onSubmit={formik.handleSubmit}>


                <select>
                  type="text"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.first_name}
                  color={formik.errors.role ? "failure" : undefined}
                  
                  <option value="" disabled>Select Role</option>
                  <option value="ngo">NGO</option>
                  <option value="donor">Donor</option>
                </select>

                <input
                  type="text"
                  name="organization_name"
                  placeholder="Organization Name"
                  value={formik.values.organization_name}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.organization_name}
                  color={
                    formik.errors.organization_name ? "failure" : undefined
                  }
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.email}
                  color={formik.errors.email ? "failure" : undefined}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.password}
                  color={formik.errors.password ? "failure" : undefined}
                />

                <input
                  type="password"
                  name="confirm_password"
                  placeholder="confirmation Password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.confirm_password}
                  color={formik.errors.confirm_password ? "failure" : undefined}
                />

                <input
                  type="text"
                  name="organization_address"
                  placeholder="Organization Address"
                  value={formik.values.organization_address}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.organization_address}
                  color={
                    formik.errors.organization_address ? "failure" : undefined
                  }
                />

                <input
                  type="text"
                  name="first_name"
                  placeholder="Contact Person First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.first_name}
                  color={formik.errors.first_name ? "failure" : undefined}
                />

                <input
                  type="text"
                  name="last_name"
                  placeholder="Contact Person Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.last_name}
                  color={formik.errors.last_name ? "failure" : undefined}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.phone}
                  color={formik.errors.phone ? "failure" : undefined}
                />

                <button type="submit">Register</button>
              </form>
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>

              {/* Social Media Buttons */}
              <div className="social-btns">
                <button className="social-btn google">
                  <FaGoogle /> Google
                </button>
                <button className="social-btn facebook">
                  <FaFacebook /> Facebook
                </button>
                <button className="social-btn github">
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Buttons at the Bottom */}
      <div className="theme-btn-container">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="theme-btn"
            onClick={() => setTheme(theme)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AuthNGO;
