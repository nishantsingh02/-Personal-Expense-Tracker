import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/axios';
import { User, AuthResponse } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Initialize auth state from localStorage synchronously
const getInitialAuthState = () => {
  try {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('Initial auth check - Token exists:', !!storedToken);
    console.log('Initial auth check - User exists:', !!storedUser);
    
    if (storedToken && storedUser) {
      // Set axios header immediately
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      
      return {
        isAuthenticated: true,
        user: JSON.parse(storedUser) as User,
        token: storedToken
      };
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
  }
  
  return {
    isAuthenticated: false,
    user: null,
    token: null
  };
};

const initialAuthState = getInitialAuthState();

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState.isAuthenticated);
  const [user, setUser] = useState<User | null>(initialAuthState.user);
  const [token, setToken] = useState<string | null>(initialAuthState.token);

  // Double-check auth state on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log('Rechecking authentication state...');
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        console.log('Stored token exists:', !!storedToken);
        console.log('Stored user exists:', !!storedUser);
        
        if (storedToken && storedUser) {
          console.log('Setting authentication state from localStorage');
          setToken(storedToken);
          setUser(JSON.parse(storedUser) as User);
          setIsAuthenticated(true);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } else {
          console.log('No authentication data found in localStorage');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    // Run immediately
    checkAuth();
  }, []);

  // Set up axios default header when token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      const { token: newToken, user: newUser } = response.data;
      
      // Update state
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Set axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };
  
  const logout = () => {
    console.log('Logging out user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
