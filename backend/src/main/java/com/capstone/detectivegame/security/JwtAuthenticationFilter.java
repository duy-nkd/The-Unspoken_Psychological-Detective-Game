package com.capstone.detectivegame.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Project.docx §4.2 & §1.2 Bước 3:
 * kế thừa OncePerRequestFilter, lấy token từ header Authorization ("Bearer <token>"),
 * kiểm tra chữ ký + hạn bằng JJWT; hợp lệ -> tạo UsernamePasswordAuthenticationToken
 * gán vào SecurityContextHolder. Token sai/thiếu: không chặn ở đây — SecurityConfig quyết định 401.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header != null && header.startsWith(BEARER_PREFIX)) {
            String token = header.substring(BEARER_PREFIX.length()).trim();
            tokenProvider.parseValidClaims(token).ifPresent(claims -> {
                String role = claims.get(JwtTokenProvider.ROLE_CLAIM, String.class);
                List<SimpleGrantedAuthority> authorities =
                        role == null ? List.of() : List.of(new SimpleGrantedAuthority(role));
                var authentication = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            });
        }
        chain.doFilter(request, response);
    }
}
