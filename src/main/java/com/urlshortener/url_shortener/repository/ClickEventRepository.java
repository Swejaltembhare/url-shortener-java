package com.urlshortener.url_shortener.repository;

import com.urlshortener.url_shortener.entity.ClickEvent;
import com.urlshortener.url_shortener.entity.Url;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ClickEventRepository
        extends JpaRepository<ClickEvent, Long> {

    List<ClickEvent> findByUrl(Url url);

    List<ClickEvent> findByUrlAndClickedAtBetween(
            Url url,
            LocalDateTime start,
            LocalDateTime end
    );

    long countByUrl(Url url);

    // Unique visitors
    @Query("""
            SELECT COUNT(DISTINCT c.ipAddress)
            FROM ClickEvent c
            WHERE c.url = :url
            """)
    long countUniqueVisitors(@Param("url") Url url);

    // Clicks in a specific time period
    @Query("""
            SELECT COUNT(c)
            FROM ClickEvent c
            WHERE c.url = :url
            AND c.clickedAt BETWEEN :start AND :end
            """)
    long countClicksBetween(
            @Param("url") Url url,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}