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

    public Object getLatestStockData(String ticker) {
        String url = "http://localhost:5000/api/stock/latest/" + ticker;
        logger.info("Requesting latest stock data from URL: {}", url);
        return restTemplate.getForObject(url, Object.class);
    }

    public Object getHistoricalStockData(String ticker) {
        String url = "http://localhost:5000/api/stock/history/" + ticker;
        logger.info("Requesting historical stock data from URL: {}", url);
        return restTemplate.getForObject(url, Object.class);
    }
}
