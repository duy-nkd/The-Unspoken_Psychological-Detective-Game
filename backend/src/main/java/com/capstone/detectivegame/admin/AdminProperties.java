package com.capstone.detectivegame.admin;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** Cấu hình tài khoản Admin duy nhất khởi tạo tự động (app.admin.* trong application.yml). */
@ConfigurationProperties(prefix = "app.admin")
public record AdminProperties(String username, String email, String password) {
}

