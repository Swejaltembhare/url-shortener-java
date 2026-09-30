package com.urlshortener.url_shortener.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisCacheService {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final String URL_KEY_PREFIX = "url:";

    // Cache will remain for 1 hour
    private static final Duration CACHE_DURATION =
            Duration.ofHours(1);

    public RedisCacheService(
            RedisTemplate<String, Object> redisTemplate) {

        this.redisTemplate = redisTemplate;
    }

    // Get original URL from Redis
    public String getOriginalUrl(String shortCode) {

        Object value = redisTemplate.opsForValue()
                .get(URL_KEY_PREFIX + shortCode);

        if (value == null) {
            return null;
        }

        return value.toString();
    }

    // Save original URL in Redis
    public void saveOriginalUrl(
            String shortCode,
            String originalUrl) {

        redisTemplate.opsForValue().set(
                URL_KEY_PREFIX + shortCode,
                originalUrl,
                CACHE_DURATION
        );
    }

    // Remove URL from Redis
    public void deleteOriginalUrl(String shortCode) {

        redisTemplate.delete(
                URL_KEY_PREFIX + shortCode
        );
    }
}