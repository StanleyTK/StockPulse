package com.example.stockpulseserver.repository;

import com.example.stockpulseserver.model.Stock;
import com.example.stockpulseserver.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
}
