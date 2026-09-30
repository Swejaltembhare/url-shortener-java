package com.urlshortener.url_shortener.service;

import com.urlshortener.url_shortener.dto.LoginRequest;
import com.urlshortener.url_shortener.dto.RegisterRequest;
import com.urlshortener.url_shortener.dto.AuthResponse;
import com.urlshortener.url_shortener.entity.User;
import com.urlshortener.url_shortener.repository.UserRepository;
import com.urlshortener.url_shortener.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Register
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole("USER");

        return userRepository.save(user);
    }

    // Login
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "Login successful"
        );
    }
}