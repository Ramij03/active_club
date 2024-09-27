import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [guides, setGuides] = useState([]);
    const [events, setEvents] = useState([]);
    const [memberEvents, setMemberEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [userId] = useState(sessionStorage.getItem('user_id') || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch initial data
    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = () => {
        Promise.all([
            fetchData('fetch_guides', setGuides),
            fetchData('fetch_events', setEvents),
            fetchData('fetch_categories', setCategories),
            fetchRegisteredEvents(),
        ]).catch((err) => {
            console.error('Error fetching initial data', err);
        });
    };

    const fetchData = (action, setter, params = '') => {
        setIsLoading(true);
        return axios
            .get(`http://localhost/Registrationphp/user.php?action=${action}${params}`)
            .then((response) => {
                setter(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${action}`, error);
                setError(`Error fetching data: ${action}`);
                setIsLoading(false);
            });
    };

    const fetchRegisteredEvents = () => {
        if (userId) {
            fetchData('fetch_registered_events', setMemberEvents, `&member_id=${userId}`)
                .catch((error) => {
                    console.error('Error fetching registered events', error);
                });
        } else {
            setMemberEvents([]);
        }
    };

    return (
        <AppContext.Provider value={{
            guides, 
            events, 
            memberEvents, 
            categories, 
            selectedCategory, 
            setSelectedCategory, 
            isLoading, 
            error
        }}>
            {children}
        </AppContext.Provider>
    );
};
