package com.example.stockpulseserver.model;

import jakarta.persistence.*;

@Entity
public class Profile {
    @Id
    @Column(name = "user_id", nullable = false)
    private Long userId; // Use the same type as the ID of the User entity

    @Column(nullable = true, length = 20)
    private String firstName;

    @Column(nullable = true, length = 20)
    private String lastName;

    @Column(nullable = false)
    private String profilePicture = "/default_pfp.png";

    public Profile(Long userId) {
        this.userId = userId;
    }

    // Default constructor (required by JPA)
    public Profile() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
