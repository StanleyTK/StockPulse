package com.example.stockpulseserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;
import java.util.Map;

@Service
public class StockService {

    private static final Logger logger = LoggerFactory.getLogger(StockService.class);

    @Autowired
    private RestTemplate restTemplate;

    public Map<String, Object> getLatestStockData(String ticker) {
        String url = "http://localhost:5000/api/stock/latest/" + ticker;
        logger.info("Requesting latest stock data from URL: {}", url);
        Map<String, Object> stockData = restTemplate.getForObject(url, Map.class);

        if (stockData != null) {
            stockData.put("open", roundValue(stockData.get("open")));
            stockData.put("close", roundValue(stockData.get("close")));
            stockData.put("high", roundValue(stockData.get("high")));
            stockData.put("low", roundValue(stockData.get("low")));
            stockData.put("volume", roundValue(stockData.get("volume")));
        }

        return stockData;
    }

    private BigDecimal roundValue(Object value) {
        if (value instanceof Number) {
            return BigDecimal.valueOf(((Number) value).doubleValue()).setScale(2, BigDecimal.ROUND_HALF_UP);
        }
        return null;
    }

    public Object getHistoricalStockData(String ticker, String period, String interval) {
        String url = String.format("http://localhost:5000/api/stock/history/%s?period=%s&interval=%s", ticker, period, interval);
        logger.info("Requesting historical stock data from URL: {}", url);
        return restTemplate.getForObject(url, Object.class);
    }
}
