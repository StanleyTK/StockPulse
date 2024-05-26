package com.example.stockpulseserver.service;

import com.example.stockpulseserver.model.Game;
import com.example.stockpulseserver.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamesService {

    @Autowired
    private GameRepository gameRepository;

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
    public void deleteGame(Game game) {
        gameRepository.delete(game);
    }
    public Optional<Game> findByName(String name) {
        return gameRepository.findByName(name);
    }

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }
}
