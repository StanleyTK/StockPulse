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

        userService.saveUser(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseMessage("User created successfully", HttpStatus.CREATED.value()));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> delete(@RequestBody User user) {
        User deletedUser = userService.getUserById(user.getId()).orElse(null);
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
        if (loginRequest.getUsername().equals(user.getUsername()) && loginRequest.getPassword().equals(user.getPassword())) {
            LoginResponse response = new LoginResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail()
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("Invalid password", HttpStatus.UNAUTHORIZED.value()));
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            User existingUser = userService.getUserById(user.getId()).orElse(null);
            if (existingUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseMessage("User not found", HttpStatus.NOT_FOUND.value()));
            }

            boolean usernameChanged = user.getUsername() != null && !user.getUsername().equals(existingUser.getUsername());
            boolean emailChanged = user.getEmail() != null && !user.getEmail().equals(existingUser.getEmail());
            boolean passwordChanged = user.getPassword() != null && !user.getPassword().equals(existingUser.getPassword());

            if (usernameChanged && userService.isUsernameExists(user.getUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ResponseMessage("Username already exists", HttpStatus.CONFLICT.value()));
            }

            if (emailChanged && userService.isEmailExists(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ResponseMessage("Email already exists", HttpStatus.CONFLICT.value()));
            }

            if (usernameChanged) {
                existingUser.setUsername(user.getUsername());
            }
            if (emailChanged) {
                existingUser.setEmail(user.getEmail());
            }
            if (passwordChanged) {
                existingUser.setPassword(user.getPassword());
            }

            userService.saveUser(existingUser);
            return ResponseEntity.ok(new ResponseMessage("User updated successfully", HttpStatus.OK.value()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("Error updating user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }


}
