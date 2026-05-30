package com.example.ParclePlus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Returned on successful login. Carries the JWT plus the identifying fields the
 * frontend already relies on (userId / driverId / vehicleType).
 */
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;        // USER | ADMIN | DRIVER
    private Integer userId;     // null for drivers
    private Integer driverId;   // null for users
    private String name;
    private String email;
    private String vehicleType; // drivers only; null otherwise
}
