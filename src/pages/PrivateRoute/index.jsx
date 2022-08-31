import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const { user } = useSelector((state) => state.auth);

    if (user?.item_id)
    {
        return <Outlet />
    } else
    {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute