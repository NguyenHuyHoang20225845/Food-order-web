import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('authToken');
    const loginData = localStorage.getItem('loginData');
    const parsedLoginData = loginData ? JSON.parse(loginData) : null;

    const isAuthenticated = Boolean(token);
    const hasRole = requiredRole
        ? parsedLoginData?.role === requiredRole
        : true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!hasRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
