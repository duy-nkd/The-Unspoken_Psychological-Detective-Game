package com.capstone.detectivegame.auth.dto;

/** POST /api/auth/register — {"username": "string", "email": "string", "password": "string"} (§4.3) */
public record RegisterRequest(String username, String email, String password) {
}
