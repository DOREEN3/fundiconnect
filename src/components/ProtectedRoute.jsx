import React from 'react'
import { Navigate , Outlet } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const ProtectedRoute = ({allowedRoles}) => {
  const {user}=useAuth();
  
  if(!user){
    return <Navigate to="/login" replace/>;
  }
  if(!allowedRoles.include(user.role)){
    return <Navigate to="/unauthorized" replace/>;

  }
  return <Outlet/>;
};

export default ProtectedRoute