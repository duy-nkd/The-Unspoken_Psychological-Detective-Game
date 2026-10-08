package com.capstone.detectivegame.game.dto;

import com.capstone.detectivegame.game.GameSave;
import java.time.LocalDateTime;

/**
 * 200 OK của GET /api/game/load/{userId}: "toàn bộ cấu trúc trạng thái hiện tại của game
 * (chapter, credibility, save_data_json)" (§4.3).
 * PENDING(ISS-14): tên trường chưa chốt — tạm dùng cùng tên với payload save để Frontend đối xứng.
 */
public record GameProgressResponse(Integer currentChapter, Integer credibilityScore, String saveDataJson,
        LocalDateTime updatedAt) {

    public static GameProgressResponse from(GameSave save) {
        return new GameProgressResponse(
                save.getCurrentChapter(), save.getCredibilityScore(), save.getSaveDataJson(), save.getUpdatedAt());
    }
}
