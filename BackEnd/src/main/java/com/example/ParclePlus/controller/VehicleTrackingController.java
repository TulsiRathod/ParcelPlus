package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.VehicleTracking;
import com.example.ParclePlus.service.VehicleTrackingService;
import com.example.ParclePlus.websocket.VehicleTrackingWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle-tracking")
public class VehicleTrackingController {

    @Autowired
    private VehicleTrackingService trackingService;

    @Autowired
    private VehicleTrackingWebSocketHandler webSocketHandler;

    @PostMapping("/track")
    public VehicleTracking trackVehicle(@RequestBody VehicleTracking vehicleTracking) {
        VehicleTracking savedTracking = trackingService.trackVehicle(vehicleTracking);
        String locationMessage = "Driver " + vehicleTracking.getDriver().getDriverId() + " is at location: " + vehicleTracking.getLocation();
        webSocketHandler.sendMessageToAll(locationMessage);
        return savedTracking;
    }
}
