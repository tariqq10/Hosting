import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/authAction";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("You have successfully logged out")
    navigate("/login");
  };

  return <button onClick={handleLogout}>LogOut</button>;
};
export default Logout;
