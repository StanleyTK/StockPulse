// ProfileController.java
package com.example.stockpulseserver.controller;

import com.example.stockpulseserver.model.Profile;
import com.example.stockpulseserver.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping
    public Profile createProfile(@RequestBody Profile profile) {

        if (profile.getProfilePicture() == null) {
            profile.setProfilePicture("/default_pfp.png");
        }

        return profileService.createProfile(profile);
    }

    @GetMapping("/{id}")
    public Profile getProfile(@PathVariable Long id) {
        return profileService.getProfileByUserId(id);
    }

}