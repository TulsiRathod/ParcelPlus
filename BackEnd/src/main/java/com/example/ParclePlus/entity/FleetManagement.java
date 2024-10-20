package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
public class FleetManagement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fleetId;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    private String status;
    private Timestamp lastMaintenance;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
