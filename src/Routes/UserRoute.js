import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  if (!token || role === 'admin') {
    // If not logged in or the user is an admin, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;

