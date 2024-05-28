package com.example.stockpulseserver.service;

import com.example.stockpulseserver.model.User;
import com.example.stockpulseserver.model.Profile;
import com.example.stockpulseserver.repository.ProfileRepository;
import com.example.stockpulseserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public boolean isEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public User saveUser(User user) {
        try {
            user.setPassword(user.getPassword());
        } catch (Exception e) {
            e.printStackTrace();
        }
        User savedUser = userRepository.save(user);

        Profile profile = new Profile(savedUser.getId());
        profileRepository.save(profile);

        return savedUser;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

//    public boolean checkPassword(User user, String rawPassword) {
//        return user.getPassword() == rawPassword;
//    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
