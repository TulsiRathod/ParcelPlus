import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const UserTrackDriver = () => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const driverId = location.state?.driverId; // Retrieve driverId from location state
  const socket = useRef(null); // UseRef to store WebSocket instance

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Ensure this is correctly set in .env
  });

  useEffect(() => {
    if (!driverId) {
      setError('Driver ID is missing.');
      return;
    }

    // Initialize WebSocket connection
    socket.current = new WebSocket('ws://localhost:8080/ws/track');

    socket.current.onopen = () => {
      console.log('WebSocket connection established for tracking driver.');
      const trackRequest = JSON.stringify({ trackDriverId: driverId });
      socket.current.send(trackRequest); // Request to track driver
    };

    // Listen for WebSocket messages
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.lat && data.lng) {
        setDriverLocation({ lat: data.lat, lng: data.lng });
      } else {
        console.error('Invalid location data received:', data);
      }
    };

    // Handle WebSocket errors
    socket.current.onerror = (err) => {
      console.error('WebSocket error:', err);
      setError('WebSocket connection failed.');
    };

    // Clean up WebSocket when component unmounts
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [driverId]);

  return (
    <div style={styles.container}>
      <div style={styles.mapWrapper}>
        {isLoaded ? (
          <GoogleMap
            center={driverLocation || { lat: 0, lng: 0 }}
            zoom={driverLocation ? 15 : 2}
            mapContainerStyle={styles.map}
          >
            {driverLocation && <Marker position={driverLocation} />}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  mapWrapper: {
    width: '100%',
    maxWidth: '800px',
    height: '400px',
    marginBottom: '20px',
  },
  map: {
    width: '100%',
    height: '100%',
  },
};

export default UserTrackDriver;
