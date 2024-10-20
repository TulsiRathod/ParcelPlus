package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.Driver;
import com.example.ParclePlus.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    // Register a new driver
    public Driver registerDriver(Driver driver) {
        // Check if the driver already exists by email
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
}
