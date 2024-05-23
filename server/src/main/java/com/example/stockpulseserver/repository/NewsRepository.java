package com.example.stockpulseserver.repository;

import com.example.stockpulseserver.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findBySymbol(String symbol);
}
