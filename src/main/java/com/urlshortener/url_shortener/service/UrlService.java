package com.urlshortener.url_shortener.service;

import com.urlshortener.url_shortener.dto.CreateUrlRequest;
import com.urlshortener.url_shortener.dto.UpdateUrlRequest;
import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.entity.User;
import com.urlshortener.url_shortener.repository.UrlRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    private static final String CHARACTERS =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    private final Random random = new Random();

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    // CREATE SHORT URL
    public Url createShortUrl(CreateUrlRequest request, User user) {

        // Check custom alias
        if (request.getCustomAlias() != null &&
                !request.getCustomAlias().isBlank()) {

            if (urlRepository.existsByCustomAlias(
                    request.getCustomAlias())) {

                throw new RuntimeException(
                        "Custom alias already exists");
            }
        }

        Url url = new Url();

        url.setOriginalUrl(request.getOriginalUrl());

        // Use custom alias if provided
        if (request.getCustomAlias() != null &&
                !request.getCustomAlias().isBlank()) {

            url.setCustomAlias(request.getCustomAlias());
            url.setShortCode(request.getCustomAlias());

        } else {

            String shortCode = generateUniqueShortCode();
            url.setShortCode(shortCode);
        }

        url.setCreatedAt(LocalDateTime.now());

        url.setExpiresAt(request.getExpiresAt());

        url.setActive(true);

        url.setUser(user);

        return urlRepository.save(url);
    }

    // GET URL FOR SPECIFIC USER
    public Url getUrlForUser(Long id, User user) {

        Url url = urlRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("URL not found"));

        // Check ownership
        if (url.getUser() == null ||
                !url.getUser().getId().equals(user.getId())) {

            throw new RuntimeException(
                    "You are not allowed to access this URL");
        }

        return url;
    }

    // UPDATE URL
    public Url updateUrl(
            Long id,
            UpdateUrlRequest request,
            User user) {

        Url url = getUrlForUser(id, user);

        // Update custom alias
        if (request.getCustomAlias() != null &&
                !request.getCustomAlias().isBlank()) {

            String newAlias =
                    request.getCustomAlias().trim();

            // Check if alias belongs to another URL
            if (!newAlias.equals(url.getCustomAlias()) &&
                    urlRepository.existsByCustomAlias(newAlias)) {

                throw new RuntimeException(
                        "Custom alias already exists");
            }

            url.setCustomAlias(newAlias);
            url.setShortCode(newAlias);
        }

        // Update expiry
        if (request.getExpiresAt() != null) {
            url.setExpiresAt(request.getExpiresAt());
        }

        // Update active status
        if (request.getActive() != null) {
            url.setActive(request.getActive());
        }

        return urlRepository.save(url);
    }

    // DELETE URL
    public void deleteUrl(Long id, User user) {

        Url url = getUrlForUser(id, user);

        urlRepository.delete(url);
    }

    // Generate unique random short code
    private String generateUniqueShortCode() {

        String shortCode;

        do {
            shortCode = generateRandomCode(6);
        } while (urlRepository.existsByShortCode(shortCode));

        return shortCode;
    }

    // Generate random Base62-style code
    private String generateRandomCode(int length) {

        StringBuilder code = new StringBuilder();

        for (int i = 0; i < length; i++) {

            int index =
                    random.nextInt(CHARACTERS.length());

            code.append(CHARACTERS.charAt(index));
        }

        return code.toString();
    }
}