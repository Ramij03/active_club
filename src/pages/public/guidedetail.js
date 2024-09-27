import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function GuideDetail() {
  const { guideId } = useParams();
  const [guide, setGuide] = useState(null);
  const [avatar, setAvatar] = useState('dist/img/avatar5.png');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost/Registrationphp/user.php?action=fetch_guide_details&guide_id=${guideId}`)
      .then(response => {
        setGuide(response.data);
        // Set the avatar to the guide's photo URL if it exists
        if (response.data.photo) {
          setAvatar(`http://localhost/Registrationphp/${response.data.photo}`); // Update to the correct URL
        }
      })
      .catch(error => {
        console.error('Error fetching guide details:', error);
      });
  }, [guideId]);

  const handleJoinEvent = (eventId) => {
    navigate(`/eventdetail/${eventId}`);
  };

  if (!guide) return <div className="text-center">Loading...</div>;

  return (
    <div className="content-wrapper">
      <section className="content ">
        <div className="container-fluid">
          <div className="row">
            {/* Guide Profile Card */}
            <div className="col-md-4 mt-5">
              <div className="card card-outline card-primary">
                <div className="card-body text-center">
                  <img
                    src={`/dist/img/${guide.image_url}`}
                    alt="Avatar"
                    className="img-fluid rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h3 className="mt-3">{guide.full_name}</h3>
                  <p className="text-muted">{guide.profession}</p>
                </div>
              </div>
            </div>

            {/* Guide Details */}
            <div className="col-md-8 mt-5">
              <div className="card card-outline card-info">
                <div className="card-header">
                  <h4 className="card-title">Guide Information</h4>
                </div>
                <div className="card-body">
                  <p><strong>Email:</strong> {guide.email}</p>
                  <p><strong>Phone:</strong> {guide.phone_number}</p>
                  <p><strong>Profession:</strong> {guide.profession}</p>
                  <p><strong>Experience:</strong> {guide.experience} years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Events Table */}
          <div className="card card-outline card-primary mt-4">
            <div className="card-header">
              <h4 className="card-title">Assigned Events</h4>
            </div>
            <div className="card-body ">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date From</th>
                    <th>Destination</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.events.map(event => (
                    <tr key={event.event_id}>
                      <td>{event.name}</td>
                      <td>{new Date(event.date_from).toLocaleDateString()}</td>
                      <td>{event.destination}</td>
                      <td>
                        <button
                          onClick={() => handleJoinEvent(event.event_id)}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GuideDetail;
