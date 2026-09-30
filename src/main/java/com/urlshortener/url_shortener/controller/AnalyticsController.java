package com.urlshortener.url_shortener.controller;

import com.urlshortener.url_shortener.entity.ClickEvent;
import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.entity.User;
import com.urlshortener.url_shortener.repository.UrlRepository;
import com.urlshortener.url_shortener.repository.UserRepository;
import com.urlshortener.url_shortener.service.AnalyticsService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final UrlRepository urlRepository;
    private final UserRepository userRepository;

    public AnalyticsController(
            AnalyticsService analyticsService,
            UrlRepository urlRepository,
            UserRepository userRepository) {

        this.analyticsService = analyticsService;
        this.urlRepository = urlRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> getAnalytics(
            @PathVariable String shortCode,
            Authentication authentication) {

        // Get logged-in user's email
        String email = authentication.getName();

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Find URL
        Url url = urlRepository.findByShortCodeIgnoreCase(shortCode)
                .orElseThrow(() ->
                        new RuntimeException("Short URL not found"));

        // Check URL ownership
        if (url.getUser() == null ||
                !url.getUser().getId().equals(user.getId())) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("You are not allowed to view analytics for this URL");
        }

        // Get total clicks
        long totalClicks =
                analyticsService.getTotalClicks(url);

        // Get click history
        List<ClickEvent> clickHistory =
                analyticsService.getClickHistory(url);

        // Convert ClickEvent to safe response
        List<ClickResponse> clicks = clickHistory.stream()
                .map(click -> new ClickResponse(
                        click.getId(),
                        click.getClickedAt(),
                        click.getIpAddress(),
                        click.getUserAgent()
                ))
                .toList();

        return ResponseEntity.ok(
                new AnalyticsResponse(
                        url.getShortCode(),
                        totalClicks,
                        clicks
                )
        );
    }

    // Main Analytics Response
    public static class AnalyticsResponse {

        private String shortCode;
        private long totalClicks;
        private List<ClickResponse> clickHistory;

        public AnalyticsResponse(
                String shortCode,
                long totalClicks,
                List<ClickResponse> clickHistory) {

            this.shortCode = shortCode;
            this.totalClicks = totalClicks;
            this.clickHistory = clickHistory;
        }

        public String getShortCode() {
            return shortCode;
        }

        public long getTotalClicks() {
            return totalClicks;
        }

        public List<ClickResponse> getClickHistory() {
            return clickHistory;
        }
    }

    // Safe Click Response
    public static class ClickResponse {

        private Long id;
        private LocalDateTime clickedAt;
        private String ipAddress;
        private String userAgent;

        public ClickResponse(
                Long id,
                LocalDateTime clickedAt,
                String ipAddress,
                String userAgent) {

            this.id = id;
            this.clickedAt = clickedAt;
            this.ipAddress = ipAddress;
            this.userAgent = userAgent;
        }

        public Long getId() {
            return id;
        }

        public LocalDateTime getClickedAt() {
            return clickedAt;
        }

        public String getIpAddress() {
            return ipAddress;
        }

        public String getUserAgent() {
            return userAgent;
        }
    }
}