package com.example.stockpulseserver.repository;

import com.example.stockpulseserver.model.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGameRepository extends JpaRepository<UserGame, Long> {
    List<UserGame> findByUserId(Long userId);
    List<UserGame> findByGameId(Long gameId);
}
