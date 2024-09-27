import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  if (!token || role !== 'admin') {
    // If not logged in or not an admin, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
