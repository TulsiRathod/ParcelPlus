package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.Driver;
import com.example.ParclePlus.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    // Register endpoint
    @PostMapping("/register")
    public Driver registerDriver(@RequestBody Driver driver) {
        return driverService.registerDriver(driver);
    }

    // Login endpoint
    @PostMapping("/login")
    public Driver loginDriver(@RequestParam String email, @RequestParam String passwordHash) {
        return driverService.loginDriver(email, passwordHash);
    }
}
