package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.Driver;
import com.example.ParclePlus.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    // Register endpoint (Create)
    @PostMapping("/register")
    public Driver registerDriver(@RequestBody Driver driver) {
        return driverService.registerDriver(driver);
    }

    // Login endpoint
    @PostMapping("/login")
    public Driver loginDriver(@RequestParam String email, @RequestParam String passwordHash) {
        return driverService.loginDriver(email, passwordHash);
    }

    // Get driver by ID endpoint (Read)
    @GetMapping("/{driverId}")
    public Driver getDriverById(@PathVariable int driverId) {
        return driverService.getDriverById(driverId);
    }

    // Get all drivers endpoint (Read)
    @GetMapping("/all")
    public List<Driver> getAllDrivers() {
        return driverService.getAllDrivers();
    }

    // Update driver endpoint (Update)
    @PutMapping("/{driverId}")
    public Driver updateDriver(@PathVariable int driverId, @RequestBody Driver driver) {
        return driverService.updateDriver(driverId, driver);
    }

    // Delete driver endpoint (Delete)
    @DeleteMapping("/{driverId}")
    public void deleteDriver(@PathVariable int driverId) {
        driverService.deleteDriver(driverId);
    }

    @GetMapping("/count")
    public long getTotalDrivers() {
        return driverService.getTotalDrivers();
    }
}
