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

    public Vehicle addVehicle(Vehicle vehicle) {
        vehicle.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        vehicle.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return vehicleRepository.save(vehicle);
    }

    public Vehicle getVehicleById(int vehicleId) {
        return vehicleRepository.findById(vehicleId).orElse(null);
    }

    // New method to get all vehicles
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
}
