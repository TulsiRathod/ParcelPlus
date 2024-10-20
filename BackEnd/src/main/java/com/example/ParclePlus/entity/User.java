package com.example.ParclePlus.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "users")  // Specify the table name here
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String name;
    private String email;
    private String phone;
    private String passwordHash;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
