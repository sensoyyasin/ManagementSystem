import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (!token || !tokenExpiry) {
        return <Navigate to="/login" />;
    }

    const isValidToken = new Date(Number(tokenExpiry)) > new Date();

    // If it's not valid, render it otherwise route the login page
    return isValidToken ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
