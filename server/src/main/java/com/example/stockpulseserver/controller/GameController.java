package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.dto.ResponseMessage;
import com.example.stockpulseserver.model.Game;
import com.example.stockpulseserver.service.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


import java.util.List;

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

    @PostMapping()
    public ResponseEntity<ResponseMessage> createGame(@RequestBody Game game) {
        Optional<Game> existingGame = gameService.findByName(game.getName());
        if (existingGame.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage("Game name already exists", HttpStatus.CONFLICT.value()));
        }
        gameService.saveGame(game);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("Game created", HttpStatus.CREATED.value()));
    }

//    @DeleteMapping()
//    public ResponseEntity<?> deleteGame(@RequestBody Game game) {
//        Game games = gameService.getGameById(game.getId());
//        if (games == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("Game cannot be found", HttpStatus.NOT_FOUND.value()));
//        }
//        gameService.deleteGame(deleteGame);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body(new ResponseMessage("Game deleted successfully", HttpStatus.CREATED.value()));
//    }

}
