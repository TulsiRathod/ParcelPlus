package com.example.ParclePlus.repository;

import com.example.ParclePlus.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Integer> {
    Driver findByEmail(String email); // For login functionality
}
