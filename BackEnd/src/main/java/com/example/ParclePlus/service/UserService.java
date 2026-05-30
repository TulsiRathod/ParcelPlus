package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.User;
import com.example.ParclePlus.exception.InvalidCredentialsException;
import com.example.ParclePlus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register a new user
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with this email already exists.");
        }
        // Hash the raw password supplied by the client before persisting it.
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        // Never trust a client-supplied role; new accounts are always plain users.
        user.setRole("USER");
        user.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        user.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }

    // Login for user
    public User loginUser(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            return user;
        }
        throw new InvalidCredentialsException("Invalid email or password.");
    }

    // ** Fetch all users **
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public long getTotalUsers() {
        return userRepository.count();
    }
}
