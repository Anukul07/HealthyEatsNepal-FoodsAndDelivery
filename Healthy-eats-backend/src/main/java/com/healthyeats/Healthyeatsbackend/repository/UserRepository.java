package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query(value = "SELECT email from users where user_id = ?1", nativeQuery = true)
    String getEmail(int userId);

    List<User> findAll();

    @Modifying
    @Transactional
    void deleteAllById(int userId);

    @Query(value = "SELECT email from users where user_id=?1", nativeQuery = true)
    String emailFromId(int userId);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM users WHERE email = ?1)", nativeQuery = true)
    long emailExists(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET otp = ?1 WHERE email = ?2",nativeQuery = true)
    void updateOtp(String otp, String email);

    @Query(value = "SELECT otp from users where email=?1",nativeQuery = true)
    String otp(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET password = ?1 WHERE email = ?2",nativeQuery = true)
    void updatePassword(String password, String email);

}
