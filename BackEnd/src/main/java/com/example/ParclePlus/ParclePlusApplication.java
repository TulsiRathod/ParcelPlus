package com.example.ParclePlus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.ParclePlus.entity")
public class ParclePlusApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParclePlusApplication.class, args);
    }
}