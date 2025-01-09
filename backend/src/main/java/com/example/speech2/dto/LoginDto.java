package com.example.speech2.dto;

import lombok.Data;

public class LoginDto {
    private String username;
    private String password;

    // Constructeur par défaut
    public LoginDto() {
    }

    // Constructeur avec paramètres
    public LoginDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}