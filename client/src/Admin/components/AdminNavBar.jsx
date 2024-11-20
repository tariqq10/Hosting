import { Link } from "react-router-dom";
import { useState } from "react";
import '../styles/sidebar.css';

const AdminNavBar = () => {
    const [isOpen, setIsOpen] = useState(true); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            
            <div className="hamburger" onClick={toggleSidebar}>
                <span className="material-symbols-outlined">menu</span>
            </div>
            <ul>
                <li>
                    <Link to="/admin">
                        <span className="material-symbols-outlined icon_left">home</span>Home
                    </Link>
                </li>
                <li>
                    <Link to="/categories">
                        <span className="material-symbols-outlined icon_left">category</span>Categories
                    </Link>
                </li>
                <li>
                    <Link to="/request">
                        <span className="material-symbols-outlined icon_left">volunteer_activism</span>Donation Request
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users">
                        <span className="material-symbols-outlined icon_left">group</span>User Management
                    </Link>
                </li>
                <li>
                    <Link to="/admin/organizations">
                        <span className="material-symbols-outlined icon_left">corporate_fare</span>Organization Management
                    </Link>
                </li>
                
            </ul>
        </nav>
    );
};

export default AdminNavBar;
