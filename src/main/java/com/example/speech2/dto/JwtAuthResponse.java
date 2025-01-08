package com.example.speech2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class JwtAuthResponse {
    private String token;

    // Constructeur par défaut
    public JwtAuthResponse() {
    }

    // Constructeur avec le token
    public JwtAuthResponse(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }

    // Setter
    public void setToken(String token) {
        this.token = token;
    }

}