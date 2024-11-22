import '../styles/Login.css';
import DefaultDashboard from './DefaultDashboard';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';

// Hardcoding the URL directly
const baseURL = 'https://hosting-33ri.onrender.com';  // Hardcoded URL

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${baseURL}/login`, {  // Using the hardcoded URL here
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (data?.access_token) {
          toast.success(data.message);
          localStorage.setItem("session", JSON.stringify(data));

          const { role } = data.user;
          if (role === "donor") {
            navigate("/donor");
          } else if (role === "ngo") {
            navigate("/ngo");
          } else if (role === "admin") {
            navigate("/admin");
          } else {
            toast.error("Invalid Email/Password");
          }

        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("An error occurred while logging in. Please try again.");
      }
    }
  });

  return (
    <div className="section full-height" id="login-container">
      <DefaultDashboard />
      <div className="card-3d-wrap" id="login-card-wrap">
        <div className="card-3d-wrapper">
          {/* Front of the card: Login Form */}
          <div id="login-card-front">
            <div className="center-wrap">
              <h2 id="login-heading">Login</h2>
              <form onSubmit={formik.handleSubmit} id="login-form">
                <div className="form-group" id="email-group">
                  <input
                    type="text"
                    name="email"
                    id="email-input"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helpertext={formik.errors.email}
                    color={formik.errors.email ? "failure" : undefined}
                  />
                </div>
                <div className="form-group" id="password-group">
                  <input
                    type="password"
                    name="password"
                    id="password-input"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    helpertext={formik.errors.password}
                    color={formik.errors.password ? "failure" : undefined}
                  />
                </div>
                <div className="form-group" id="submit-group">
                  <button type="submit" className="btn" id="submit-btn">
                    Login
                  </button>
                </div>
              </form>
              <p id="signup-link">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
