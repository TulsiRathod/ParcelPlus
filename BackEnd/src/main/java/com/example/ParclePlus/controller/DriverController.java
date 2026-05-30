package com.example.ParclePlus.controller;

import com.example.ParclePlus.dto.AuthResponse;
import com.example.ParclePlus.dto.LoginRequest;
import com.example.ParclePlus.entity.Driver;
import com.example.ParclePlus.security.JwtService;
import com.example.ParclePlus.service.DriverService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @Autowired
    private JwtService jwtService;

    // Register endpoint (Create)
    @PostMapping("/register")
    public Driver registerDriver(@Valid @RequestBody Driver driver) {
        return driverService.registerDriver(driver);
    }

    // Login endpoint — verifies credentials and returns a JWT.
    @PostMapping("/login")
    public AuthResponse loginDriver(@Valid @RequestBody LoginRequest request) {
        Driver driver = driverService.loginDriver(request.getEmail(), request.getPassword());
        String token = jwtService.generateToken(driver.getEmail(),
                Map.of("role", "DRIVER", "id", driver.getDriverId(), "type", "DRIVER"));
        return new AuthResponse(token, "DRIVER", null, driver.getDriverId(),
                driver.getName(), driver.getEmail(), driver.getVehicleType());
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
