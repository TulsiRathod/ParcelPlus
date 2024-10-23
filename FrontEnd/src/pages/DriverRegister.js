import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Import react-select
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriverRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]); // Store selected vehicles
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vehicleOptions, setVehicleOptions] = useState([]); // Store vehicle options

  // Fetch all available vehicles to populate the vehicle type dropdown
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles/all');
        const options = response.data.map(vehicle => ({
          value: vehicle.type,
          label: vehicle.type,
        }));
        setVehicleOptions(options);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Error fetching vehicle types.');
      }
    };

    fetchVehicles();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    try {
      // Join selected vehicle types into a comma-separated string
      const vehicleTypeString = selectedVehicles.map(vehicle => vehicle.value).join(', ');

      // Call the API to register the driver
      const response = await axios.post(`http://localhost:8080/api/drivers/register`, {
        name,
        email,
        phone,
        vehicleType: vehicleTypeString, // Send selected vehicle types as a comma-separated string
        passwordHash: password, // Assuming plain password, hashed on backend
      });

      console.log('Driver registered:', response.data);

      // Show success toast notification
      toast.success('Registration successful! You can now log in.', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
      });

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        window.location.href = '/partner-login'; // Or use useNavigate if using react-router
      }, 3000);
    } catch (error) {
      console.error('Error registering driver:', error);
      // Display error toast if registration fails
      toast.error('Registration failed! Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="form-section">
        <h3>Partner Register</h3>
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

          {/* Multi-select vehicle type using react-select */}
          <Select
            isMulti
            value={selectedVehicles}
            onChange={setSelectedVehicles}
            options={vehicleOptions}
            placeholder="Select Vehicle Types"
            className="multi-select"
            classNamePrefix="select"
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
          <p>Already have an account? <a href="/partner-login">Login here</a></p>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default DriverRegister;
