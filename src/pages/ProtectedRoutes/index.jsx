import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../Home';

function ProtectedRoutes({ children }) {
    const { user } = useSelector((state) => state.auth);
    if (user?.item_id)
    {
        return <Navigate to="/home" />
    } else
    {
        return children
    }

}

export default ProtectedRoutes