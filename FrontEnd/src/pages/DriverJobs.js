import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DriverJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Number of total pages
  const [isSharing, setIsSharing] = useState(false); // State to track location sharing
  const socket = useRef(null); // WebSocket reference
  const locationInterval = useRef(null); // Reference to the interval for location sharing

  const driverId = localStorage.getItem('driverId'); // Driver ID from localStorage
  const pageSize = 5; // Number of jobs per page

  useEffect(() => {
    fetchJobs(currentPage);
    // Initialize WebSocket connection for location sharing
    socket.current = new WebSocket('ws://localhost:8080/ws/track');
    
    socket.current.onopen = () => {
      console.log('WebSocket connection established for driver.');
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('WebSocket connection error.');
    };

    return () => {
      // Cleanup WebSocket and interval on unmount
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, [currentPage]);

  const fetchJobs = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bookings/driver/${driverId}`, {
        params: { page, size: pageSize },
      });
      
      // Sort jobs by status (order: 'IN_PROGRESS', 'PENDING', 'COMPLETED')
      const sortedJobs = response.data.content.sort((a, b) => {
        const statusOrder = { 'IN_PROGRESS': 1, 'PENDING': 2, 'COMPLETED': 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      });

      setJobs(sortedJobs);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch jobs.');
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/bookings/${bookingId}/update-status`, { status: newStatus }, {
        headers: { 'Content-Type': 'application/json' },
      });
      fetchJobs(currentPage); // Refresh the jobs after status change
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status.');
    }
  };

  const startSharingLocation = () => {
    if (!socket.current || socket.current.readyState !== WebSocket.OPEN) {
      toast.error('WebSocket connection is not open.');
      return;
    }

    if (navigator.geolocation) {
      locationInterval.current = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const locationMessage = JSON.stringify({
            driverId,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          try {
            socket.current.send(locationMessage); // Send location data through WebSocket
          } catch (err) {
            console.error('WebSocket send error:', err);
            toast.error('Failed to send location.');
          }
        });
      }, 10000); // Share location every 10 seconds

      setIsSharing(true);
      toast.success('Started sharing location');
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  const stopSharingLocation = () => {
    if (locationInterval.current) {
      clearInterval(locationInterval.current);
      locationInterval.current = null;
      setIsSharing(false);
      toast.info('Stopped sharing location');
    }
  };

  return (
    <div className="user-bookings">
        {/* Location Sharing Buttons */}
        <div className="button-container">
            {!isSharing ? (
              <button onClick={startSharingLocation} className="start-button">
                Start Sharing Location
              </button>
            ) : (
              <button onClick={stopSharingLocation} className="stop-button">
                Stop Sharing Location
              </button>
            )}
        </div>
      <h2>Your Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs assigned.</p>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.bookingId}>
                  <td>{currentPage * pageSize + index + 1}</td>
                  <td>{job.user.name}</td>
                  <td>{job.pickupCity || job.pickupLocation}</td>
                  <td>{job.dropoffCity || job.dropoffLocation}</td>
                  <td>{job.vehicle.type}</td>
                  <td> ₹{job.estimatedCost}</td>
                  <td>{job.status}</td>
                  <td>
                    {job.status === 'PENDING' && (
                      <button className="process-button" onClick={() => handleStatusChange(job.bookingId, 'IN_PROGRESS')}>
                        Process
                      </button>
                    )}
                    {job.status === 'IN_PROGRESS' && (
                      <button className="complete-button" onClick={() => handleStatusChange(job.bookingId, 'COMPLETED')}>
                        Complete
                      </button>
                    )}
                    {job.status !== 'CANCELLED' && job.status !== 'COMPLETED' && (
                      <button className="cancel-button" onClick={() => handleStatusChange(job.bookingId, 'CANCELLED')}>
                        Cancel
                      </button>
                    )}
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

export default DriverJobs;
