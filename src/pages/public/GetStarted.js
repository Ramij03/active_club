import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { AppContext } from '../../components/helper/UseContext';

const GetStarted = () => {
    const { guides, events, categories, setGuides, setEvents, setCategories } = useContext(AppContext); // Access context data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = () => {
        setIsLoading(true);
        Promise.all([
            fetchData('fetch_guides', setGuides),
            fetchData('fetch_events', setEvents),
            fetchData('fetch_categories', setCategories),
        ]).catch(error => {
            console.error('Error fetching initial data', error);
            setIsLoading(false);
        });
    };

    const fetchData = (action, setState, params = '') => {
        return axios.get(`http://localhost/Registrationphp/user.php?action=${action}${params}`)
            .then(response => {
                setState(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(`Error fetching ${action}`, error);
                setError(`Error fetching ${action}`);
                setIsLoading(false);
            });
    };

    const renderCategories = () => {
        return (
            <div className="d-flex justify-content-center mb-4 flex-wrap">
                {categories.map(cat => (
                    <div
                        key={cat.lookup_id}
                        className="card p-3 text-center"
                        style={categoryStyle()}
                    >
                        <i className={getCategoryIcon(cat.name)} style={{ fontSize: '30px', marginBottom: '8px' }}></i>
                        <h5>{cat.name}</h5>
                    </div>
                ))}
            </div>
        );
    };

    const categoryStyle = () => ({
        width: '140px',
        height: '140px',
        borderRadius: '15%',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0, 123, 255, 0.5)',
    });

    const getCategoryIcon = (categoryName) => {
        const iconMap = {
            'Sports Event': 'ion ion-clock',
            'Music Concert': 'fas fa-music',
            'Technology': 'fas fa-laptop-code',
            'Workshop': 'fas fa-book',
            'Business Conference': 'ion ion-pie-graph',
        };
        return iconMap[categoryName] || 'fas fa-tag';
    };

    return (
        <div className="get-started-page col-lg-12 mt-1">
            <div className="jumbotron text-center bg-primary text-white mb-4">
                <h1 className="display-4">Welcome to City Clique</h1>
                <p className="lead">Explore our wide range of events and guides.</p>
            </div>
            
            {/* Statistics */}
            <section className="statistics text-center mb-4">
                <div className="row justify-content-center">
                    <h3 className="mb-4">Our Team</h3>
                    <div className="col-md-3">
                        <div className="card p-4 bg-dark shadow-lg rounded">
                            <h3>{events.length}+</h3>
                            <p>Events Available</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card p-4 bg-dark shadow-lg rounded">
                            <h3>{guides.length}+</h3>
                            <p>Professional Guides</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories mb-5 text-center">
                <h2>Explore by Categories</h2>
                {renderCategories()}
            </section>

            {/* Get Started Button */}
            <div className="text-center mb-5">
                <Link to="/register" className="btn btn-primary btn-lg">Let's Get Started <i className="fas fa-arrow-circle-right"></i></Link>
            </div>

        </div>
    );
};

export default GetStarted;
