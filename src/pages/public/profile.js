import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    date_of_birth: '',
    gender: '',
    avatar: '',
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [memberEvents, setMemberEvents] = useState([]);
  const [memberEventsPage, setMemberEventsPage] = useState(1);
  const eventsPerPage = 5;

  const userId = sessionStorage.getItem('user_id');
  
  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get('http://localhost/Registrationphp/user.php', {
          params: {
            action: 'fetch_user_details',
            user_id: userId,
          },
        });

        if (data) {
          setUserDetails(prevDetails => ({ ...prevDetails, ...data }));
        } else {
          setErrors([data.message || 'Failed to fetch user details.']);
        }
      } catch {
        setErrors(['Failed to fetch user details.']);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Update user details
  const updateUser = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
      setErrors(['Invalid email format.']);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost/Registrationphp/user.php', {
        action: 'update_user',
        user_id: userId,  
        name: userDetails.name,
        email: userDetails.email,
      });
  
      if (response.data.status === 'success') {
        setSuccessMessage('Profile updated successfully');
        setErrors([]);
        setIsEditing(false); // Exit edit mode after successful update
      } else {
        setErrors([response.data.message || 'Error updating user.']);
      }
    } catch (error) {
      setErrors(['Error updating user: ' + error.message]);
    }
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setErrors([]);
    setSuccessMessage('');
  };

  // Fetch registered events
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const { data } = await axios.get('http://localhost/Registrationphp/user.php', {
          params: {
            action: 'fetch_registered_events',
            member_id: userId,
          },
        });
        setMemberEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('There was an error fetching the registered events!', error);
        setMemberEvents([]);
      }
    };

    fetchRegisteredEvents();
  }, [userId]);

  // Handle pagination change
  const handleMemberEventsPageChange = (newPage) => {
    setMemberEventsPage(newPage);
  };

  const currentMemberEvents = memberEvents.slice((memberEventsPage - 1) * eventsPerPage, memberEventsPage * eventsPerPage);

  // Pagination controls
  const renderPaginationControls = () => {
    const totalPages = Math.ceil(memberEvents.length / eventsPerPage);
    return (
      <Pagination>
        <Pagination.Prev
          onClick={() => handleMemberEventsPageChange(memberEventsPage - 1)}
          disabled={memberEventsPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={memberEventsPage === index + 1}
            onClick={() => handleMemberEventsPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handleMemberEventsPageChange(memberEventsPage + 1)}
          disabled={memberEventsPage === totalPages}
        />
      </Pagination>
    );
  };

  // Determine avatar based on gender
  const avatarSrc = userDetails.gender === 'Male' ? 'dist/img/g1.png' : 'dist/img/g2.png';

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Your Profile</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Profile</li>
                <li className="breadcrumb-item active">City Clique</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-md">
                <div className="card-body text-center">
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h3 className="mt-3">{userDetails.name}</h3>
                  <h5> {userDetails.email}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-md">
                <div className="card-header bg-primary text-white">
                  <h3 className="card-title mt-2">Profile Details</h3>
                  <button
                    className="btn bg-primary float-right"
                    onClick={toggleEditMode}
                  >
                    {isEditing ? <i className="fas fa-times"></i> : <i className="fas fa-pencil-alt"></i>}
                  </button>
                </div>
                <div className="card-body">
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {errors.length > 0 && (
                    <div className="alert alert-danger">
                      {errors.map((error, index) => <p key={index}>{error}</p>)}
                    </div>
                  )}
                  <form onSubmit={updateUser}>
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name:</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          value={userDetails.name}
                          onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      ) : (
                        <p>{userDetails.name}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      {isEditing ? (
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={userDetails.email}
                          onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      ) : (
                        <p>{userDetails.email}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender:</label>
                      <p>{userDetails.gender}</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth:</label>
                      <p>{userDetails.date_of_birth}</p>
                    </div>
                    {isEditing && (
                      <div className="mt-4">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

           {/* Events You Are a Member Of */}
           <section className="col-lg-12 col-md-12 mb-4">
            <div className="card shadow-lg">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title"><i className="fas fa-user-check mr-2" />Events Registered</h3>
                {renderPaginationControls()}
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {currentMemberEvents.map((event, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{event.name}</h5>
                        <p>{event.description}</p>
                      </div>
                      <small className="text-muted">
                        <i className="far fa-calendar-alt" /> {new Date(event.date_from).toLocaleDateString()}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Profile;
