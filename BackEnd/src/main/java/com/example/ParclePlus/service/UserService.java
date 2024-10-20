package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.User;
import com.example.ParclePlus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public User registerUser(User user) {
        // Check if the user already exists by email
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with this email already exists.");
        }
        user.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        user.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }

    // Login for user
    public User loginUser(String email, String passwordHash) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPasswordHash().equals(passwordHash)) {
            return user;
        }
        throw new IllegalArgumentException("Invalid email or password.");
    }
}
