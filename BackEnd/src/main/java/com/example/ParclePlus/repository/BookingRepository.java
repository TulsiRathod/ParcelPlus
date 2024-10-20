package com.example.ParclePlus.repository;

import com.example.ParclePlus.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // Find bookings by userId in the User entity
    List<Booking> findByUser_UserId(int userId);

    // Find bookings by driverId in the Driver entity
    List<Booking> findByDriver_DriverId(int driverId);
}
