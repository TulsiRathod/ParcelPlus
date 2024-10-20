package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.FleetManagement;
import com.example.ParclePlus.service.FleetManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fleet-management")
public class FleetManagementController {

    @Autowired
    private FleetManagementService fleetManagementService;

    @PostMapping("/add")
    public FleetManagement addFleetManagement(@RequestBody FleetManagement fleetManagement) {
        return fleetManagementService.addFleetManagement(fleetManagement);
    }

    @GetMapping("/{fleetId}")
    public FleetManagement getFleetById(@PathVariable int fleetId) {
        return fleetManagementService.getFleetById(fleetId);
    }
}
