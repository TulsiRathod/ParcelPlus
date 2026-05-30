import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/drivers/login', { email, password });

      const { token, role, driverId, vehicleType } = response.data;

      // Reset any previous session, then store the new credentials.
      localStorage.removeItem('userId');
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('driverId', driverId);
      localStorage.setItem('vehicleType', vehicleType);

      // Dispatch login event to update header
      window.dispatchEvent(new Event('login'));

      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000,
      });

      navigate('/partner-home');
    } catch (error) {
      console.error('Error logging in driver:', error);
      // Display error toast
      toast.error('Login failed! Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="form-section">
        <h3>Partner Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="toggle-link">
          <p>Don't have an account? <a href="/partner-register">Register here</a></p>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default DriverLogin;
