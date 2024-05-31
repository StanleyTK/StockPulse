package com.example.stockpulseserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StockpulseServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockpulseServerApplication.class, args);
        System.out.println("The application has started!");
    }
}
