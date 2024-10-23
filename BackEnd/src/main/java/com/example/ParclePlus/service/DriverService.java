package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.Driver;
import com.example.ParclePlus.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    // Register a new driver (Create)
    public Driver registerDriver(Driver driver) {
        if (driverRepository.findByEmail(driver.getEmail()) != null) {
            throw new IllegalArgumentException("Driver with this email already exists.");
        }
        driver.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        driver.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return driverRepository.save(driver);
    }

    // Login for driver
    public Driver loginDriver(String email, String passwordHash) {
        Driver driver = driverRepository.findByEmail(email);
        if (driver != null && driver.getPasswordHash().equals(passwordHash)) {
            return driver;
        }
        throw new IllegalArgumentException("Invalid email or password.");
    }

    // Fetch driver by ID (Read)
    public Driver getDriverById(int driverId) {
        return driverRepository.findById(driverId).orElseThrow(() ->
                new IllegalArgumentException("Driver not found"));
    }

    // Fetch all drivers (Read)
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Update an existing driver (Update)
    public Driver updateDriver(int driverId, Driver updatedDriver) {
        Driver existingDriver = driverRepository.findById(driverId)
                .orElseThrow(() -> new IllegalArgumentException("Driver not found"));

        // Update driver details
        existingDriver.setName(updatedDriver.getName());
        existingDriver.setEmail(updatedDriver.getEmail());
        existingDriver.setPhone(updatedDriver.getPhone());
        existingDriver.setVehicleType(updatedDriver.getVehicleType());
        existingDriver.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        return driverRepository.save(existingDriver);
    }


    // Delete a driver (Delete)
    public void deleteDriver(int driverId) {
        Driver driver = driverRepository.findById(driverId).orElseThrow(() ->
                new IllegalArgumentException("Driver not found"));
        driverRepository.delete(driver);
    }

    public long getTotalDrivers() {
        return driverRepository.count();
    }
}
