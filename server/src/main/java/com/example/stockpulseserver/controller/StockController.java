package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    @Autowired
    private StockService stockService;

    @GetMapping("/latest/{ticker}")
    public ResponseEntity<Object> getLatestStockData(@PathVariable String ticker) {
        Map<String, Object> stockData = stockService.getLatestStockData(ticker);
        return ResponseEntity.ok(stockData);
    }

    @GetMapping("/history/{ticker}")
    public ResponseEntity<Object> getHistoricalStockData(@PathVariable String ticker, 
                                                         @RequestParam(defaultValue = "5y") String period, 
                                                         @RequestParam(defaultValue = "1mo") String interval) {
        Object stockData = stockService.getHistoricalStockData(ticker, period, interval);
        return ResponseEntity.ok(stockData);
    }
}
