import Swal from "sweetalert2";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import "../styles/Register.css";
import DefaultDashboard from "../../Default/components/DefaultDashboard";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Define the baseURL constant
const baseURL = import.meta.env.VITE_SERVER_URL;

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

const Auth = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      role: Yup.string().required("Role is required"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string().required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string().required("Role is required").oneOf([Yup.ref('password'), null], "Passwords must match"),
    }),
    initialValues: {
      role: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values) => {
      const res = await fetch(`${baseURL}/users`, { // Use baseURL here
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: values.role,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirm_password: values.confirm_password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error:", errorData); // Log the error response
        toast.error(errorData.message || "Registration failed.");
        return;
      }
      const data = await res.json();
      console.log(data);

      if (data?.access_token) {
        toast.success(data.message);
        localStorage.setItem("session", JSON.stringify(data));
        navigate("/donor");
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleRole = (event) => {
    const selectedRole = event.target.value;

    formik.setFieldValue('role', selectedRole);

    if (selectedRole === "ngo") {
      navigate("/users/ngo");
    }
  };

  return (
    <div className="auth-container">
      <DefaultDashboard />

      <div className="card-3d-wrap mx-auto">
        <div className="card-3d-wrapper">
          <div className="card-back">
            <div className="center-wrap">
              <h4>Register</h4>
              <form onSubmit={formik.handleSubmit}>
                
                <select
                  type="text"
                  name="role"
                  value={formik.values.role}
                  onChange={handleRole}
                  helpertext={formik.errors.first_name}
                  color={formik.errors.role ? "failure" : undefined}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="ngo">NGO</option>
                  <option value="donor">Donor</option>
                </select>

                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.first_name}
                  color={formik.errors.first_name ? "failure" : undefined}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.last_name}
                  color={formik.errors.last_name ? "failure" : undefined}
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
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.phone}
                  color={formik.errors.phone ? "failure" : undefined}
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
                  placeholder="Confirmation Password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  helpertext={formik.errors.confirm_password}
                  color={formik.errors.confirm_password ? "failure" : undefined}
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

export default Auth;
