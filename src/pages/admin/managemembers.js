import React, { useState, useEffect } from 'react';
import {
    fetchMembers,
    fetchEvents,
    createMember,
    deleteMember as deleteMemberApi,
} from '../../components/helper/api'; 

function ManageMembers() {
    const [members, setMembers] = useState([]);
    const [events, setEvents] = useState([]);
    const [full_name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setNumber] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch members and events from backend
    const loadData = async () => {
        try {
            const [membersData, eventsData] = await Promise.all([
                fetchMembers(),
                fetchEvents(),
            ]);
            setMembers(membersData.data);
            setEvents(eventsData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Add a new user
    const addUser = async () => {
        try {
            const response = await createMember({
                full_name,
                email,
                mobile_number,
                event_id: selectedEvent,
            });
            alert(response.data.message);
            window.location.reload(); 
        } catch (error) {
            console.error('Error adding user:', error);
            alert('An error occurred while adding the user.');
        }
    };

    // Delete a user
    const deleteUser = async (member_id) => {
        try {
            await deleteMemberApi(member_id);
            alert('User deleted successfully');
            loadData(); // Refresh the member list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Manage Members</h1>
            </section>

            <section className="content">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Member List</h3>
                    </div>
                    <div className="box-body">
                        <table className="table table-nobordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Event</th>
                                    <th className="no-border"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    <tr key={member.member_id}>
                                        <td>{member.member_id}</td>
                                        <td>{member.full_name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.mobile_number}</td>
                                        <td>{member.event_names || 'No events'}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(member.member_id)}>
                                                Delete
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
                        <h3 className="box-title">Add Member</h3>
                        <button 
                            className="btn btn-primary pull-right"
                            onClick={() => setIsFormVisible(!isFormVisible)}
                        >
                            {isFormVisible ? '▲' : '▼'} 
                        </button>
                    </div>

                    <div className={`box-body ${isFormVisible ? 'slide-down' : 'slide-up'}`}>
                        {isFormVisible && (
                            <form onSubmit={(e) => { e.preventDefault(); addUser(); }}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" placeholder="Full Name" value={full_name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Number</label>
                                    <input type="text" className="form-control" value={mobile_number} onChange={e => setNumber(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Event</label>
                                    <select className="form-control" value={selectedEvent} onChange={e => setSelectedEvent(e.target.value)} required>
                                        <option value="">Select an event</option>
                                        {events.map(event => (
                                            <option key={event.event_id} value={event.event_id}>{event.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Member</button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ManageMembers;
