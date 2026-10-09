package com.capstone.detectivegame.auth;

import com.capstone.detectivegame.auth.dto.JwtResponse;
import com.capstone.detectivegame.auth.dto.LoginRequest;
import com.capstone.detectivegame.auth.dto.RegisterRequest;
import com.capstone.detectivegame.common.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Authentication API — Project.docx §4.3. Controller chỉ ánh xạ HTTP <-> DTO, logic ở AuthService. */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** POST /api/auth/register -> 201 Created kèm thông báo thành công. */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponse register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return new MessageResponse("Đăng ký tài khoản thành công");
    }

    /** POST /api/auth/login -> 200 OK {token, type, username, role}. */
    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
