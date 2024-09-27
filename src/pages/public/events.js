import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Events() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const categoriesResponse = await axios.get('http://localhost/Registrationphp/user.php?action=fetch_categories');
      
      if (Array.isArray(categoriesResponse.data)) {
        setCategories(categoriesResponse.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
      setError('Failed to fetch categories.');
    }
  };

  // Fetch events from backend based on selected category
  const fetchEvents = async (categoryId = '') => {
    setLoading(true);
    try {
      const eventsResponse = await axios.get(`http://localhost/Registrationphp/user.php?action=fetch_events&category_id=${categoryId}`);

      if (Array.isArray(eventsResponse.data)) {
        setEvents(eventsResponse.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.log('Error fetching events:', error);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch initial categories and events
  useEffect(() => {
    fetchCategories();
    fetchEvents(); // Fetch events without filtering initially
  }, []);

  // Handle category change and fetch events based on selected category
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // Fetch events based on selected category
    fetchEvents(categoryId);
  };

  // Navigate to event details
  const handleJoinEvent = (eventId) => {
    navigate(`/eventdetail/${eventId}`);
  };

  if (loading) {
    return <div className="text-center"><i className="fas fa-spinner fa-spin"></i> Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1 className="text-primary">Upcoming Events</h1>
      </section>

      <section className="content">
        <div className="container-fluid">
          {/* Filter Dropdown */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="categoryFilter">Filter by Category:</label>
                <select
                  id="categoryFilter"
                  className="form-control"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.lookup_id} value={category.lookup_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {events.length > 0 ? (
            <div className="row">
              {events.map(event => (
                <div className="col-md-6 col-lg-4 mb-4" key={event.event_id}>
                  <div className="card card-outline card-primary">
                    <div className="card-header">
                      <h5 className="card-title">{event.name}</h5>
                    </div>
                    <div className="card-body">
                      <p><strong>Description:</strong> {event.description}</p>
                      <p><strong>Destination:</strong> {event.destination}</p>
                      <p><strong>Date From:</strong> {new Date(event.date_from).toLocaleDateString()}</p>
                      <p><strong>Date To:</strong> {new Date(event.date_to).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> {event.status}</p>
                    </div>
                    <div className="card-footer text-center">
                      <button onClick={() => handleJoinEvent(event.event_id)} className="btn btn-primary">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center">No events available.</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Events;
