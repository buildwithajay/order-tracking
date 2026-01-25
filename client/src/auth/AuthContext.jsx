import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser({
                        ...decoded,
                        // Roles might be a single string or array in the token claim.
                        // Identity usually puts roles in "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                        roles: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || []
                    });
                }
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/account/login', { email, password });
        const { token } = response.data;

        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);

        setUser({
            ...decoded,
            roles: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || []
        });

        return response.data;
    };

    const register = async (userData) => {
        return await api.post('/account/register', userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
