package com.capstone.detectivegame.common;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Một cửa xử lý lỗi cho toàn bộ REST API.
 * - ApiException: lỗi nghiệp vụ dự kiến -> log WARN, trả đúng mã.
 * - Lỗi không lường trước: log ERROR kèm stack trace -> trả 500 (không lộ chi tiết nội bộ).
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiErrorResponse> handleApi(ApiException ex, HttpServletRequest request) {
        log.warn("{} {} -> {} {}", request.getMethod(), request.getRequestURI(), ex.getStatus().value(), ex.getMessage());
        return build(ex.getStatus(), ex.getMessage(), request);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiErrorResponse> handleBadJson(HttpMessageNotReadableException ex, HttpServletRequest request) {
        log.warn("{} {} -> JSON không hợp lệ: {}", request.getMethod(), request.getRequestURI(), ex.getMostSpecificCause().getMessage());
        return build(HttpStatus.BAD_REQUEST, "Request body không phải JSON hợp lệ", request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleConstraint(DataIntegrityViolationException ex, HttpServletRequest request) {
        log.warn("{} {} -> vi phạm ràng buộc CSDL: {}", request.getMethod(), request.getRequestURI(), ex.getMostSpecificCause().getMessage());
        return build(HttpStatus.CONFLICT, "Dữ liệu vi phạm ràng buộc cơ sở dữ liệu", request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleUnexpected(Exception ex, HttpServletRequest request) {
        log.error("{} {} -> lỗi không lường trước", request.getMethod(), request.getRequestURI(), ex);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi máy chủ", request);
    }

    private ResponseEntity<ApiErrorResponse> build(HttpStatus status, String message, HttpServletRequest request) {
        ApiErrorResponse body = new ApiErrorResponse(
                status.value(), status.getReasonPhrase(), message, request.getRequestURI(), Instant.now());
        return ResponseEntity.status(status).body(body);
    }
}
