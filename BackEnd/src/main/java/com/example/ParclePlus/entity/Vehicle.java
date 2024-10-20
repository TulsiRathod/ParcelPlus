package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;
    private String type;
    private int capacity;
    private BigDecimal baseRate;
    private BigDecimal perKmRate;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
