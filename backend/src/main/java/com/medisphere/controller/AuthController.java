package com.medisphere.controller;

import com.medisphere.dto.LoginRequest;
import com.medisphere.dto.LoginResponse;
import com.medisphere.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping("/profile")
    public String profile() {
        return "Welcome Admin! JWT Authentication Successful.";
    }
}