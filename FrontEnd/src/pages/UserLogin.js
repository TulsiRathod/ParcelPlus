import React, { useState } from 'react';
import axios from 'axios';
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
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('passwordHash', password); // Assuming plain password, hashed on backend
  
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, formData);
      console.log('User logged in:', response.data);
  
      // Assuming the userId is part of the response data
      const userId = response.data.userId;
  
      // Save userId in localStorage
      // In your login handler:
      localStorage.removeItem('userId');
      localStorage.removeItem('driverId');
      localStorage.setItem('userId', userId);
      window.dispatchEvent(new Event('login')); // Trigger the login event

      // Display success toast
      toast.success('Login successful!', {
        position: 'top-right', // Use string instead of toast.POSITION.TOP_RIGHT
        autoClose: 3000, // 3 seconds
      });
  
      // Redirect to the after login page after 3 seconds
      setTimeout(() => {
        navigate('/user-home');
      }, 3000);
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
