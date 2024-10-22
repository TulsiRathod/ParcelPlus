import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import navigate for redirection

const DriverHome = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // To store total pages
  const [vehicleType, setVehicleType] = useState(''); // To store the selected vehicle type

  const pageSize = 5; // Number of bookings to display per page
  const navigate = useNavigate(); // Hook to navigate

  // Fetch bookings when page or vehicle type changes
  useEffect(() => {
    fetchBookings(currentPage, vehicleType);
  }, [currentPage, vehicleType]);

  const fetchBookings = async (page, vehicleType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bookings/without-driver`, {
        params: { page, size: pageSize, vehicleType },
      });
      setBookings(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError('Error fetching bookings');
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
  };

  const handleAcceptJob = async (bookingId) => {
    try {
      const driverId = localStorage.getItem('driverId'); // Driver ID from localStorage
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/bookings/${bookingId}/assign-driver/${driverId}`);
      
      // Save the current booking ID in localStorage
      localStorage.setItem('currentBookingId', bookingId);

      // Redirect to DriverNow page
      navigate('/partner-now');
    } catch (error) {
      console.error('Error accepting job:', error);
      alert('Failed to accept the job.');
    }
  };

  return (
    <div className="driver-home">
      <h2>Available Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>Pickup Location</th>
                <th>Dropoff Location</th>
                <th>Vehicle Type</th>
                <th>Estimated Cost</th>
                <th>Status</th>
                <th>Action</th> {/* Action column */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{currentPage * pageSize + index + 1}</td> {/* Display continuous index */}
                  <td>{booking.user.name}</td>
                  <td>{booking.pickupCity || booking.pickupLocation}</td>
                  <td>{booking.dropoffCity || booking.dropoffLocation}</td>
                  <td>{booking.vehicle.type}</td>
                  <td>${booking.estimatedCost}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button onClick={() => handleAcceptJob(booking.bookingId)}>Accept Job</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`page-button ${currentPage === index ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DriverHome;
