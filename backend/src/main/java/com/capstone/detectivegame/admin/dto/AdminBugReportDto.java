package com.capstone.detectivegame.admin.dto;

import java.time.LocalDateTime;

/** Dòng báo cáo lỗi hiển thị trên bảng thời gian thực của Admin Dashboard (§5.1). */
public record AdminBugReportDto(
        Long id,
        Long userId,
        String username,
        String reportContent,
        String status,
        LocalDateTime createdAt) {
}

