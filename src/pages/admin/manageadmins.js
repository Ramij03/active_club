import React, { useState, useEffect } from 'react';
import { fetchAdmins,createAdmin,deleteAdmin } from '../../components/helper/api';
function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch admins from backend
  useEffect(() => {
    fetchAdmins()
      .then(response => setAdmins(response.data))
      .catch(error => console.log('Error fetching admins:', error));
  }, []);

  const handleAddAdmin = () => {
    createAdmin({
      name,
      email,
      password,
      date_of_birth: dob,
      gender
    })
    .then(() => {
      alert('Admin added successfully');
      window.location.reload();
    })
    .catch(error => console.log('Error adding admin:', error));
  };

  const handleDeleteAdmin = (user_id) => {
    deleteAdmin(user_id)
      .then(() => {
        alert('Admin deleted successfully');
        window.location.reload();
      })
      .catch(error => console.log('Error deleting admin:', error));
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Manage Admins</h1>
      </section>

      <section className="content">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Admins List</h3>
          </div>
          <div className="box-body">
            <table className="table table-nobordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th className= "no-border"></th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.user_id}>
                    <td>{admin.user_id}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.date_of_birth}</td>
                    <td>{admin.gender}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteAdmin(admin.user_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box">
        <div className="box-header with-border">
            <h3 className="box-title">Add Admin</h3>
            <button 
              className="btn btn-primary pull-right"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? '▲' : '▼'} 
            </button>
          </div>
          <div className={`box-body ${isFormVisible ? 'slide-down' : 'slide-up'}`}>
            {isFormVisible && (
            <form onSubmit={(e) => { e.preventDefault(); handleAddAdmin(); }}>
            <div className="form-group">
                <label>Fulll Name</label>
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
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
                <input type="date" className="form-control" value={dob} onChange={e => setDob(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select className="form-control" value={gender} onChange={e => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Add Admin</button>
            </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageAdmins;
