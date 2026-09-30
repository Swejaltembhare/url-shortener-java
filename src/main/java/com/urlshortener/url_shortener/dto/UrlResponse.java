package com.urlshortener.url_shortener.dto;

import java.time.LocalDateTime;

public class UrlResponse {

    private Long id;
    private String originalUrl;
    private String shortCode;
    private String customAlias;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private boolean active;

    public UrlResponse(
            Long id,
            String originalUrl,
            String shortCode,
            String customAlias,
            LocalDateTime createdAt,
            LocalDateTime expiresAt,
            boolean active) {

        this.id = id;
        this.originalUrl = originalUrl;
        this.shortCode = shortCode;
        this.customAlias = customAlias;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public String getShortCode() {
        return shortCode;
    }

    public String getCustomAlias() {
        return customAlias;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public boolean isActive() {
        return active;
    }
}