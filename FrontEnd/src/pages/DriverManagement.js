import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Import react-select
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    driverId: '',
    name: '',
    email: '',
    phone: '',
    selectedVehicles: [],
    vehicleType: ''
  });
  const [vehicleOptions, setVehicleOptions] = useState([]); // For the vehicle types in MultiSelect

  // Fetch all available drivers and vehicles when the component mounts
  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/drivers/all');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      toast.error('Failed to fetch drivers.');
    }
  };

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
      toast.error('Failed to fetch vehicle types.');
    }
  };

  // Open modal with pre-filled data for editing driver
  const handleOpenModal = (driver) => {
    const selectedVehicles = driver.vehicleType.split(',').map((type) => ({
      value: type.trim(),
      label: type.trim(),
    }));

    setFormData({
      driverId: driver.driverId,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      selectedVehicles,
      vehicleType: selectedVehicles.map(v => v.value).join(', ')
    });
    setIsEditMode(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      driverId: '',
      name: '',
      email: '',
      phone: '',
      selectedVehicles: [],
      vehicleType: ''
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (selectedOptions) => {
    setFormData({
      ...formData,
      selectedVehicles: selectedOptions,
      vehicleType: selectedOptions.map(vehicle => vehicle.value).join(', ')
    });
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        // Edit existing driver only
        await axios.put(`http://localhost:8080/api/drivers/${formData.driverId}`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicleType: formData.vehicleType // Sending updated vehicle types
        });

        toast.success('Driver updated successfully');
        fetchDrivers(); // Refresh the driver list after editing
        handleCloseModal(); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error updating driver:', error);
      toast.error('Failed to update driver');
    }
  };

  const handleDeleteDriver = async (driverId) => {
    try {
      await axios.delete(`http://localhost:8080/api/drivers/${driverId}`);
      toast.success('Driver deleted successfully');
      fetchDrivers();
    } catch (error) {
      console.error('Error deleting driver:', error);
      toast.error('Failed to delete driver');
    }
  };

  return (
    <div className="driver-management">
      <table className="driver-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Vehicle Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driverId}>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.vehicleType}</td>
              <td>
                <button className="edit-btn" onClick={() => handleOpenModal(driver)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteDriver(driver.driverId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Vehicle Types</label>
              <Select
                isMulti
                value={formData.selectedVehicles}
                onChange={handleVehicleChange}
                options={vehicleOptions}
                placeholder="Select Vehicle Types"
                className="multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>Update</button>
              <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverManagement;
