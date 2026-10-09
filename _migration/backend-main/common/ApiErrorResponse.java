package com.capstone.detectivegame.common;

import java.time.Instant;

/**
 * Định dạng JSON lỗi thống nhất cho mọi endpoint.
 * PENDING(ISS-13): tài liệu chưa quy định định dạng lỗi — đây là định dạng tạm chờ duyệt.
 */
public record ApiErrorResponse(int status, String error, String message, String path, Instant timestamp) {
}
