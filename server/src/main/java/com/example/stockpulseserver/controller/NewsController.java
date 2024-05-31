package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.dto.ResponseMessage;
import com.example.stockpulseserver.model.News;
import com.example.stockpulseserver.service.NewsService;
import com.example.stockpulseserver.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private OpenAIService openAIService;

    @PostMapping()
    public ResponseEntity<ResponseMessage> getNews(@RequestBody News news) {
        if (news.getSymbol() == null || news.getSymbol().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessage("Stock symbol is required", HttpStatus.BAD_REQUEST.value()));
        }

        // Check if the symbol already exists
        Optional<News> existingNews = newsService.findBySymbol(news.getSymbol());
        if (existingNews.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseMessage(existingNews.get().getInfo(), HttpStatus.OK.value()));
        }

        String stockTicker = news.getSymbol();
        String prompt = "Generate a summary for the company with a stock ticker in 3 sentences: " + stockTicker;
        String response = openAIService.generateResponse(prompt);

        news.setInfo(response);
        newsService.saveNews(news);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage(response, HttpStatus.CREATED.value()));
    }
}
