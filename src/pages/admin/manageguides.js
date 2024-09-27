import React, { useState, useEffect } from 'react';
import { fetchGuides, createGuide, deleteGuide } from '../../components/helper/api';

function ManageGuides() {
  const [guide, setGuides] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [profession, setProfession] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [experience, setExperience] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchGuides()
      .then(response => setGuides(response.data))
      .catch(error => console.log('Error fetching guides:', error));
  }, []);

  const handleAddGuide = async () => {
    try {
      const response = await createGuide({
        full_name: fullName,
        email,
        password,
        date_of_birth: dateOfBirth,
        joining_date: joiningDate,
        profession,
        phone_number: phoneNumber,
        experience,
        image_url: imageUrl
      });
    
      if (response.data.status === 'success') { // Use response.data
        alert('Guide added successfully');
        const updatedGuides = await fetchGuides(); // Refresh the guides list
        setGuides(updatedGuides.data); // Update the state
        // Reset form fields
        setFullName('');
        setEmail('');
        setPassword('');
        setDateOfBirth('');
        setJoiningDate('');
        setProfession('');
        setPhoneNumber('');
        setExperience('');
        setimageUrl('');
      } else {
        alert('Error: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.log('Error adding guide:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  
  

  const handleDeleteGuide = async (guide_id) => {
    try {
      await deleteGuide(guide_id);
      alert('Guide deleted successfully');

      // Refresh the list without reloading
      const updatedGuides = await fetchGuides();
      setGuides(updatedGuides.data);
    } catch (error) {
      console.log('Error deleting guide:', error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Manage Guides</h1>
      </section>

      <section className="content">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Guides List</h3>
          </div>
          <div className="box-body">
            <table className="table table-nobordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Profession</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {guide.map(guide => (
                  <tr key={guide.guide_id}>
                    <td>{guide.guide_id}</td>
                    <td>{guide.full_name}</td>
                    <td>{guide.email}</td>
                    <td>{guide.profession}</td>
                    <td>{guide.phone_number}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteGuide(guide.guide_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">Add Guides</h3>
            <button 
              className="btn btn-primary pull-right"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? '▲' : '▼'} 
            </button>
          </div>
          <div className={`box-body ${isFormVisible ? 'slide-down' : 'slide-up'}`}>
            {isFormVisible && (
              <form onSubmit={(e) => { e.preventDefault(); handleAddGuide(); }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" className="form-control" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Joining Date</label>
                  <input type="date" className="form-control" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Photo URL</label>
                  <input type="text" className="form-control" value={imageUrl} onChange={e => setimageUrl(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Profession</label>
                  <input type="text" className="form-control" value={profession} onChange={e => setProfession(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Experience</label>
                  <input type="number" className="form-control" value={experience} onChange={e => setExperience(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Guide</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageGuides;
