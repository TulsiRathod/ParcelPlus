package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.Vehicle;
import com.example.ParclePlus.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Create new vehicle
    public Vehicle addVehicle(Vehicle vehicle) {
        vehicle.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        vehicle.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return vehicleRepository.save(vehicle);
    }

    // Read vehicle by ID
    public Vehicle getVehicleById(int vehicleId) {
        return vehicleRepository.findById(vehicleId).orElse(null);
    }

    // Get all vehicles
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Update existing vehicle
    public Vehicle updateVehicle(int vehicleId, Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow(() ->
                new IllegalArgumentException("Vehicle not found"));

        // Update vehicle details
        vehicle.setType(vehicleDetails.getType());
        vehicle.setCapacity(vehicleDetails.getCapacity());
        vehicle.setBaseRate(vehicleDetails.getBaseRate());
        vehicle.setPerKmRate(vehicleDetails.getPerKmRate());
        vehicle.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        return vehicleRepository.save(vehicle);
    }

    // Delete a vehicle
    public void deleteVehicle(int vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow(() ->
                new IllegalArgumentException("Vehicle not found"));
        vehicleRepository.delete(vehicle);
    }

    public long getTotalVehicles() {
        return vehicleRepository.count();
    }
}
