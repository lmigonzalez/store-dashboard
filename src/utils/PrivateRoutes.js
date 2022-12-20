import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';

const PrivateRoutes = () => {
  const auth = useSelector((state) => state.auth.isAuth);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
