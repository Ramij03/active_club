import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get('http://localhost/Registrationphp/user.php', {
          params: { action: 'fetch_event', event_id: eventId },
        });
        if (response.data?.event_id) {
          setEvent(response.data);
        } else {
          setError('Event not found.');
        }
      } catch {
        setError('Failed to fetch event details.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost/Registrationphp/user.php', {
          params: { action: 'fetch_user_details', user_id: userId },
        });
        if (response.data) {
          setMemberName(response.data.name);
          setMemberEmail(response.data.email);
        } else {
          setError(response.data.message || 'Failed to fetch user details.');
        }
      } catch {
        setError('Failed to fetch user details.');
      }
    };
    fetchUserDetails();
  }, [userId]);

  const joinEvent = async (e) => {
    e.preventDefault();
    if (!memberName || !memberEmail || !mobileNumber) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost/Registrationphp/user.php', {
        action: 'join_event',
        member_id: userId,
        event_id: eventId,
        member_name: memberName,
        member_email: memberEmail,
        mobile_number: mobileNumber,
      });
      if (response.data.status === 'success') {
        alert('You have successfully joined the event!');
        navigate('/home');
      } else {
        alert(response.data.message || 'Failed to join the event.');
      }
    } catch {
      alert('Failed to join the event.');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!event) {
    return <div className="text-center">No event found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="text-primary">{event.name}</h1>
        <p className="lead">
          {new Date(event.date_from).toLocaleDateString()} - {new Date(event.date_to).toLocaleDateString()}
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header-sm">
              <img src={`/dist/img/${event.imageUrl}`} alt={event.name} className="card-img-top-sm" />
            </div>
            <div className="card-body">
              
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Destination:</strong> {event.destination}</p>
              <p><strong>Cost:</strong> ${event.cost}</p>
              <p><strong>Status:</strong> {event.status}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Join Event</h5>
            </div>
            <div className="card-body">
              <form onSubmit={joinEvent}>
                <div className="form-group">
                  <label htmlFor="memberName">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="memberName" 
                    value={memberName} 
                    readOnly 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="memberEmail">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="memberEmail" 
                    value={memberEmail} 
                    readOnly 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="mobileNumber" 
                    placeholder="Mobile Number" 
                    value={mobileNumber} 
                    onChange={(e) => setMobileNumber(e.target.value)} 
                    required 
                  />
                </div>
               
                <button type="submit" className="btn btn-primary btn-block">Join Event</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
