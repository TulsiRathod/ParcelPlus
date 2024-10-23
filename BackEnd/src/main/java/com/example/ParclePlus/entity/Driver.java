package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int driverId;

    private String name;
    private String email;
    private String phone;
    private String vehicleType;
    private String passwordHash;  // Ensure password hashing logic is handled elsewhere
    private String location; // Geography/Point type for future location tracking

    private boolean availability;  // For driver availability status
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
