import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const DriverNow = () => {
  const socket = useRef(null); // WebSocket reference
  const driverId = localStorage.getItem('driverId'); // Get driverId from localStorage
  const [isSharing, setIsSharing] = useState(false);
  const locationInterval = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    socket.current = new WebSocket('ws://localhost:8080/ws/track'); // Replace with your WebSocket URL

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
      // Cleanup on unmount: clear interval and close WebSocket connection
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, []);

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
    <div className="driver-now-container">
      <h2>Driver Location Sharing</h2>
      <div className="button-container">
        {!isSharing ? (
          <button onClick={startSharingLocation} className="start-button">
            Share Location
          </button>
        ) : (
          <button onClick={stopSharingLocation} className="stop-button">
            Stop Sharing
          </button>
        )}
      </div>
    </div>
  );
};

export default DriverNow;
