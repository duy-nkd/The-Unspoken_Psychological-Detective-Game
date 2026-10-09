package com.capstone.detectivegame.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Tạo và kiểm tra JWT bằng thư viện JJWT (Project.docx §4.2).
 * Subject = username; claim "role" = vai trò (vd ROLE_PLAYER).
 */
@Component
public class JwtTokenProvider {

    static final String ROLE_CLAIM = "role";
    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

    private final SecretKey key;
    private final long expirationMs;

    public JwtTokenProvider(JwtProperties properties) {
        if (properties.secret() == null || properties.secret().getBytes(StandardCharsets.UTF_8).length < 32) {
            // HS256 yêu cầu khóa >= 256 bit; báo lỗi rõ ràng ngay khi khởi động thay vì lỗi khó hiểu về sau
            throw new IllegalStateException("app.jwt.secret phải dài tối thiểu 32 byte (đặt biến JWT_SECRET)");
        }
        this.key = Keys.hmacShaKeyFor(properties.secret().getBytes(StandardCharsets.UTF_8));
        this.expirationMs = properties.expirationMs();
    }

    public String generateToken(String username, String role) {
        Date now = new Date();
        return Jwts.builder()
                .subject(username)
                .claim(ROLE_CLAIM, role)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expirationMs))
                .signWith(key)
                .compact();
    }

    /** Trả về claims nếu token hợp lệ (đúng chữ ký, chưa hết hạn); ngược lại Optional.empty(). */
    public Optional<Claims> parseValidClaims(String token) {
        try {
            return Optional.of(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
        } catch (JwtException | IllegalArgumentException ex) {
            log.debug("JWT không hợp lệ: {}", ex.getMessage());
            return Optional.empty();
        }
    }
}
