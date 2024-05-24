package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.dto.ResponseMessage;
import com.example.stockpulseserver.model.Game;
import com.example.stockpulseserver.model.User;
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
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @PostMapping()
    public ResponseEntity<ResponseMessage> buyStock(@RequestBody Game game) {
        Optional<Game> existingGame = gameService.findByName(game.getName());
        if (existingGame.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage("Game name already exists", HttpStatus.CONFLICT.value()));
        }
        gameService.saveGame(game);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("Game created", HttpStatus.CREATED.value()));
    }
}
