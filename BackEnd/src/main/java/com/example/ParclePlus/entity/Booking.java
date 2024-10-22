package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // User is required
    private User user;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = true) // Driver can be null
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false) // Vehicle is required
    private Vehicle vehicle;

    private String pickupLocation;  // Geography/Point type
    private String dropoffLocation; // Geography/Point type
    private String pickupCity;      // New field for pickup city
    private String dropoffCity;     // New field for dropoff city
    private String status;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
