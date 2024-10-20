package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.Booking;
import com.example.ParclePlus.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        booking.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        booking.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(int bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }

    public List<Booking> getBookingsByUserId(int userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

    public List<Booking> getBookingsByDriverId(int driverId) {
        return bookingRepository.findByDriver_DriverId(driverId);
    }
}
