package com.capstone.detectivegame.admin;

import com.capstone.detectivegame.user.User;
import com.capstone.detectivegame.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Khởi tạo tự động tài khoản Admin duy nhất khi ứng dụng khởi chạy (DEC-024).
 * Đăng ký thông thường qua /api/auth/register luôn gán ROLE_PLAYER; chỉ tài khoản này có ROLE_ADMIN.
 */
@Component
public class AdminSeeder implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AdminProperties adminProperties;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder,
            AdminProperties adminProperties) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminProperties = adminProperties;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        String username = adminProperties.username();
        String email = adminProperties.email();
        String password = adminProperties.password();

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return;
        }

        if (userRepository.existsByUsername(username)) {
            return;
        }

        String safeEmail = (email == null || email.isBlank() || userRepository.existsByEmail(email))
                ? username + "@k-estate.local"
                : email;

        User admin = new User(username.trim(), safeEmail.trim(), passwordEncoder.encode(password), User.ROLE_ADMIN);
        userRepository.save(admin);
        log.info("Đã khởi tạo tài khoản quản trị duy nhất: username='{}' (role={})", username, User.ROLE_ADMIN);
    }
}

