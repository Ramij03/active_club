import React, { useState, useEffect } from 'react';
import {
    fetchEvents,
    fetchCategories,
    fetchGuides,
    createEvent,
    deleteEvent as deleteEventApi,
    updateEventGuide,
} from '../../components/helper/api';

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [destination, setDestination] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [cost, setCost] = useState('');
    const [status, setStatus] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [guides, setGuides] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState('');
    const [currentEventId, setCurrentEventId] = useState(null);
    const [guideToAdd, setGuideToAdd] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch events, categories, and guides
    const loadData = async () => {
        try {
            const [eventsData, categoriesData, guidesData] = await Promise.all([
                fetchEvents(),
                fetchCategories(),
                fetchGuides(),
            ]);
            setEvents(eventsData.data);
            setCategories(categoriesData.data);
            setGuides(guidesData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Add a new event
    const addEvent = async () => {
        try {
            await createEvent({
                name,
                description,
                category_id,
                destination,
                date_from: dateFrom,
                date_to: dateTo,
                cost,
                status,
                imageUrl,
                guide_id: selectedGuide,
            });
            alert('Event added successfully');
            window.location.reload(); 
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    // Delete an event
    const deleteEvent = async (event_id) => {
        try {
            await deleteEventApi(event_id);
            alert('Event deleted successfully');
            loadData();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Update event guide
    const handleAddGuideToEvent = async () => {
        if (currentEventId && guideToAdd) {
            try {
                await updateEventGuide(currentEventId, guideToAdd);
                alert('Guide added successfully to the event');
                setIsModalOpen(false);
                loadData(); // Refresh events list
            } catch (error) {
                console.error('Error adding guide to event:', error);
            }
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Manage Events</h1>
            </section>

            <section className="content">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Events List</h3>
                    </div>
                    <div className="box-body">
                        <table className="table table-nobordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Destination</th>
                                   <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.event_id}>
                                        <td>{event.event_id}</td>
                                        <td>{event.name}</td>
                                        <td>{event.description}</td>
                                        <td>{event.destination}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteEvent(event.event_id)}>
                                                <i className="fas fa-minus"></i> Delete
                                            </button>
                                            <button className="btn btn-primary m-1" onClick={() => {
                                                setCurrentEventId(event.event_id);
                                                setGuideToAdd('');
                                                setIsModalOpen(true);
                                            }}>
                                                <i className="fas fa-plus"></i> Guide
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Add Events</h3>
                        <button 
                            className="btn btn-primary pull-right"
                            onClick={() => setIsFormVisible(!isFormVisible)}
                        >
                            {isFormVisible ? '▲' : '▼'} 
                        </button>
                    </div>
                    <div className={`box-body ${isFormVisible ? 'slide-down' : 'slide-up'}`}>
                        {isFormVisible && (
                        <form onSubmit={(e) => { e.preventDefault(); addEvent(); }}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" value={category_id} onChange={e => setCategoryId(e.target.value)} required>
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.lookup_id} value={category.lookup_id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Destination</label>
                                <input type="text" className="form-control" value={destination} onChange={e => setDestination(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Date From</label>
                                <input type="date" className="form-control" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Date To</label>
                                <input type="date" className="form-control" value={dateTo} onChange={e => setDateTo(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Cost</label>
                                <input type="number" className="form-control" value={cost} onChange={e => setCost(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Guide</label>
                                <select className="form-control" value={selectedGuide} onChange={e => setSelectedGuide(e.target.value)} required>
                                    <option value="">Select Guide</option>
                                    {guides.map(guide => (
                                        <option key={guide.guide_id} value={guide.guide_id}>
                                            {guide.full_name} - {guide.profession}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <input type="text" className="form-control" value={status} onChange={e => setStatus(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Image Url</label>
                                <input type="text" className="form-control" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Event</button>
                        </form>
                        )}
                    </div>
                </div>

                {/* Modal for adding guide */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                            <h3>Add Guide to Event ID: {currentEventId}</h3>
                            <select value={guideToAdd} onChange={e => setGuideToAdd(e.target.value)}>
                                <option value="">Select Guide</option>
                                {guides.map(guide => (
                                    <option key={guide.guide_id} value={guide.guide_id}>
                                        {guide.full_name} - {guide.profession}
                                    </option>
                                ))}
                            </select>
                            <button className="mt-1" onClick={handleAddGuideToEvent}>Add to Event</button>
                        </div>
                    </div>
                )}
            </section>

            <style jsx>{`
                .modal {
                    display: flex;
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0, 0, 0, 0.5);
                    justify-content: center;
                    align-items: center;
                }
                .modal-content {
                    background-color: #fefefe;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                    max-width: 500px;
                    border-radius: 4px;
                }
                .close {
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default ManageEvents;
