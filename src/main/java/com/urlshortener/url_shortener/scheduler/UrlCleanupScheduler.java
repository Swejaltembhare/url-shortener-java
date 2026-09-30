package com.urlshortener.url_shortener.scheduler;

import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.repository.UrlRepository;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class UrlCleanupScheduler {

    private final UrlRepository urlRepository;

    public UrlCleanupScheduler(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void deactivateExpiredUrls() {

        List<Url> urls = urlRepository.findAll();

        LocalDateTime now = LocalDateTime.now();

        for (Url url : urls) {

            if (url.getExpiresAt() != null
                    && url.getExpiresAt().isBefore(now)
                    && url.isActive()) {

                url.setActive(false);
                urlRepository.save(url);
            }
        }
    }
}