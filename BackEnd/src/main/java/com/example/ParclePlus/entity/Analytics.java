package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int analyticId;
    private int totalTrips;
    private String averageTripTime; // Storing as a string/interval type
    private BigDecimal totalRevenue;
    private Timestamp date;
}
