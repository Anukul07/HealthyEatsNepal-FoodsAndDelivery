package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String username);
    Boolean existsByEmail(String username);

    @Query(value = "SELECT user_id FROM users WHERE email = ?1",nativeQuery = true)
    int getUserIdByEmail(String email);

    @Query(value = "SELECT role from users where email = ?1" ,nativeQuery = true)
    Role getUserRole(String email);

    List<User> findAll();
}
