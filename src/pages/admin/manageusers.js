import React, { useState, useEffect } from 'react';
import {
  fetchUsers,
  createUser,
  deleteUser,
} from '../../components/helper/api';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    loadUsers();
  }, []);

  // Add a new user
  const handleAddUser = async () => {
    try {
      await createUser({
        name,
        email,
        password,
        date_of_birth: dob,
        gender,
      });
      alert('User added successfully');
      // Refresh users list
      const response = await fetchUsers();
      setUsers(response.data);
      setName('');
      setEmail('');
      setPassword('');
      setDob('');
      setGender('');
    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (user_id) => {
    try {
      await deleteUser(user_id);
      alert('User deleted successfully');
      // Refresh users list
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Manage Users</h1>
      </section>

      <section className="content">
        <div className="box">
          <div className="box-header with-border">
            <h3 className="box-title">User List</h3>
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
                  <th className="no-border"></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.date_of_birth}</td>
                    <td>{user.gender}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.user_id)}>
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
            <h3 className="box-title">Add User</h3>
            <button 
              className="btn btn-primary pull-right"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? '▲' : '▼'} 
            </button>
          </div>

          <div className={`box-body ${isFormVisible ? 'slide-down' : 'slide-up'}`}>
            {isFormVisible && (
              <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
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
                <button type="submit" className="btn btn-primary">Add User</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageUsers;
