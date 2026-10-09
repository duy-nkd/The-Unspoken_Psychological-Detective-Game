package com.capstone.detectivegame.report.dto;

/** POST /api/reports/bug — {"userId": 1, "reportContent": "Bug description..."} (§4.3) */
public record BugReportRequest(Long userId, String reportContent) {
}
