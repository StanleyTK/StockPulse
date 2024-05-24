package com.example.stockpulseserver.service;

import com.example.stockpulseserver.model.User;
import com.example.stockpulseserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean isEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User saveUser(User user) {
        try {
            user.setPassword(user.getPassword()); // This will encrypt the password
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean checkPassword(User user, String rawPassword) {
        try {
            String decryptedPassword = User.decrypt(user.getPassword());
            return decryptedPassword.equals(rawPassword);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public void deleteUser(User deletedUser) {
        userRepository.delete(deletedUser);
    }
}
