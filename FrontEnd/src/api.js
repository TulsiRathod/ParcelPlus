import axios from 'axios';

// Base URLs come from environment variables (see .env.example).
// Falls back to localhost for local development if not set.
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const WS_BASE_URL =
  process.env.REACT_APP_WS_BASE_URL || 'ws://localhost:8080';

// Shared axios instance. Use relative paths, e.g. api.get('/vehicles/all').
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach the JWT (if present) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401/403, the token is missing/expired/insufficient — clear auth and
// bounce to login. Other errors propagate to the caller as usual.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
      localStorage.removeItem('driverId');
      localStorage.removeItem('vehicleType');
      window.dispatchEvent(new Event('logout'));
      const onLogin = window.location.pathname.startsWith('/login')
        || window.location.pathname.startsWith('/partner-login');
      if (!onLogin) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
