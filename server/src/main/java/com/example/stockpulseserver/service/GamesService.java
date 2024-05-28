package com.example.stockpulseserver.service;

import com.example.stockpulseserver.model.Game;
import com.example.stockpulseserver.model.User;
import com.example.stockpulseserver.model.UserGame;
import com.example.stockpulseserver.repository.GameRepository;
import com.example.stockpulseserver.repository.UserGameRepository;
import com.example.stockpulseserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GamesService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserGameRepository userGameRepository;

    public void addUserToGame(Long userId, Long gameId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));

        UserGame userGame = new UserGame();
        userGame.setUserId(user.getId());
        userGame.setGameId(game.getId());
        userGameRepository.save(userGame);
    }
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }


    public List<Game> getGamesByUser(Long userId) {
        List<UserGame> userGames = userGameRepository.findByUserId(userId);
//        List<Long> gameIds = List.of();
//        for (UserGame userGame : userGames) {
//            if (Objects.equals(userGame.getUserId(), userId)) {
//                gameIds.add(userGame.getGameId());
//            }
        //}
        List<Long> gameIds = userGames.stream()
                .map(UserGame::getGameId)
                .collect(Collectors.toList());
        return gameRepository.findAllById(gameIds);
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
