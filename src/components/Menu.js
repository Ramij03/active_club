import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setError] = useState([]);
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
        console.log(`Fetching user details for user_id: ${userId}`);
        const response = await axios.get('http://localhost/Registrationphp/user.php', {
          params: {
            action: 'fetch_user_details',
            user_id: userId
          }
        });
        console.log('User details response:', response.data);

        if (response.data) {
          setName(response.data.name);
          setGender(response.data.gender);
        } else {
          setError(response.data.message || 'Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, [userId]);

  const avatarSrc = gender === 'Male' ? 'dist/img/g1.png' : 'dist/img/g2.png';

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index.html" className="brand-link">
          <img src="dist/img/cap1zoom.png" alt="C Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">City Clique</span>
        </a>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src={avatarSrc} className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <Link to="/profile" className="d-block text-white">{name}</Link>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item has-treeview">
                <Link to="/home" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-home" />
                  <p>HomePage</p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <Link to="/event" className={`nav-link ${location.pathname === '/event' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Events</p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <Link to="/guide" className={`nav-link ${location.pathname === '/guide' ? 'active' : ''}`}>
                  <i className="nav-icon ion ion-person" />
                  <p>Guides</p>
                </Link>
              </li>
              {/* Link to About Us */}
              <li className="nav-item">
                <Link to="/aboutus" className={`nav-link ${location.pathname === '/aboutus' ? 'active' : ''}`}>
                  <i className="nav-icon fas fa-info-circle" />
                  <p>About Us</p>
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

export default Menu;
