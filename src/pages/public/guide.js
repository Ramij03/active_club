import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Guide() {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  const goToDetailPage = (guideId) => {
    navigate(`/guidedetail/${guideId}`);
  };

  // Fetch guides from backend
  useEffect(() => {
    axios.get('http://localhost/Registrationphp/user.php?action=fetch_guides')
      .then(response => setGuides(response.data))
      .catch(error => console.log('Error fetching guides:', error));
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1 className="text-primary">Guides</h1>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {guides.length > 0 ? (
              guides.map(guide => (
                <div className="col-md-6 col-lg-4 mb-4" key={guide.guide_id}>
                  <div className="card card-outline card-primary">
                    <div className="card-header">
                      <h5 className="card-title">{guide.full_name}</h5>
                    </div>
                    <div className="card-body">
                      <p><strong>Email:</strong> {guide.email}</p>
                      <p><strong>Profession:</strong> {guide.profession}</p>
                      <p><strong>Phone Number:</strong> {guide.phone_number}</p>
                    </div>
                    <div className="card-footer text-center">
                      <button
                        className="btn btn-primary text-white"
                        onClick={() => goToDetailPage(guide.guide_id)}
                      >
                        More Info <i className="fas fa-arrow-circle-right text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-info">No guides available.</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Guide;
