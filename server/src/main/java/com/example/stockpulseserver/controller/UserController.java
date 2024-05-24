package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.model.User;
import com.example.stockpulseserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.stockpulseserver.dto.LoginResponse;
import com.example.stockpulseserver.dto.ResponseMessage;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ResponseMessage> createUser(@RequestBody User user) {
        if (userService.isUsernameExists(user.getUsername()) || userService.isEmailExists(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseMessage("Username or Email already exists", HttpStatus.CONFLICT.value()));
        }
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setMoney(10000);

        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("User created successfully", HttpStatus.CREATED.value()));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody User user) {
        User deletedUser = userService.getUserByUsername(user.getUsername());
        if (deletedUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("User cannot be found", HttpStatus.NOT_FOUND.value()));
        }
        userService.deleteUser(deletedUser);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("User deleted successfully", HttpStatus.CREATED.value()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.getUserByUsername(loginRequest.getUsername());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseMessage("User not found", HttpStatus.NOT_FOUND.value()));
        }
        if (userService.checkPassword(user, loginRequest.getPassword())) {
            LoginResponse response = new LoginResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail()
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("Invalid password", HttpStatus.UNAUTHORIZED.value()));
        }
    }
}
