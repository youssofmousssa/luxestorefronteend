import React from 'react';
import { Navigate } from 'react-router-dom';
import Admin from './Admin';

// Protects /admin route: only admin can access, others redirected
const ProtectedAdmin = () => {
  try {
    const user = JSON.parse(localStorage.getItem('luxe_user') || '{}');
    if (user.role === 'admin') {
      return <Admin />;
    }
  } catch {}
  return <Navigate to="/login" replace />;
};

export default ProtectedAdmin;
