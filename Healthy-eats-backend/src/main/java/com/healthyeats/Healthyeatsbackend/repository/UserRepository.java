package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String username);
    Boolean existsByEmail(String username);

}
