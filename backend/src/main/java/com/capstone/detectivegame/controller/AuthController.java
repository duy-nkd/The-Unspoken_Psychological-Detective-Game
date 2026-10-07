package com.capstone.detectivegame.controller;

import com.capstone.detectivegame.config.JwtTokenProvider;
import com.capstone.detectivegame.dto.request.LoginRequest;
import com.capstone.detectivegame.dto.response.JwtResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtTokenProvider tokenProvider;
    public AuthController(JwtTokenProvider tokenProvider) { this.tokenProvider = tokenProvider; }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        return new JwtResponse(tokenProvider.createToken(request.email()), "Bearer");
    }

    @PostMapping("/register")
    public JwtResponse register(@RequestBody LoginRequest request) {
        return new JwtResponse(tokenProvider.createToken(request.email()), "Bearer");
    }
}
