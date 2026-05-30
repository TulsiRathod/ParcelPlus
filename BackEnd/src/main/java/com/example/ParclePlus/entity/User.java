package com.example.ParclePlus.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Column(unique = true)
    private String email;

    private String phone;

    // Accepts the raw password on input; never serialized back to clients.
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String passwordHash;

    // Authorization role: "USER" or "ADMIN". Read-only over the API so clients
    // cannot self-promote on registration; promote to ADMIN via SQL/seed.
    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String role = "USER";

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
