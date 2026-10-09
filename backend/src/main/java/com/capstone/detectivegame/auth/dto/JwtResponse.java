package com.capstone.detectivegame.auth.dto;

/**
 * 200 OK của POST /api/auth/login (§4.3):
 * {"token": "eyJhbGciOi...", "type": "Bearer", "username": "string", "role": "ROLE_PLAYER"}
 * PENDING(ISS-29): không có userId nhưng /api/game/save, /load/{userId} cần userId.
 */
public record JwtResponse(String token, String type, String username, String role) {

    public static final String TOKEN_TYPE = "Bearer";

    public static JwtResponse bearer(String token, String username, String role) {
        return new JwtResponse(token, TOKEN_TYPE, username, role);
    }
}
