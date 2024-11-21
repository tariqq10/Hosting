import {Link} from 'react-router-dom'
const DefaultNavbar = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/donor">Donor Dashboard</Link>
          </li>
          <li>
            <Link to="/ngo">NGO Dashboard</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    );

}
export default DefaultNavbar