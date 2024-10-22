import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [isDriver, setIsDriver] = useState(false); // State to check if it's a driver
  const navigate = useNavigate();

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear localStorage and update login status
    localStorage.removeItem('userId');
    localStorage.removeItem('driverId');
    setIsLoggedIn(false);
    setIsDriver(false);
    navigate('/'); // Redirect to home page after logout
  };

  // Check if user or driver is logged in when the component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const driverId = localStorage.getItem('driverId');
    if (userId || driverId) {
      setIsLoggedIn(true); // User or driver is logged in
      if (driverId) setIsDriver(true); // Set driver flag if driverId is present
    }
  }, []);

  // Listen for login events in the application (e.g., after successful login)
  useEffect(() => {
    const handleLogin = () => {
      const userId = localStorage.getItem('userId');
      const driverId = localStorage.getItem('driverId');
      if (userId || driverId) {
        setIsLoggedIn(true); // Set login state after login
        if (driverId) setIsDriver(true); // Set driver flag if driverId is present
      }
    };

    // Listen for custom login events
    window.addEventListener('login', handleLogin);

    return () => {
      window.removeEventListener('login', handleLogin);
    };
  }, []);

  return (
    <header>
      <h1>ParcelPlus Logistics</h1>

      {/* Menu Toggle Button */}
      <div className="menu-toggle">
        <i className="fas fa-bars" onClick={toggleMenu}></i>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul>
          <li><Link to={isLoggedIn ? (isDriver ? "/driver-home" : "/user-home") : '/'}>Home</Link></li>
          {/* Show Bookings for user or driver based on login type */}
          {(!isDriver && isLoggedIn) && (
              <li><Link to="/user-bookings" onClick={toggleMenu}>Bookings</Link></li>
            )}
          {isLoggedIn ? (
            <>
              {/* If logged in, show logout */}
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              {/* If not logged in, show login options */}
              <li><Link to="/partner-login">Partner Login</Link></li>
              <li><Link to="/login">Client Login</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`mobile-nav`} id="mobileMenu">
          <ul>
            <li><Link to={isLoggedIn ? (isDriver ? "/driver-home" : "/user-home") : '/'} onClick={toggleMenu}>Home</Link></li>
            {/* Show Bookings for user or driver based on login type */}
            {(!isDriver && isLoggedIn) && (
              <li><Link to="/user-bookings" onClick={toggleMenu}>Bookings</Link></li>
            )}
            {isLoggedIn ? (
              <>
                <li><Link to="/" onClick={() => { handleLogout(); toggleMenu(); }}>Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/partner-login" onClick={toggleMenu}>Partner Login</Link></li>
                <li><Link to="/login" onClick={toggleMenu}>Client Login</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
