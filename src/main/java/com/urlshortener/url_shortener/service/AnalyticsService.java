package com.urlshortener.url_shortener.service;

import com.urlshortener.url_shortener.entity.ClickEvent;
import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.repository.ClickEventRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalyticsService {

    private final ClickEventRepository clickEventRepository;

    public AnalyticsService(ClickEventRepository clickEventRepository) {
        this.clickEventRepository = clickEventRepository;
    }

    // Record click
    public void recordClick(
            Url url,
            String ipAddress,
            String userAgent) {

        ClickEvent clickEvent = new ClickEvent();

        clickEvent.setUrl(url);
        clickEvent.setClickedAt(LocalDateTime.now());
        clickEvent.setIpAddress(ipAddress);
        clickEvent.setUserAgent(userAgent);

        clickEventRepository.save(clickEvent);
    }

    // Total clicks
    public long getTotalClicks(Url url) {
        return clickEventRepository.countByUrl(url);
    }

    // Click history
    public List<ClickEvent> getClickHistory(Url url) {
        return clickEventRepository.findByUrl(url);
    }

    // Clicks between dates
    public List<ClickEvent> getClicksBetween(
            Url url,
            LocalDateTime start,
            LocalDateTime end) {

        return clickEventRepository
                .findByUrlAndClickedAtBetween(
                        url,
                        start,
                        end
                );
    }

    // Unique visitors
    public long getUniqueVisitors(Url url) {
        return clickEventRepository.countUniqueVisitors(url);
    }

    // Click count between dates
    public long getClickCountBetween(
            Url url,
            LocalDateTime start,
            LocalDateTime end) {

        return clickEventRepository.countClicksBetween(
                url,
                start,
                end
        );
    }
}