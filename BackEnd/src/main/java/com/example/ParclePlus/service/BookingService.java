package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.Booking;
import com.example.ParclePlus.entity.Driver;
import com.example.ParclePlus.repository.BookingRepository;
import com.example.ParclePlus.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private DriverRepository driverRepository;

    // Create a new booking
    public Booking createBooking(Booking booking) {
        booking.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        booking.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return bookingRepository.save(booking);
    }

    // Get a booking by ID
    public Booking getBookingById(int bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }

    // Get bookings by user ID with pagination
    public Page<Booking> getBookingsByUserId(int userId, int page, int size) {
        return bookingRepository.findByUser_UserId(userId, PageRequest.of(page, size));
    }

    // Get bookings by driver ID with pagination
    public Page<Booking> getBookingsByDriverId(int driverId, int page, int size) {
        return bookingRepository.findByDriver_DriverId(driverId, PageRequest.of(page, size));
    }

    // Get all bookings without an assigned driver, with pagination
    public Page<Booking> getBookingsWithoutDriver(int page, int size) {
        return bookingRepository.findBookingsWithoutDriver(PageRequest.of(page, size));
    }

    // Assign a driver to a booking
    public Booking assignDriver(int bookingId, int driverId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new IllegalArgumentException("Driver not found"));

        booking.setDriver(driver);
        booking.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return bookingRepository.save(booking);
    }
}
