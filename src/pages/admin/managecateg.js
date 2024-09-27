import React, { useState, useEffect } from 'react';
import {
    fetchCategories,
    addLookup,
    deleteLookup,
} from '../../components/helper/api'

function ManageCateg() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errors, setError] = useState('');

    // Fetch categories from backend
    const loadCategories = async () => {
        try {
            const response = await fetchCategories();
            console.log('Fetched categories:', response.data); // For debugging
            setCategories(response.data || []);
        } catch (error) {
            console.log('Error fetching categories:', error);
            setError('Failed to fetch categories.');
        }
    };

    // Effect to fetch initial categories
    useEffect(() => {
        loadCategories();
    }, []);

    // Handle adding a new lookup
    const handleAddLookup = async (e) => {
        e.preventDefault();
        console.log("Adding lookup:", { name, code }); // Debug log

        // Check if the lookup already exists in the current list
        const existingLookup = categories.find(cat => cat.name === name && cat.code === code);
        if (existingLookup) {
            setError('Lookup with the same name and code already exists.');
            return;
        }

        try {
            const response = await addLookup({ name, code });
            console.log("Response from server:", response.data); // Debug log
            if (response.data.status === 'success') {
                setCategories([...categories, response.data.new_lookup]);
                setName(''); // Clear the form after successful addition
                setCode(''); // Clear the form after successful addition
                loadCategories(); // Refresh categories
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error adding lookup:", error); // Debug log
            setError('Failed to add lookup.');
        }
    };

    // Handle deleting a lookup
    const handleDeleteLookup = async (lookupId) => {
        try {
            const response = await deleteLookup(lookupId); // Pass lookupId directly
            console.log("Delete response:", response.data);
            if (response.data.status === 'success') {
                setCategories(categories.filter(cat => cat.lookup_id !== lookupId));
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error deleting lookup:", error);
            setError('Failed to delete lookup.');
        }
    };
    
    

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Manage Lookups</h1>
            </section>
    
            <section className="content">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Lookups List</h3>
                    </div>
                    <div className="box-body">
                        <table className="table table-nobordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(cat => (
                                    <tr key={cat.lookup_id}>
                                        <td>{cat.lookup_id}</td>
                                        <td>{cat.name}</td>
                                        <td>{cat.code}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDeleteLookup(cat.lookup_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
    
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Add Lookup</h3>
                        <button 
                            className="btn btn-primary pull-right"
                            onClick={() => setIsFormVisible(!isFormVisible)}
                        >
                            {isFormVisible ? '▲' : '▼'} 
                        </button>
                    </div>
                    <div className={`box-body ${isFormVisible ? 'slide-down' : 'slide-up'}`}>
                        {isFormVisible && (
                        <form onSubmit={handleAddLookup}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Code</label>
                                <input type="text" className="form-control" value={code} onChange={e => setCode(e.target.value)} required />
                            </div>
                            
                            <button type="submit" className="btn btn-primary">Add Lookup</button>
                        </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ManageCateg;
