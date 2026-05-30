import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Guards a route. Requires a stored JWT; if `requiredRole` is given, the stored
 * role must match. This is a client-side convenience only — the backend still
 * enforces authorization on every request.
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Logged in but lacking the required role.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
