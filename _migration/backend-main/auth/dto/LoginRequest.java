package com.capstone.detectivegame.auth.dto;

/** POST /api/auth/login — {"username": "string", "password": "string"} (§4.3) */
public record LoginRequest(String username, String password) {
}
