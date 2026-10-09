package com.capstone.detectivegame.security;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Nguồn Frontend React được phép gọi API (Project.docx §4.2: cấu hình CORS cho Frontend React).
 * app.cors.allowed-origins (biến môi trường CORS_ALLOWED_ORIGINS, phân tách bằng dấu phẩy).
 */
@ConfigurationProperties(prefix = "app.cors")
public record CorsProperties(List<String> allowedOrigins) {
}
