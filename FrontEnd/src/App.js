import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import DriverLogin from './pages/DriverLogin';
import DriverRegister from './pages/DriverRegister';
import UserHome from './pages/UserHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound';
import UserBookings from './pages/UserBookings';
import DriverHome from './pages/DriverHome';
import UserTrackDriver from './pages/UserTrackDriver';
import DriverJobs from './pages/DriverJobs';
import VehicleManagement from './pages/VehicleManagement';
import DriverManagement from './pages/DriverManagement';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/partner-login" element={<DriverLogin />} />
            <Route path="/partner-register" element={<DriverRegister />} />
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/user-bookings" element={<UserBookings />} />
            <Route path="/partner-home" element={<DriverHome />} />
            <Route path="/track-driver" element={<UserTrackDriver />} />
            <Route path="/partner-jobs" element={<DriverJobs />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-vehicle" element={<VehicleManagement />} />
            <Route path="/admin-driver" element={<DriverManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
