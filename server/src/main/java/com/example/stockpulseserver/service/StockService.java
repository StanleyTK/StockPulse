package com.example.stockpulseserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockService.class);

    @Autowired
    private RestTemplate restTemplate;

    public Object getStockData(String ticker) {
        String url = "http://localhost:5000/api/stock/" + ticker;
        logger.info("Requesting stock data from URL: {}", url);
        return restTemplate.getForObject(url, Object.class);
    }
}