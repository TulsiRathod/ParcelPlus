import React, { useState } from 'react';
import axios from 'axios';
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
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('passwordHash', password); // Assuming plain password, hashed on backend

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/drivers/login`, formData);
      console.log('Driver logged in:', response.data);

      // Save driverId and vehicleType to localStorage
      const driverId = response.data.driverId; // Assuming driverId is returned in response data
      const vehicleType = response.data.vehicleType; // Assuming vehicleType is returned in response data

      localStorage.setItem('driverId', driverId);
      localStorage.setItem('vehicleType', vehicleType); // Save vehicle type in localStorage

      // Dispatch login event to update header
      window.dispatchEvent(new Event('login'));

      // Display success toast
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
      });

      // Redirect to the driver home page after login
      setTimeout(() => {
        navigate('/partner-home');
      }, 3000);
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
