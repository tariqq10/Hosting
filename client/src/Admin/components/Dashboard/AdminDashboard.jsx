import { Routes, Route } from "react-router-dom";
import AdminNavBar from "../AdminNavBar";
import Categories from "../../pages/Categories";
import DonationRequest from "../../pages/DonationRequest";
import Sidebar from "../Sidebar"; 

const AdminDashboard = () => {
  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <Sidebar /> 
        <div className="dashboard-main-content">
          <Routes>
           
            <Route path="/admin" element={<h2>Admin Dashboard</h2>} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/donations" element={<DonationRequest />} />
          </Routes>
        </div>
      </div> 
    </div>
  );
}

export default AdminDashboard;
