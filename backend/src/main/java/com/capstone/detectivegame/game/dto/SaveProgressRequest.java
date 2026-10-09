package com.capstone.detectivegame.game.dto;

/** POST /api/game/save — {"userId": 1, "currentChapter": 2, "credibilityScore": 85, "saveDataJson": "{...}"} (§4.3) */
public record SaveProgressRequest(Long userId, Integer currentChapter, Integer credibilityScore, String saveDataJson) {
}
