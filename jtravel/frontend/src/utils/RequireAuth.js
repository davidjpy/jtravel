import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth, setRequireLoginAlert } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!auth?.accessToken && location.pathname === '/home/')
      setRequireLoginAlert(true);
  }, [auth?.user, location]);

  return (
    auth?.accessToken 
      ? <Outlet />
      : <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;