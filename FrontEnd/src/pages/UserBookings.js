import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Page index starts from 0
  const [totalPages, setTotalPages] = useState(0);
  const bookingsPerPage = 5; // Number of bookings to display per page
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming the userId is stored in localStorage
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bookings/user/${userId}`, {
          params: {
            page: currentPage,
            size: bookingsPerPage
          }
        });
        
        // Custom sorting for booking statuses: 'IN_PROGRESS', 'PENDING', 'COMPLETED'
        const sortedBookings = response.data.content.sort((a, b) => {
          const statusOrder = { 'IN_PROGRESS': 1, 'PENDING': 2, 'COMPLETED': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });

        setBookings(sortedBookings); // Set sorted bookings
        setTotalPages(response.data.totalPages); // totalPages is the number of available pages
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTrackClick = (driverId) => {
    if (!driverId) {
      alert('Driver not assigned yet.');
      return;
    }
    // Navigate to the tracking page and pass the driverId via state
    navigate('/track-driver', { state: { driverId } });
  };

  // Show loading spinner or error message if applicable
  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>No</th> {/* Change header to index */}
                <th>Pickup Location</th> {/* Added Pickup Location */}
                <th>Dropoff Location</th> {/* Added Dropoff Location */}
                <th>Vehicle</th>
                <th>Estimated Cost</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Track Location</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.bookingId}>
                  <td>{currentPage * bookingsPerPage + index + 1}</td> {/* Display index */}
                  <td>
                    {booking.pickupCity ? booking.pickupCity : 'N/A'} {/* Display Pickup Location */}
                  </td>
                  <td>
                    {booking.dropoffCity ? booking.dropoffCity : 'N/A'} {/* Display Dropoff Location */}
                  </td>
                  <td>
                    {booking.vehicle ? `${booking.vehicle.type}` : 'N/A'}
                  </td>
                  <td>₹{booking.estimatedCost}</td>
                  <td>
                    {booking.driver ? (
                      `${booking.driver.name} (${booking.driver.email})`
                    ) : (
                      'Not assigned yet'
                    )}
                  </td>
                  <td>{booking.status}</td>
                  <td>
                    <button
                      onClick={() => handleTrackClick(booking.driver?.driverId)} // Send driverId to the tracking page
                      disabled={!booking.driver || booking.status !== 'IN_PROGRESS'} // Disable button if no driver or status isn't IN_PROGRESS
                    >
                      Track
                    </button>
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
                onClick={() => paginate(index)}
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

export default UserBookings;
