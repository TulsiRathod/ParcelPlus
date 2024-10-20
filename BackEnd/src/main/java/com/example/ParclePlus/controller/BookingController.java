package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.Booking;
import com.example.ParclePlus.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/{bookingId}")
    public Booking getBookingById(@PathVariable int bookingId) {
        return bookingService.getBookingById(bookingId);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable int userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    @GetMapping("/driver/{driverId}")
    public List<Booking> getBookingsByDriverId(@PathVariable int driverId) {
        return bookingService.getBookingsByDriverId(driverId);
    }
}
