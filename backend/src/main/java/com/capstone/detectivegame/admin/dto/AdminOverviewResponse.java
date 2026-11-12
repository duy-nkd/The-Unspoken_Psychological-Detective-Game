package com.capstone.detectivegame.admin.dto;

import java.util.List;

/**
 * Thống kê tổng quan Admin Dashboard — Project.docx §5.1 & §6.1:
 * - Số lượng tài khoản hoạt động
 * - Tỷ lệ % người chơi hoàn thành Chương 1 -> Chương 5
 * - Thống kê điểm uy tín & báo cáo lỗi chờ xử lý
 */
public record AdminOverviewResponse(
        long totalPlayers,
        long activePlayers,
        double averageCredibility,
        long lowCredibilityCount,
        long pendingBugReports,
        long resolvedBugReports,
        long totalEvidenceMaster,
        List<ChapterStatDto> chapterStats) {

    public record ChapterStatDto(
            int chapter,
            String title,
            long reachedCount,
            long completedCount,
            double reachedPercentage,
            double completedPercentage) {
    }
}

