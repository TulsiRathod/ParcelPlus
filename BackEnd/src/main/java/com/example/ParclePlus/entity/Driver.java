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
    private String licensePlate;
    private String location; // Geography/Point type

    private String passwordHash;  // Make sure this field exists

    private boolean availability;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
