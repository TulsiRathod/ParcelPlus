package com.example.ParclePlus.config;

import com.example.ParclePlus.websocket.VehicleTrackingWebSocketHandler;  // Ensure correct import
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final VehicleTrackingWebSocketHandler vehicleTrackingWebSocketHandler;

    public WebSocketConfig(VehicleTrackingWebSocketHandler vehicleTrackingWebSocketHandler) {
        this.vehicleTrackingWebSocketHandler = vehicleTrackingWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(vehicleTrackingWebSocketHandler, "/ws/track").setAllowedOrigins("*");
    }
}
