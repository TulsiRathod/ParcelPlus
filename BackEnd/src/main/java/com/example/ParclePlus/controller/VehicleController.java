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

    // Create a new vehicle
    @PostMapping("/add")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    // Read vehicle by ID
    @GetMapping("/{vehicleId}")
    public Vehicle getVehicleById(@PathVariable int vehicleId) {
        return vehicleService.getVehicleById(vehicleId);
    }

    // Get all vehicles
    @GetMapping("/all")
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    // Update an existing vehicle
    @PutMapping("/{vehicleId}")
    public Vehicle updateVehicle(@PathVariable int vehicleId, @RequestBody Vehicle vehicleDetails) {
        return vehicleService.updateVehicle(vehicleId, vehicleDetails);
    }

    // Delete a vehicle by ID
    @DeleteMapping("/{vehicleId}")
    public void deleteVehicle(@PathVariable int vehicleId) {
        vehicleService.deleteVehicle(vehicleId);
    }

    @GetMapping("/count")
    public long getTotalDrivers() {
        return vehicleService.getTotalVehicles();
    }
}
