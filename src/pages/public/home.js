import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Home = () => {
    const [guides, setGuides] = useState([]);
    const [events, setEvents] = useState([]);
    const [memberEvents, setMemberEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const userId = useState(sessionStorage.getItem('user_id') || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [eventsPage, setEventsPage] = useState(1);
    const [eventsPerPage] = useState(9);
    const [memberEventsPage, setMemberEventsPage] = useState(1);
    const [memberEventsPerPage] = useState(9);
    const [guidesPage, setGuidesPage] = useState(1);
    const [guidesPerPage] = useState(9);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (userId) fetchRegisteredEvents();
    }, [userId]);

    const fetchInitialData = async () => {
        try {
            setIsLoading(true);
            const [guidesRes, eventsRes, categoriesRes] = await Promise.all([
                fetchData('fetch_guides'),
                fetchData('fetch_events'),
                fetchData('fetch_categories')
            ]);
            setGuides(guidesRes);
            setEvents(eventsRes);
            setCategories(categoriesRes);
            fetchRegisteredEvents();
        } catch (error) {
            console.error('Error fetching initial data', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async (action, params = '') => {
        const response = await axios.get(`http://localhost/Registrationphp/user.php?action=${action}${params}`);
        return response.data;
    };

    const fetchRegisteredEvents = async () => {
        if (userId) {
            try {
                const data = await fetchData('fetch_registered_events', `&member_id=${userId}`);
                setMemberEvents(data);
            } catch (error) {
                console.error('Error fetching registered events', error);
            }
        }
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setEventsPage(1);
        fetchFilteredEvents(categoryId);
    };

    const handleResetCategory = () => {
        setSelectedCategory(null);
        setEventsPage(1);
        fetchFilteredEvents();
    };

    const fetchFilteredEvents = async (categoryId = null) => {
        try {
            const params = categoryId ? `&category_id=${categoryId}` : '';
            const data = await fetchData('fetch_events', params);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching filtered events', error);
        }
    };

   

    const categoryStyle = (isActive, isAll = false) => ({
        width: '120px',
        height: '120px',
        borderRadius: '30%',
        backgroundColor: isActive ? (isAll ? 'black' : '#007bff') : '#C7C1C1FF',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.3s',
        boxShadow: isActive ? '0 4px 15px rgba(0, 123, 255, 0.5)' : 'none',
        transform: isActive ? 'scale(1.1)' : 'scale(1)',
    });

    const renderCategories = () => (
        <div className="d-flex justify-content-center mb-4 flex-wrap">
            <div
                className={`category-circle mr-4 mb-3 ${!selectedCategory ? 'active' : ''}`}
                onClick={handleResetCategory}
                style={categoryStyle(!selectedCategory, true)}
            >
                <i className="fas fa-tags fa-2x mb-2"></i>
                <span>All</span>
            </div>
            {categories.map(cat => (
                <div
                    key={cat.lookup_id}
                    className={`category-circle ml-2 mr-4 mb-3 ${selectedCategory === cat.lookup_id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat.lookup_id)}
                    style={categoryStyle(selectedCategory === cat.lookup_id)}
                >
                    <i className={getCategoryIcon(cat.name)} style={{ fontSize: '24px', marginBottom: '8px' }}></i>
                    <span style={{ textAlign: 'center' }}>{cat.name}</span>
                </div>
            ))}
        </div>
    );

    const getCategoryIcon = (code) => {
        const iconMap = {
            'Sports Event': 'ion ion-clock',
            'Music Concert': 'fas fa-music',
            'Technology': 'fas fa-laptop-code',
            'Workshop': 'fas fa-book',
            'Business Conference': 'ion ion-pie-graph',
        };
        return iconMap[code] || 'fas fa-tag';
    };

    const handlePageChange = (type, newPage) => {
        switch (type) {
            case 'events':
                setEventsPage(newPage);
                break;
            case 'memberEvents':
                setMemberEventsPage(newPage);
                break;
            case 'guides':
                setGuidesPage(newPage);
                break;
            default:
                break;
        }
    };

    const renderEventsSection = (title, items, currentPage, perPage, pageType) => {
    // Check if 'items' is an array before using 'slice'
    const currentItems = Array.isArray(items) ? items.slice((currentPage - 1) * perPage, currentPage * perPage) : [];
    
    return (
        <section className="mb-5 border p-4 rounded shadow-md">
            <h2 className="mb-4 text-center">{title}</h2>
            <div className="row">
                {isLoading ? (
                    <div className="col-12 text-center">
                        <p>Loading {title.toLowerCase()}...</p>
                    </div>
                ) : error ? (
                    <div className="col-12 text-center">
                        <p>{error}</p>
                    </div>
                ) : currentItems.length > 0 ? (
                    currentItems.map(item => (
                        <div key={item.event_id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-lg">
                                <img
                                    className="card-img-top"
                                    src={`/dist/img/${item.imageUrl}`}
                                    alt={item.name}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <div>
                                            <small className="text-muted">{new Date(item.date_from).toLocaleDateString()}</small>
                                            <i className="far fa-calendar-alt ml-1"></i>
                                        </div>
                                        <span className="badge badge-success">${item.cost}</span>
                                    </div>
                                    <Link to={`/eventdetail/${item.event_id}`} className="btn btn-primary mt-2">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No {title.toLowerCase()} found</p>
                    </div>
                )}
            </div>
        </section>
    );
};

    const renderGuideSection = (title, guides, currentPage, perPage, pageType) => {
        const currentGuides = guides.slice((currentPage - 1) * perPage, currentPage * perPage);
        return (
            <section className="mb-5 border p-4 rounded shadow-md">
                <h2 className="mb-4 text-center">{title}</h2>
                <div className="row">
                    {isLoading ? (
                        <div className="col-12 text-center">
                            <p>Loading guides...</p>
                        </div>
                    ) : error ? (
                        <div className="col-12 text-center">
                            <p>{error}</p>
                        </div>
                    ) : currentGuides.length > 0 ? (
                        currentGuides.map(guide => (
                            <div key={guide.guide_id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-lg">
                                    <img
                                        src={`/dist/img/${guide.image_url}`}
                                        alt="Avatar"
                                        className="img-fluid rounded-circle mx-auto d-block" // Use 'mx-auto' for centering the image
                                        style={{ width: '150px', height: '150px', marginTop: '15px' }} // Add margin-top for spacing above the avatar
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h4 className=" text-center mb-4">{guide.full_name}</h4>
                                        <p className="card-text">Profession: {guide.profession}</p>
                                        <p className="card-text">Experience: {guide.experience} years</p>
                                        <p className="card-text">Phone: {guide.phone_number}</p>
                                        <Link to={`/guidedetail/${guide.guide_id}`} className="btn btn-primary mt-auto">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No guides found</p>
                        </div>
                    )}
                </div>
            </section>
        );
    };
    
    
    return (
        <div className="container">
            <div className="jumbotron text-center bg-primary text-white mb-5">
                <h1 className="display-4">Welcome to City Clique</h1>
                <p className="lead">Discover exciting events, expert guides, and more!</p>
            </div>

            {renderCategories()}

            {renderEventsSection('Events', events, eventsPage, eventsPerPage, 'events')}
            {renderEventsSection('Your Registered Events', memberEvents, memberEventsPage, memberEventsPerPage, 'memberEvents')}
            {renderGuideSection('Guides', guides, guidesPage, guidesPerPage, 'guides')}
        </div>
    );
};

export default Home;
