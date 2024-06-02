package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @GetMapping("/latest/{ticker}")
    public ResponseEntity<Object> getLatestStockData(@PathVariable String ticker) {
        Object stockData = stockService.getLatestStockData(ticker);
        return ResponseEntity.ok(stockData);
    }

    @GetMapping("/history/{ticker}")
    public ResponseEntity<Object> getHistoricalStockData(@PathVariable String ticker) {
        Object stockData = stockService.getHistoricalStockData(ticker);
        return ResponseEntity.ok(stockData);
    }
}
