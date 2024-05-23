package com.example.stockpulseserver.service;

import com.example.stockpulseserver.model.News;
import com.example.stockpulseserver.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    public boolean isSymbolExists(String symbol) {
        return newsRepository.findBySymbol(symbol).isPresent();
    }

    public Optional<News> findBySymbol(String symbol) {
        return newsRepository.findBySymbol(symbol);
    }
}
