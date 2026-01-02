import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    // Check if user is already logged in on component mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Get token from localStorage if it exists
                const accessToken = localStorage.getItem('accessToken');

                // Call API to get current user details
                const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/api/user/user-details`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
                    },
                    credentials: 'include', // Important for cookies
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.data);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                // Not setting error here as it's not critical for UX
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Fetch user data after successful login
            const userResponse = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/api/user/user-details`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }); if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.data);
                localStorage.setItem('user', JSON.stringify(userData.data)); // Store user data in localStorage

                // Store access token if available in the response
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken);
                }
            }

            return { success: true };
        } catch (error) {
            setError(error.message || 'An error occurred during login');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };    // Logout function
    const logout = async () => {
        setLoading(true);

        try {
            // Remove user from localStorage first
            localStorage.removeItem('user');

            const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/api/user/logout`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            // Clear all auth data regardless of response
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');

            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear user data even if API fails
            setUser(null);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return { success: true, data };
        } catch (error) {
            setError(error.message || 'An error occurred during registration');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Verify email function
    const verifyEmail = async (code) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Email verification failed');
            }

            return { success: true };
        } catch (error) {
            setError(error.message || 'An error occurred during email verification');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Check if user is authenticated
    if (!user && localStorage.getItem('user')) {
        setUser(JSON.parse(localStorage.getItem('user')));
    }
    const isAuthenticated = !!user;

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        verifyEmail,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
