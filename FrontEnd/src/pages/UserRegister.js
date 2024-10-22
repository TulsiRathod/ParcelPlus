import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
        name,
        email,
        phone,
        passwordHash: password, // Assuming you send plain passwords and hash them on the backend
      });

      console.log('User registered:', response.data);

      // Display success toast
      toast.success('Registration successful! You can now login.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // 3 seconds
      });

      // Redirect to the login page after 3 seconds
      setTimeout(() => {
        window.location.href = '/login'; // Or use useNavigate if using react-router
      }, 3000);
    } catch (error) {
      console.error('Error registering user:', error);
      // Display error toast
      toast.error('Registration failed! Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="form-section">
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="toggle-link">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default UserRegister;
