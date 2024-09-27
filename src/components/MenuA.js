import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

const MenuA = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [name, setName] = useState('');
  const [setError] = useState([]);
  const userId = sessionStorage.getItem('user_id');
  
  const handleLogout = () => {
    // Clear session data
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('user_id');
    // Redirect to login page
    navigate('/login');
  };
  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        console.log(`Fetching user details for user_id: ${userId}`); // Debug log
        const response = await axios.get('http://localhost/Registrationphp/user.php', {
          params: {
            action: 'fetch_user_details',
            user_id: userId
          }
        });
        console.log('User details response:', response.data); // Debug log

        // Check if the response data is in the expected format
        if (response.data) {
          setName(response.data.name);
          
        } else {
          // If the response doesn't have full_name or email, set a descriptive error
          setError(response.data.message || 'Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error); // Debug log
        setError('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <h4 href="index.html" className="brand-link">
          <img src="dist/img/cap1zoom.png" alt="C Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">City Clique</span>
        </h4>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/avatar5.png" className="img-circle elevation-2" alt="User Profile" />
            </div>
            <div className="info">
              <h5 className="d-block text-white ">{name}</h5>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item has-treeview">
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-gear" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <Link to="/manageevents" className={`nav-link ${location.pathname === '/manageevents' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Events</p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <Link to="/manageguides" className={`nav-link ${location.pathname === '/manageguides' ? 'active' : ''}`}>
                  <i className="nav-icon ion ion-person" />
                  <p>Guides</p>
                </Link>
              </li>
              {/* Link to About Us */}
              <li className="nav-item">
                <Link to="/managemembers" className={`nav-link ${location.pathname === '/managemembers' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-person" />
                  <p>Members</p>
                </Link>
              </li>
              {/* Log Out */}
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>Log Out</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default MenuA;
