package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.model.Stock;
import com.example.stockpulseserver.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.stockpulseserver.dto.ResponseMessage;

import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping("/buy")
    public ResponseEntity<ResponseMessage> buyStock(@RequestBody Stock stock) {
        stock.setPurchaseTime(new Date());
        stockService.saveStock(stock);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("Stock purchased successfully", HttpStatus.CREATED.value()));
    }

//    @PostMapping("/sell")
//    public ResponseEntity<ResponseMessage> sellStock(@RequestBody Stock stock) {
//
//    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }
}
