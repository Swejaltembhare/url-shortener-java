package com.urlshortener.url_shortener.dto;

import java.time.LocalDateTime;

public class UpdateUrlRequest {

    private String customAlias;
    private LocalDateTime expiresAt;
    private Boolean active;

    public UpdateUrlRequest() {
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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}