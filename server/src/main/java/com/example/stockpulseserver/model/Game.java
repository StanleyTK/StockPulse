package com.example.stockpulseserver.model;

import jakarta.persistence.*;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String name;

    @Column(nullable = false)
    private long startingMoney;

    @Column(nullable = false)
    private char gameMode;

    public Game() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getStartingMoney() {
        return startingMoney;
    }

    public void setStartingMoney(long startingMoney) {
        this.startingMoney = startingMoney;
    }

    public char getGameMode() {
        return gameMode;
    }

    public void setGameMode(char gameMode) {
        this.gameMode = gameMode;
    }
}
