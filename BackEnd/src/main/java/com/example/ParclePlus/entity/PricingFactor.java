package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
public class PricingFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int factorId;
    private String region;
    private BigDecimal demandFactor;
    private String vehicleType;
    private Timestamp updatedAt;
}
