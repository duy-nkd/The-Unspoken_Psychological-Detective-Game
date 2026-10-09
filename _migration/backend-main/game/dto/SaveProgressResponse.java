package com.capstone.detectivegame.game.dto;

import java.time.LocalDateTime;

/** 200 OK của POST /api/game/save — {"message": "Game progress saved successfully", "updatedAt": "..."} (§4.3) */
public record SaveProgressResponse(String message, LocalDateTime updatedAt) {

    public static final String SAVED_MESSAGE = "Game progress saved successfully";

    public static SaveProgressResponse saved(LocalDateTime updatedAt) {
        return new SaveProgressResponse(SAVED_MESSAGE, updatedAt);
    }
}
