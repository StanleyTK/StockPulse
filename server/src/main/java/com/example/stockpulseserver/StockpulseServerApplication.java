package com.example.stockpulseserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StockpulseServerApplication {

    public static void main(String[] args) {
        System.out.println("Starting Stockpulse Server Application...");
        SpringApplication.run(StockpulseServerApplication.class, args);
        System.out.println("Yello - The application has started!");
    }

}
