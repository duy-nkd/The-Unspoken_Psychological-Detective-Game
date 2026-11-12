package com.capstone.detectivegame.admin.dto;

/** Payload cập nhật trạng thái báo cáo lỗi PENDING <-> RESOLVED (§5.1). */
public record UpdateBugStatusRequest(String status) {
}

