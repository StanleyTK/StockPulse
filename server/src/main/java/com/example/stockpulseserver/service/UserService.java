package com.example.stockpulseserver.service;

import com.example.stockpulseserver.model.User;
import com.example.stockpulseserver.model.Profile;
import com.example.stockpulseserver.repository.ProfileRepository;
import com.example.stockpulseserver.service.ProfileService;
import com.example.stockpulseserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
            user.setPassword(user.getPassword()); // This will encrypt the password
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
