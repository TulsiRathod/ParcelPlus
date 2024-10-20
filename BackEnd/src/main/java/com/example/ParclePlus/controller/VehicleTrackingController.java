package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.VehicleTracking;
import com.example.ParclePlus.service.VehicleTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicle-tracking")
public class VehicleTrackingController {

    @Autowired
    private VehicleTrackingService trackingService;

    @PostMapping("/track")
    public VehicleTracking trackVehicle(@RequestBody VehicleTracking vehicleTracking) {
        return trackingService.trackVehicle(vehicleTracking);
    }

    @GetMapping("/booking/{bookingId}")
    public List<VehicleTracking> getTrackingByBookingId(@PathVariable int bookingId) {
        return trackingService.getTrackingByBookingId(bookingId);
    }

    @GetMapping("/driver/{driverId}")
    public List<VehicleTracking> getTrackingByDriverId(@PathVariable int driverId) {
        return trackingService.getTrackingByDriverId(driverId);
    }
}
