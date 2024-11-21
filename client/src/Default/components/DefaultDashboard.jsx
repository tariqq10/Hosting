import {Link} from 'react-router-dom';

const DefaultDashboard = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/" aria-label="Home">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li>
            <Link to="/about" aria-label="About Us">
              <i className="fas fa-info-circle"></i> About Us
            </Link>
          </li>
          <li>
            <Link to="/find-donations" aria-label="Find Donations">
              <i className="fas fa-search"></i> Find Donations
            </Link>
          </li>
          <li>
            <Link to="/register" aria-label="Register">
              <i className="fas fa-user-plus"></i> Register
            </Link>
          </li>
          <li>
            <Link to="/login" aria-label="Login">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          </li>
        </ul>
      </nav>
    );
    

}
export default DefaultDashboard;