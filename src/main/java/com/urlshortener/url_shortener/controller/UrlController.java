package com.urlshortener.url_shortener.controller;

import com.urlshortener.url_shortener.dto.CreateUrlRequest;
import com.urlshortener.url_shortener.dto.UpdateUrlRequest;
import com.urlshortener.url_shortener.dto.UrlResponse;
import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.entity.User;
import com.urlshortener.url_shortener.repository.UrlRepository;
import com.urlshortener.url_shortener.repository.UserRepository;
import com.urlshortener.url_shortener.service.UrlService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/urls")
public class UrlController {

    private final UrlService urlService;
    private final UserRepository userRepository;
    private final UrlRepository urlRepository;

    public UrlController(
            UrlService urlService,
            UserRepository userRepository,
            UrlRepository urlRepository) {

        this.urlService = urlService;
        this.userRepository = userRepository;
        this.urlRepository = urlRepository;
    }

    // CREATE SHORT URL
    @PostMapping
    public ResponseEntity<UrlResponse> createShortUrl(
            @Valid @RequestBody CreateUrlRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Url url = urlService.createShortUrl(request, user);

        UrlResponse response = new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getCustomAlias(),
                url.getCreatedAt(),
                url.getExpiresAt(),
                url.isActive()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET MY URLS
    @GetMapping
    public ResponseEntity<List<UrlResponse>> getMyUrls(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Url> urls =
                urlRepository.findByUserOrderByCreatedAtDesc(user);

        List<UrlResponse> response = urls.stream()
                .map(url -> new UrlResponse(
                        url.getId(),
                        url.getOriginalUrl(),
                        url.getShortCode(),
                        url.getCustomAlias(),
                        url.getCreatedAt(),
                        url.getExpiresAt(),
                        url.isActive()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    // GET SINGLE URL
    @GetMapping("/{id}")
    public ResponseEntity<UrlResponse> getUrlById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Url url = urlService.getUrlForUser(id, user);

        UrlResponse response = new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getCustomAlias(),
                url.getCreatedAt(),
                url.getExpiresAt(),
                url.isActive()
        );

        return ResponseEntity.ok(response);
    }

    // UPDATE URL
    @PutMapping("/{id}")
    public ResponseEntity<UrlResponse> updateUrl(
            @PathVariable Long id,
            @RequestBody UpdateUrlRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Url url = urlService.updateUrl(
                id,
                request,
                user
        );

        UrlResponse response = new UrlResponse(
                url.getId(),
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getCustomAlias(),
                url.getCreatedAt(),
                url.getExpiresAt(),
                url.isActive()
        );

        return ResponseEntity.ok(response);
    }

    // DELETE URL
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUrl(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        urlService.deleteUrl(id, user);

        return ResponseEntity.noContent().build();
    }
}