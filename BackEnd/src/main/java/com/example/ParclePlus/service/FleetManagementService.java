package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.FleetManagement;
import com.example.ParclePlus.repository.FleetManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FleetManagementService {

    @Autowired
    private FleetManagementRepository fleetManagementRepository;

    public FleetManagement addFleetManagement(FleetManagement fleetManagement) {
        fleetManagement.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        fleetManagement.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        return fleetManagementRepository.save(fleetManagement);
    }

    public FleetManagement getFleetById(int fleetId) {
        return fleetManagementRepository.findById(fleetId).orElse(null);
    }
}
