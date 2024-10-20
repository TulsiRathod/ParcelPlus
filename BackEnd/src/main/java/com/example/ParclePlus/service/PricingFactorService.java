package com.example.ParclePlus.service;

import com.example.ParclePlus.entity.PricingFactor;
import com.example.ParclePlus.repository.PricingFactorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PricingFactorService {

    @Autowired
    private PricingFactorRepository pricingFactorRepository;

    public PricingFactor addPricingFactor(PricingFactor pricingFactor) {
        return pricingFactorRepository.save(pricingFactor);
    }

    public PricingFactor getPricingFactorById(int factorId) {
        return pricingFactorRepository.findById(factorId).orElse(null);
    }
}
