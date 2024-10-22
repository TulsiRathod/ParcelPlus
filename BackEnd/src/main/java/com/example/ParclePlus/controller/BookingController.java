package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.Booking;
import com.example.ParclePlus.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a new booking
    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    // Get a booking by ID
    @GetMapping("/{bookingId}")
    public Booking getBookingById(@PathVariable int bookingId) {
        return bookingService.getBookingById(bookingId);
    }

    // Get bookings by user ID with pagination
    @GetMapping("/user/{userId}")
    public Page<Booking> getBookingsByUserId(
            @PathVariable int userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return bookingService.getBookingsByUserId(userId, page, size);
    }

    // Get bookings by driver ID with pagination
    @GetMapping("/driver/{driverId}")
    public Page<Booking> getBookingsByDriverId(
            @PathVariable int driverId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return bookingService.getBookingsByDriverId(driverId, page, size);
    }

    // Get all bookings without an assigned driver, with pagination
    @GetMapping("/without-driver")
    public Page<Booking> getBookingsWithoutDriver(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return bookingService.getBookingsWithoutDriver(page, size);
    }

    // Assign a driver to a booking
    @PutMapping("/{bookingId}/assign-driver/{driverId}")
    public Booking assignDriver(@PathVariable int bookingId, @PathVariable int driverId) {
        return bookingService.assignDriver(bookingId, driverId);
    }
}
