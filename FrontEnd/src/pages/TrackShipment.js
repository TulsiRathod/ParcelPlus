import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrackShipment = () => {
  const navigate = useNavigate();

  const handleTrackClick = (event) => {
    event.preventDefault();

    // Check if the user is logged in (i.e., if a userId exists in localStorage)
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Redirect to user-bookings if the user is logged in
      navigate('/user-bookings');
    } else {
      // Redirect to login page if the user is not logged in
      navigate('/login');
    }
  };

  return (
    <section className="track-shipment">
      <h3>Track Your Parcel</h3>
      {/* Remove the input field, as it's not needed */}
      <button onClick={handleTrackClick}>Track Parcel</button>
    </section>
  );
};

export default TrackShipment;
