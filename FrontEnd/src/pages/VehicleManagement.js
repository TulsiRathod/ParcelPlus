import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    vehicleId: null,
    type: '',
    capacity: '',
    baseRate: '',
    perKmRate: '',
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch all vehicles
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vehicles/all');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleAddVehicle = () => {
    setVehicleForm({
      vehicleId: null,
      type: '',
      capacity: '',
      baseRate: '',
      perKmRate: '',
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditVehicle = (vehicle) => {
    setVehicleForm(vehicle);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${vehicleId}`);
      fetchVehicles(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update vehicle
        await axios.put(`http://localhost:8080/api/vehicles/${vehicleForm.vehicleId}`, vehicleForm);
      } else {
        // Add new vehicle
        await axios.post('http://localhost:8080/api/vehicles/add', vehicleForm);
      }
      setShowModal(false);
      fetchVehicles(); // Refresh the list
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVehicleForm({
      vehicleId: null,
      type: '',
      capacity: '',
      baseRate: '',
      perKmRate: '',
    });
  };

  return (
    <div className="vehicle-management">
      <h2>Vehicle Management</h2>
      <button onClick={handleAddVehicle} className="add-btn">Add New Vehicle</button>

      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Capacity</th>
            <th>Base Rate</th>
            <th>Per Km Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicleId}>
              <td>{vehicle.type}</td>
              <td>{vehicle.capacity}</td>
              <td>₹{vehicle.baseRate}</td>
              <td>₹{vehicle.perKmRate}</td>
              <td>
                <button onClick={() => handleEditVehicle(vehicle)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteVehicle(vehicle.vehicleId)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom Modal for Adding/Editing Vehicle */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={vehicleForm.type}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, type: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  value={vehicleForm.capacity}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Base Rate</label>
                <input
                  type="number"
                  className="form-control"
                  value={vehicleForm.baseRate}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, baseRate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Per Km Rate</label>
                <input
                  type="number"
                  className="form-control"
                  value={vehicleForm.perKmRate}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, perKmRate: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">{editMode ? 'Update Vehicle' : 'Add Vehicle'}</button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
