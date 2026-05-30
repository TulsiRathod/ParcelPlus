package com.example.ParclePlus.controller;

import com.example.ParclePlus.dto.AuthResponse;
import com.example.ParclePlus.dto.LoginRequest;
import com.example.ParclePlus.entity.User;
import com.example.ParclePlus.security.JwtService;
import com.example.ParclePlus.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    // Register endpoint
    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login endpoint — verifies credentials and returns a JWT.
    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginRequest request) {
        User user = userService.loginUser(request.getEmail(), request.getPassword());
        String role = (user.getRole() == null || user.getRole().isBlank()) ? "USER" : user.getRole();
        String token = jwtService.generateToken(user.getEmail(),
                Map.of("role", role, "id", user.getUserId(), "type", "USER"));
        return new AuthResponse(token, role, user.getUserId(), null,
                user.getName(), user.getEmail(), null);
    }

    // ** Get all users endpoint **
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/count")
    public long getTotalDrivers() {
        return userService.getTotalUsers();
    }
}
