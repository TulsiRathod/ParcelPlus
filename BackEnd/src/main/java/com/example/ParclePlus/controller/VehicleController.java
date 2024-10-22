package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.Vehicle;
import com.example.ParclePlus.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/add")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @GetMapping("/{vehicleId}")
    public Vehicle getVehicleById(@PathVariable int vehicleId) {
        return vehicleService.getVehicleById(vehicleId);
    }

    // New endpoint to get all vehicles
    @GetMapping("/all")
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }
}
