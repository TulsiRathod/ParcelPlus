package com.example.ParclePlus.config;

import com.example.ParclePlus.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtAuthenticationFilter jwtAuthenticationFilter,
                                           CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            // Stateless JWT API: CSRF tokens are not used.
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // --- Public: registration, login, the vehicle list used by the
                //     registration dropdown, and the tracking WebSocket. ---
                .requestMatchers(HttpMethod.POST,
                        "/api/users/register", "/api/users/login",
                        "/api/drivers/register", "/api/drivers/login").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/vehicles/all").permitAll()
                .requestMatchers("/ws/**").permitAll()

                // --- Admin-only: dashboard counts and management CRUD. ---
                .requestMatchers(HttpMethod.GET,
                        "/api/users/all", "/api/users/count",
                        "/api/drivers/all", "/api/drivers/count",
                        "/api/vehicles/count", "/api/bookings/completed/count").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,
                        "/api/vehicles/add", "/api/pricing-factors/add").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/vehicles/**", "/api/drivers/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/vehicles/**", "/api/drivers/**").hasRole("ADMIN")

                // --- Everything else requires a valid token. ---
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
