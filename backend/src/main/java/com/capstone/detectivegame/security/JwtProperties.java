package com.capstone.detectivegame.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Cấu hình JWT đọc từ application.yml (Project.docx §4.2: Secret Key cấu hình trong application.yml).
 *   app.jwt.secret         (biến môi trường JWT_SECRET)
 *   app.jwt.expiration-ms  (biến môi trường JWT_EXPIRATION_MS)
 * PENDING(ISS-13): thời hạn token chưa được tài liệu quy định.
 */
@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(String secret, long expirationMs) {
}
