package com.capstone.detectivegame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

/**
 * Điểm khởi động backend.
 * Cấu trúc package theo tính năng (package-by-feature), mỗi tính năng giữ đủ tầng
 * Controller -> Service -> Repository (Project.docx §1.2). Xem docs/ARCHITECTURE.md.
 *
 * Loại UserDetailsServiceAutoConfiguration: hệ thống xác thực bằng JWT riêng (§4.2),
 * không dùng user mặc định do Spring Boot sinh.
 */
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@ConfigurationPropertiesScan
public class DetectiveGameApplication {
    public static void main(String[] args) {
        SpringApplication.run(DetectiveGameApplication.class, args);
    }
}
