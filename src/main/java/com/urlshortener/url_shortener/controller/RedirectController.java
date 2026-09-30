package com.urlshortener.url_shortener.controller;

import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.repository.UrlRepository;
import com.urlshortener.url_shortener.service.AnalyticsService;
import com.urlshortener.url_shortener.service.RedisCacheService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
public class RedirectController {

    private final UrlRepository urlRepository;
    private final AnalyticsService analyticsService;
    private final RedisCacheService redisCacheService;

    public RedirectController(
            UrlRepository urlRepository,
            AnalyticsService analyticsService,
            RedisCacheService redisCacheService) {

        this.urlRepository = urlRepository;
        this.analyticsService = analyticsService;
        this.redisCacheService = redisCacheService;
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(
            @PathVariable String shortCode,
            HttpServletRequest request) {

        // 1. Find URL from database
        Url url = urlRepository.findByShortCodeIgnoreCase(shortCode)
                .orElseThrow(() ->
                        new RuntimeException("Short URL not found"));

        // 2. Check active status
        if (!url.isActive()) {

            redisCacheService.deleteOriginalUrl(shortCode);

            return ResponseEntity
                    .status(HttpStatus.GONE)
                    .build();
        }

        // 3. Check expiry
        if (url.getExpiresAt() != null
                && url.getExpiresAt().isBefore(LocalDateTime.now())) {

            url.setActive(false);
            urlRepository.save(url);

            redisCacheService.deleteOriginalUrl(shortCode);

            return ResponseEntity
                    .status(HttpStatus.GONE)
                    .build();
        }

        // 4. Check Redis cache
        String originalUrl =
                redisCacheService.getOriginalUrl(shortCode);

        // 5. Cache MISS
        if (originalUrl == null) {

            System.out.println("Redis Cache MISS");

            originalUrl = url.getOriginalUrl();

            redisCacheService.saveOriginalUrl(
                    shortCode,
                    originalUrl
            );

        } else {

            // 6. Cache HIT
            System.out.println("Redis Cache HIT");
        }

        // 7. Record click
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");

        analyticsService.recordClick(
                url,
                ipAddress,
                userAgent
        );

        // 8. Redirect
        HttpHeaders headers = new HttpHeaders();

        headers.setLocation(
                java.net.URI.create(originalUrl)
        );

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .headers(headers)
                .build();
    }
}