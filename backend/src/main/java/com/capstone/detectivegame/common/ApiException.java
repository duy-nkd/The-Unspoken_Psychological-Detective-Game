package com.capstone.detectivegame.common;

import org.springframework.http.HttpStatus;

/**
 * Lỗi nghiệp vụ có mã HTTP. Service ném ApiException; GlobalExceptionHandler chuyển thành JSON.
 * Không bắt rồi nuốt lỗi trong Controller/Service -> mọi lỗi đều đi qua một cửa, dễ debug.
 */
public class ApiException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public static ApiException badRequest(String message) {
        return new ApiException(HttpStatus.BAD_REQUEST, message);
    }

    public static ApiException notFound(String message) {
        return new ApiException(HttpStatus.NOT_FOUND, message);
    }

    public static ApiException conflict(String message) {
        return new ApiException(HttpStatus.CONFLICT, message);
    }

    public static ApiException unauthorized(String message) {
        return new ApiException(HttpStatus.UNAUTHORIZED, message);
    }
}
