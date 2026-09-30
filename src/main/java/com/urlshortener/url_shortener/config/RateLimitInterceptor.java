package com.urlshortener.url_shortener.config;

import com.urlshortener.url_shortener.service.RateLimitService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final RateLimitService rateLimitService;

    public RateLimitInterceptor(RateLimitService rateLimitService) {
        this.rateLimitService = rateLimitService;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler) {

        String ipAddress = request.getRemoteAddr();

        boolean allowed =
                rateLimitService.isAllowed(ipAddress);

        if (!allowed) {

            response.setStatus(429);

            response.setContentType("application/json");

            try {
                response.getWriter().write(
                        "{\"message\":\"Too many requests. Please try again later.\"}"
                );
            } catch (Exception e) {
                e.printStackTrace();
            }

            return false;
        }

        return true;
    }
}