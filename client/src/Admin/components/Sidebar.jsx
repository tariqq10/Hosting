
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/categories">Categories</NavLink>
      <NavLink to="/admin/donations">Donation Requests</NavLink>
    </div>
  );
};


export default Sidebar;
 