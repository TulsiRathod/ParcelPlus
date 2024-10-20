package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.Analytics;
import com.example.ParclePlus.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/add")
    public Analytics addAnalytics(@RequestBody Analytics analytics) {
        return analyticsService.addAnalytics(analytics);
    }

    @GetMapping("/{analyticId}")
    public Analytics getAnalyticsById(@PathVariable int analyticId) {
        return analyticsService.getAnalyticsById(analyticId);
    }
}