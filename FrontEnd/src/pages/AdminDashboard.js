import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    completedBookings: 0,
    totalDrivers: 0,
    totalUsers: 0,
    totalVehicles: 0
  });

  // Fetch the required data when the component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Replace the URLs with your actual backend API endpoints
      const completedBookingsResponse = await axios.get('http://localhost:8080/api/bookings/completed/count');
      const driversResponse = await axios.get('http://localhost:8080/api/drivers/count');
      const usersResponse = await axios.get('http://localhost:8080/api/users/count');
      const vehiclesResponse = await axios.get('http://localhost:8080/api/vehicles/count');

      setDashboardData({
        completedBookings: completedBookingsResponse.data,
        totalDrivers: driversResponse.data,
        totalUsers: usersResponse.data,
        totalVehicles: vehiclesResponse.data
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Completed Bookings</h3>
          <p>{dashboardData.completedBookings}</p>
        </div>
        <div className="dashboard-card" onClick={()=>{navigate('/admin-driver')}}>
          <h3>Total Drivers</h3>
          <p>{dashboardData.totalDrivers}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{dashboardData.totalUsers}</p>
        </div>
        <div className="dashboard-card" onClick={()=>{navigate('/admin-vehicle')}}>
          <h3>Total Vehicles</h3>
          <p>{dashboardData.totalVehicles}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
