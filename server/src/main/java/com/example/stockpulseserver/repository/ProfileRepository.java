// ProfileRepository.java
package com.example.stockpulseserver.repository;

import com.example.stockpulseserver.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
}
