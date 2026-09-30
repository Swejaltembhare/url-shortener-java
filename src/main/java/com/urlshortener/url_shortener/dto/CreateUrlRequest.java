package com.urlshortener.url_shortener.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public class CreateUrlRequest {

    @NotBlank(message = "Original URL is required")
    @Pattern(
        regexp = "^(https?://).+",
        message = "URL must start with http:// or https://"
    )
    private String originalUrl;

    private String customAlias;

    private LocalDateTime expiresAt;

    public CreateUrlRequest() {
    }

    public CreateUrlRequest(String originalUrl, String customAlias, LocalDateTime expiresAt) {
        this.originalUrl = originalUrl;
        this.customAlias = customAlias;
        this.expiresAt = expiresAt;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getCustomAlias() {
        return customAlias;
    }

    public void setCustomAlias(String customAlias) {
        this.customAlias = customAlias;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}