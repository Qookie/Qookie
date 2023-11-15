import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ signedIn }: { signedIn: boolean }): React.ReactElement => {
  const location = useLocation();
  console.log(location, signedIn);

  if (location.pathname === '/' && signedIn) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};
