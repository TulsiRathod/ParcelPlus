/* global google */
import React, { useRef, useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications

const center = { lat: 48.8584, lng: 2.2945 }; // Default center for Paris

function UserHome() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Ensure the key is in .env
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [vehicles, setVehicles] = useState([]); // State to store vehicles
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State to store selected vehicle
  const [estimatedCost, setEstimatedCost] = useState(0); // To store estimated cost for booking
  const [showDetails, setShowDetails] = useState(false); // State to show details after clicking "Check"
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State to control the confirm modal

  const originRef = useRef();
  const destinationRef = useRef();
  const navigate = useNavigate(); // Hook for navigation

  // Check if the user is logged in (i.e., has a userId in localStorage)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("You must be logged in to access this page.");
      navigate('/login'); // Redirect to login page if user is not logged in
    }
  }, [navigate]);

  // Fetch vehicles when the component mounts
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/vehicles/all`);
        setVehicles(response.data || []); // Ensure vehicles is an array, handle undefined response
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setVehicles([]); // Fallback to an empty array in case of an error
      }
    }
    fetchVehicles();
  }, []);

  // Function to calculate route
  async function calculateRoute() {
    if (!originRef.current?.value || !destinationRef.current?.value || !selectedVehicle) {
      toast.error("Please fill all required fields.");
      return;
    }
    
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      
      if (results && results.routes.length > 0) {
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text || 'N/A');
        setDuration(results.routes[0].legs[0].duration.text || 'N/A');
        const calculatedCost = (parseFloat(results.routes[0].legs[0].distance.value) / 1000) * (selectedVehicle?.perKmRate || 1.5);
        setEstimatedCost(calculatedCost.toFixed(2) || '0.00');
      }
    } catch (error) {
      console.error('Error calculating route:', error);
      toast.error("Failed to calculate route. Please try again.");
    }
  }

  // Handle vehicle selection
  const handleVehicleChange = (event) => {
    const vehicleId = event.target.value;
    const vehicle = vehicles.find((v) => v.vehicleId === parseInt(vehicleId, 10));
    setSelectedVehicle(vehicle || null);
  };

  // Function to confirm the booking
  const confirmBooking = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    if (!selectedVehicle || !originRef.current?.value || !destinationRef.current?.value) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      // Extract the latitude and longitude for both pickup and dropoff locations
      const geocoder = new google.maps.Geocoder();
      
      const pickupLocation = await geocodeAddress(geocoder, originRef.current.value);
      const dropoffLocation = await geocodeAddress(geocoder, destinationRef.current.value);

      if (!pickupLocation || !dropoffLocation) {
        toast.error("Invalid pickup or dropoff location");
        return;
      }
      
      const bookingData = {
        user: { userId: userId }, // Use userId from localStorage
        vehicle: { vehicleId: selectedVehicle.vehicleId },
        pickupLocation: `POINT(${pickupLocation.lat} ${pickupLocation.lng})`,
        dropoffLocation: `POINT(${dropoffLocation.lat} ${dropoffLocation.lng})`,
        pickupCity: originRef.current.value,       // Include the pickup address (new)
        dropoffCity: destinationRef.current.value, // Include the dropoff address (new)
        status: "PENDING",
        estimatedCost: estimatedCost || '0.00'
      };

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/bookings/create`, bookingData);
      toast.success('Booking confirmed!');
      console.log('Booking response:', response.data);

      // Clear fields after booking
      clearFields();

      // Redirect to payment page
      navigate('/user-bookings');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error('Error creating booking:', error);
    }
  };

  // Function to geocode an address into lat/lng
  const geocodeAddress = (geocoder, address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(null);
        }
      });
    });
  };

  // Function to clear input fields and route
  const clearFields = () => {
    originRef.current.value = '';
    destinationRef.current.value = '';
    setSelectedVehicle(null);
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setEstimatedCost(0);
    setShowDetails(false);
  };

  // Function to show fare details after clicking the "Check" button
  const handleCheckClick = () => {
    calculateRoute();
    setShowDetails(true);
  };

  // Open the confirm modal before finalizing the booking
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  // Close the confirm modal
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  if (loadError) {
    return <p>Error loading Google Maps</p>;
  }

  return (
    <div className="user-home-container">
      {!isLoaded ? (
        <p>Loading Google Maps...</p>
      ) : (
        <>
          <div className="map-section">
            <GoogleMap
              center={center}
              zoom={8}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
          </div>

          <div className="sidebar">
            <h2>Book Service</h2>
            
            {/* Step 1: Select Pickup and Dropoff Locations */}
            <div className="input-group">
              <label>Pickup Location</label>
              <Autocomplete>
                <input type="text" placeholder="Enter Pickup Location" ref={originRef} />
              </Autocomplete>
            </div>

            <div className="input-group">
              <label>Dropoff Location</label>
              <Autocomplete>
                <input type="text" placeholder="Enter Dropoff Location" ref={destinationRef} />
              </Autocomplete>
            </div>

            {/* Step 2: Select Vehicle */}
            <div className="input-group">
              <label>Select Vehicle</label>
              <select onChange={handleVehicleChange} value={selectedVehicle?.vehicleId || ''}>
                <option value="">-- Select Vehicle --</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                    {vehicle.type}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Show Check Button once all fields are filled */}
            {originRef.current?.value && destinationRef.current?.value && selectedVehicle && (
              <div className="actions">
                <button onClick={handleCheckClick}>Check</button>
              </div>
            )}

            {/* Step 4: Show Route and Details after clicking "Check" */}
            {showDetails && directionsResponse && (
              <div className="vehicle-info">
                <p>Vehicle Type: {selectedVehicle.type}</p>
                <p>Capacity: {selectedVehicle.capacity} kg</p>
                <p>Base Rate:  ₹{selectedVehicle.baseRate}</p>
                <p>Per Km Rate:  ₹{selectedVehicle.perKmRate}</p>
                <p>Distance: {distance}</p>
                <p>Duration: {duration}</p>
                <p>Estimated Cost:  ₹{estimatedCost}</p>
                <p><h4>Total Cost:  ₹{parseFloat(estimatedCost) + parseFloat(selectedVehicle.baseRate)}</h4></p>
                {/* Step 5: Confirm Booking Button */}
                <button className="confirm-button" onClick={openConfirmModal}>Confirm Booking</button>
              </div>
            )}
          </div>

          {/* Confirm Booking Modal */}
          {showConfirmModal && (
            <div className="confirm-modal">
              <div className="modal-content">
                <h3>Confirm Booking</h3>
                <p>Are you sure you want to confirm this booking?</p>
                <button className="confirm-button" onClick={confirmBooking}>Yes, Confirm</button>
                <button className="cancel-button" onClick={closeConfirmModal}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserHome;
