package com.example.ParclePlus.controller;

import com.example.ParclePlus.entity.PricingFactor;
import com.example.ParclePlus.service.PricingFactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pricing-factors")
public class PricingFactorController {

    @Autowired
    private PricingFactorService pricingFactorService;

    @PostMapping("/add")
    public PricingFactor addPricingFactor(@RequestBody PricingFactor pricingFactor) {
        return pricingFactorService.addPricingFactor(pricingFactor);
    }

    @GetMapping("/{factorId}")
    public PricingFactor getPricingFactorById(@PathVariable int factorId) {
        return pricingFactorService.getPricingFactorById(factorId);
    }
}
