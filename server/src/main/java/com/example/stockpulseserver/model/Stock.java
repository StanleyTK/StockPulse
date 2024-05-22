package com.example.stockpulseserver.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String symbol;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date purchaseTime;

    @Column(nullable = false, length = 20)
    private String username;

    public Stock() {}

    public Stock(String symbol, Date purchaseTime, String username) {
        this.symbol = symbol;
        this.purchaseTime = purchaseTime;
        this.username = username;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Date getPurchaseTime() {
        return purchaseTime;
    }

    public void setPurchaseTime(Date purchaseTime) {
        this.purchaseTime = purchaseTime;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
