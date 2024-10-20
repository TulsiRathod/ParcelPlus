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
//psql -h dpg-cs9te2jqf0us739mtoeg-a.oregon-postgres.render.com -U root -d parcelplus
//kNGCpSY1lIQ8yaA3OpyKF2Mdk1yPpZ6O