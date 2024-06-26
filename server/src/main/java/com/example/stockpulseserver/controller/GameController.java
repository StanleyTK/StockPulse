package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.dto.ResponseMessage;
import com.example.stockpulseserver.model.Game;
import com.example.stockpulseserver.service.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private GamesService gameService;

    @GetMapping()
    public ResponseEntity<List<Game>> getGames() {
        List<Game> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> createGame(@RequestBody Game game, @RequestParam Long userId) {
        Optional<Game> existingGame = gameService.findByName(game.getName());
        if (existingGame.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage("Game name already exists", HttpStatus.CONFLICT.value()));
        }
        Game createdGame = gameService.saveGame(game);
        gameService.addUserToGame(userId, createdGame.getId());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("Game created and user added to the game", HttpStatus.CREATED.value()));
    }

    @PostMapping("/user/{userId}/game/{gameId}")
    public void addUserToGame(@PathVariable Long userId, @PathVariable Long gameId) {
        gameService.addUserToGame(userId, gameId);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Game>> getGamesByUser(@PathVariable Long userId) {
        List<Game> games = gameService.getGamesByUser(userId);
        return ResponseEntity.ok(games);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteGame(@RequestBody Game game) {
        Optional<Game> gameList = gameService.getGameById(game.getId());
        if (gameList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("Game cannot be found", HttpStatus.NOT_FOUND.value()));
        }
        Game games = gameList.get();
        gameService.deleteGame(games);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("Game deleted successfully", HttpStatus.CREATED.value()));
    }

    @PostMapping("/{gameId}/user/{userId}")
    public ResponseEntity<?> isGameAuthorized(@PathVariable Long gameId, @PathVariable Long userId) {
        if (gameService.isGameAuthorizedById(gameId, userId)) {
            return ResponseEntity.ok(gameService.getGameById(gameId));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseMessage("User not authorized for the game", HttpStatus.FORBIDDEN.value()));
        }
    }
}
