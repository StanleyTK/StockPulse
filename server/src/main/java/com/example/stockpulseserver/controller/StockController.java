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

    @GetMapping("/{ticker}")
    public ResponseEntity<Object> getStockData(@PathVariable String ticker) {
        Object stockData = stockService.getStockData(ticker);
        return ResponseEntity.ok(stockData);
    }
}

