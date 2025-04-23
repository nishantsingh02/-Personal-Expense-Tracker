import axios from 'axios';

// Determine which backend URL to use based on environment
const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';
const baseURL = isDevelopment 
  ? import.meta.env.VITE_BACKEND_URL 
  : import.meta.env.VITE_PRODUCTION_BACKEND_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login if it's a 401 error and we're not already on the login page
    if (error.response && error.response.status === 401 && !window.location.pathname.includes('/signin')) {
      // Don't clear localStorage here - we want to keep the token for refresh
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api; 