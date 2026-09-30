package com.urlshortener.url_shortener.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimitService {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final int MAX_REQUESTS = 100;
    private static final Duration WINDOW = Duration.ofMinutes(1);

    public RateLimitService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public boolean isAllowed(String ipAddress) {

        String key = "rate_limit:" + ipAddress;

        Long requestCount = redisTemplate.opsForValue()
                .increment(key);

        if (requestCount != null && requestCount == 1) {
            redisTemplate.expire(key, WINDOW);
        }

        return requestCount != null && requestCount <= MAX_REQUESTS;
    }
}