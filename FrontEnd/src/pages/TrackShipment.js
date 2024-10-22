import React from 'react';

const TrackShipment = () => {
  return (
    <section className="track-shipment">
      <h3>Track Your Parcel</h3>
      <form>
        <input type="text" placeholder="Enter your tracking number" />
        <br />
        <button type="submit">Track Now</button>
      </form>
    </section>
  );
};

export default TrackShipment;
