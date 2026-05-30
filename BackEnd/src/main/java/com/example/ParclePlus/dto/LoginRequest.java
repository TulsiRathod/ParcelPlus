package com.example.ParclePlus.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/** Credentials payload for the login endpoints. */
@Data
public class LoginRequest {

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
