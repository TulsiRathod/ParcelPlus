package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.Analytics;
import com.example.ParclePlus.repository.AnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    public Analytics addAnalytics(Analytics analytics) {
        return analyticsRepository.save(analytics);
    }

    public Analytics getAnalyticsById(int analyticId) {
        return analyticsRepository.findById(analyticId).orElse(null);
    }
}
