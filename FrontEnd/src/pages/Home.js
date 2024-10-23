import React from 'react';
import TrackShipment from './TrackShipment';

const Home = () => {
  return (
    <div>
      <section className="hero-section">
        <h2>Reliable Parcel Delivery and Logistics Solutions</h2>
        <p>
          ParcelPlus is your trusted partner for secure and fast delivery of goods across the country.
          Simplify your logistics with us today!
        </p>
      </section>
      
      {/* TrackShipment Component */}
      <TrackShipment />

      {/* Additional Content */}
      <section className="additional-content">
        <h3>Why Choose ParcelPlus?</h3>
        <p>
          With years of experience in logistics, ParcelPlus offers you the best in class solutions to handle all your parcel needs. Whether it’s express shipping, real-time tracking, or customer service, we’ve got you covered.
        </p>
        
        <h3>Our Services</h3>
        <ul>
          <li>Same-day delivery</li>
          <li>Next-day delivery</li>
          <li>International shipping</li>
          <li>Parcel tracking</li>
          <li>Secure and insured transport</li>
        </ul>

        <h3>Contact Us</h3>
        <p>
          Have any questions or need help? Feel free to reach out to us at support@parcelplus.com or call us at 1-800-123-4567.
        </p>
      </section>
    </div>
  );
};

export default Home;
