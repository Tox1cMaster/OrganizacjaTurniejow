import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AuthUser from './components/AuthUser';

const ProtectedRoutes = () => {
  const {getToken} = AuthUser();
  return (getToken() ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoutes