import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        // Ensure user has at least one of the allowed roles
        const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];
        const hasRole = userRoles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            return <Navigate to="/" replace />; // Unauthorized
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
