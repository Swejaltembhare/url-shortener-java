package com.urlshortener.url_shortener.repository;

import com.urlshortener.url_shortener.entity.Url;
import com.urlshortener.url_shortener.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, Long> {

    Optional<Url> findByShortCodeIgnoreCase(String shortCode);

    Optional<Url> findByCustomAlias(String customAlias);

    boolean existsByShortCode(String shortCode);

    boolean existsByCustomAlias(String customAlias);

    // Get only URLs created by a particular user
    List<Url> findByUserOrderByCreatedAtDesc(User user);
}