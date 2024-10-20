package com.example.ParclePlus.repository;

import com.example.ParclePlus.entity.VehicleTracking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleTrackingRepository extends JpaRepository<VehicleTracking, Integer> {
    List<VehicleTracking> findByBooking_BookingId(int bookingId);
    List<VehicleTracking> findByDriver_DriverId(int driverId);
}
