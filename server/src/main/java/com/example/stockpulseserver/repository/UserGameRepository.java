package com.example.stockpulseserver.repository;

import com.example.stockpulseserver.model.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserGameRepository extends JpaRepository<UserGame, Long> {
    List<UserGame> findByUserId(Long userId);
    List<UserGame> findByGameId(Long gameId);
    Optional<UserGame> findByUserIdAndGameId(Long userId, Long gameId);
}
