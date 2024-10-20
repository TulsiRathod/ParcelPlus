package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.User;
import com.example.ParclePlus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register endpoint
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login endpoint
    @PostMapping("/login")
    public User loginUser(@RequestParam String email, @RequestParam String passwordHash) {
        return userService.loginUser(email, passwordHash);
    }
}
