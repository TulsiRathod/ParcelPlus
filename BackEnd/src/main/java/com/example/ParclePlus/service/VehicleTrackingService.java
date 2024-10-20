package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.VehicleTracking;
import com.example.ParclePlus.repository.VehicleTrackingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleTrackingService {

    @Autowired
    private VehicleTrackingRepository trackingRepository;

    public VehicleTracking trackVehicle(VehicleTracking vehicleTracking) {
        vehicleTracking.setTimestamp(new java.sql.Timestamp(System.currentTimeMillis()));
        return trackingRepository.save(vehicleTracking);
    }

    public List<VehicleTracking> getTrackingByBookingId(int bookingId) {
        return trackingRepository.findByBooking_BookingId(bookingId);
    }

    public List<VehicleTracking> getTrackingByDriverId(int driverId) {
        return trackingRepository.findByDriver_DriverId(driverId);
    }
}
