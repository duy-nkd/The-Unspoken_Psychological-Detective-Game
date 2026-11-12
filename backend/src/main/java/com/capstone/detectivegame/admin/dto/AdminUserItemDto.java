package com.capstone.detectivegame.admin.dto;

import java.time.LocalDateTime;

/** Thông tin người dùng kèm tóm tắt tiến trình chơi gần nhất (Admin Users Management). */
public record AdminUserItemDto(
        Long id,
        String username,
        String email,
        String role,
        LocalDateTime createdAt,
        boolean hasSave,
        Integer currentChapter,
        Integer credibilityScore,
        LocalDateTime lastSavedAt) {
}

