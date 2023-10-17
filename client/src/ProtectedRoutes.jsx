import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const user = {loogedIn: false}
    return user && user.loogedIn;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
  return (isAuth ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoutes