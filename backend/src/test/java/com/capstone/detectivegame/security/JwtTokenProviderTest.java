package com.capstone.detectivegame.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

/** Unit test không cần Spring context / MySQL — chạy nhanh bằng `mvn test`. */
class JwtTokenProviderTest {

    private static final String SECRET = "test-secret-that-is-long-enough-for-hs256-algorithm";

    @Test
    void tokenHopLeDocLaiDungUsernameVaRole() {
        JwtTokenProvider provider = new JwtTokenProvider(new JwtProperties(SECRET, 60_000));
        String token = provider.generateToken("detective", "ROLE_PLAYER");

        var claims = provider.parseValidClaims(token).orElseThrow();
        assertEquals("detective", claims.getSubject());
        assertEquals("ROLE_PLAYER", claims.get(JwtTokenProvider.ROLE_CLAIM, String.class));
    }

    @Test
    void tokenSaiChuKyBiTuChoi() {
        JwtTokenProvider issuer = new JwtTokenProvider(new JwtProperties(SECRET, 60_000));
        JwtTokenProvider other = new JwtTokenProvider(new JwtProperties(SECRET + "-other", 60_000));
        assertTrue(other.parseValidClaims(issuer.generateToken("detective", "ROLE_PLAYER")).isEmpty());
    }

    @Test
    void tokenHetHanBiTuChoi() {
        JwtTokenProvider provider = new JwtTokenProvider(new JwtProperties(SECRET, -1_000));
        assertTrue(provider.parseValidClaims(provider.generateToken("detective", "ROLE_PLAYER")).isEmpty());
    }

    @Test
    void secretQuaNganBaoLoiNgayKhiKhoiDong() {
        assertThrows(IllegalStateException.class, () -> new JwtTokenProvider(new JwtProperties("short", 60_000)));
    }
}
