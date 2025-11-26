import { useAuth } from 'Context/Auth';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
    const { isLoggedIn } = useAuth() ?? { isLoggedIn: false };
    const location = useLocation();
    
    return (
        isLoggedIn ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute