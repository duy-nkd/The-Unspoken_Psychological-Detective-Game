package com.capstone.detectivegame.admin.dto;

import java.time.LocalDateTime;

/**
 * Chi tiết bản lưu + saveDataJson của người chơi — phục vụ trực tiếp kịch bản E2E Testing (§5.2):
 * "Kiểm chứng trực tiếp dữ liệu trong cơ sở dữ liệu để đảm bảo chuỗi JSON lưu trạng thái Sổ tay
 * không bị cắt cụt hay sai định dạng".
 */
public record AdminUserSaveDetailDto(
        Long userId,
        String username,
        String email,
        Long saveId,
        int currentChapter,
        int credibilityScore,
        String saveDataJson,
        LocalDateTime updatedAt) {
}

