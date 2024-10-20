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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    private String pickupLocation;  // Geography/Point type
    private String dropoffLocation; // Geography/Point type
    private String status;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
