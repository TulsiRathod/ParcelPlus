import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/users/login', { email, password });

      const { token, role, userId } = response.data;

      // Reset any previous session, then store the new credentials.
      localStorage.removeItem('driverId');
      localStorage.removeItem('vehicleType');
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);
      window.dispatchEvent(new Event('login')); // Trigger the login event

      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 2000,
      });

      // Admins land on the dashboard; everyone else on the user home.
      navigate(role === 'ADMIN' ? '/admin' : '/user-home');
    } catch (error) {
      console.error('Error logging in user:', error);
      // Display error toast
      toast.error('Login failed! Please check your credentials.', {
        position: 'top-right', // Use string instead of toast.POSITION.TOP_RIGHT
        autoClose: 3000,
      });
    }
  };
  

  return (
    <>
      <section className="form-section">
        <h3>Login</h3>
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
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default UserLogin;
