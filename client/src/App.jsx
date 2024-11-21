import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
//import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './Default/components/HomePage';
import FindDonations from './Default/components/FindDonations';
import AboutUs from './Default/components/AboutUs';
import ManageDonations from './Default/components/ManageDonations';
import './Admin/styles/dashboard.css';
import Login from './Default/components/Login';
import Categories from './Admin/pages/Categories';
import DonationRequest from './Admin/pages/DonationRequest';
import AdminDashboard from './Admin/pages/AdminDashboard';
import Register from './Default/components/Register';
import Auth from './Donor/components/Auth';
import AuthNGO from './NGO/pages/AuthNGO';
import Home from './NGO/pages/Home';
import NewDonationForm from './NGO/pages/NewDonation';
import DonationHistory from './NGO/pages/DonationHistory';
import Profile from './NGO/pages/Profile';
import Logout from './NGO/pages/Logout';
import Users from "./Admin/pages/Users";
import OrganizationDetails from './Admin/components/OrganizationManagement/OrganizationDetails';
import OrganizationForm from './Admin/components/OrganizationManagement/OrganizationForm';
import OrganizationItem from './Admin/components/OrganizationManagement/OrganizationItem';
import OrganizationList from './Admin/components/OrganizationManagement/OrganizationList';
import DonorHome from './Donor/components/home';
import DonationPage from './Donor/components/DonationPage';
import DonorProfile from './Donor/components/profile';
import Layout from "./Layout";
//import DonorHome from './Donor/components/home';
//import DonationPage from './Donor/components/DonationPage';
import Requests from './Donor/components/donationRequest';
import CategoriesList from './Donor/components/CategoryList';
// import DonorProfile from './Donor/components/profile';

const App = () => {

  return (
    <Router>
      
      <div className="app">
        <canvas id="canvas" />
        <Layout>

        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/request" element={<Requests />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/find-donations" element={<FindDonations />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/donor" element={<Auth />} />
          <Route path="/users/ngo" element={<AuthNGO />} />
          <Route path="/manage-donations" element={<ManageDonations />} />
          <Route path="/ngo" element={<Home />} />
          <Route path="/new-donation" element={<NewDonationForm />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/users" element={<Users />} />
          
          
          <Route path="/admin/organizations" element={<OrganizationList />} />
          <Route path="/admin/organizations/add" element={<OrganizationForm />} /> 
          <Route path="/admin/organizations/edit/:organization_id" element={<OrganizationForm />} /> 
          <Route path="/admin/organization/details" element={<OrganizationDetails />} />
          <Route path="/admin/organization/item" element={<OrganizationItem />} />

          <Route path="/logout" element={<Logout/>} />
          <Route path='/donor' element={<DonorHome/>}/>
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/category" />
          <Route path="/make-donation" element={<DonationPage/>} />
          <Route path="/donor-profile" element={<DonorProfile/>}/>
          <Route path="donor-category" element={<CategoriesList/>}/>
          
          {/* <Route path="/donor-profile" element={<DonorProfile/>}/> */}
          {/* New route */}
        </Routes>
        </Layout>
      </div>
      
    </Router>
  );
};

export default App;
