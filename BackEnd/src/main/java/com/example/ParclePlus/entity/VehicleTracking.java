package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
public class VehicleTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int trackingId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private String location; // Store the location
    private Timestamp timestamp;
}
