import '../styles/Login.css';
import DefaultDashboard from './DefaultDashboard';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate()

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
      // console.log('Form submitted', values)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data)

      if (data?.access_token) {
        toast.success(data.message);

        localStorage.setItem("session", JSON.stringify(data));

        const {role} = data.user
        console.log('User role:', role);

        if(role === "donor"){
          navigate("/donor")
        } else if (role === "ngo"){
          navigate("/ngo")
        } else if(role === "admin") {
          navigate("/admin")
        } else {
          toast.error("Invalid Email/Password")
        }

      } else {
        console.log("Error message:",data.message)
        toast.error(data.message)
      }
    }
  })

  return (
    <div className="section full-height">
      <DefaultDashboard />
      <div className="card-3d-wrap">
        <div className="card-3d-wrapper">
          {/* Front of the card: Login Form */}
          <div>
            <div className="center-wrap">
              <h2>Login</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helpertext={formik.errors.email}
                    color={formik.errors.email ? "failure" : undefined}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    helpertext={formik.errors.password}
                    color={formik.errors.password ? "failure" : undefined}
                    // className="form-style"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn">
                    Login
                  </button>
                </div>
              </form>
              <p>
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
