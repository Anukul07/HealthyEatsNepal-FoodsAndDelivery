package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.UserService;
import com.healthyeats.Healthyeatsbackend.dto.AdminUserDto;
import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String getUsername(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getFirstName() + " " + user.getLastName();
        } else {
            return "User not found";
        }
    }

    @Override
    public int getUserIdByEmail(String email) {
        return userRepository.getUserIdByEmail(email);
    }

    @Override
    public String getRoleFromEmail(String email) {
        Role role = userRepository.getUserRole(email);
        return role.name();
    }

    @Override
    public List<AdminUserDto> getAdminUsers() {
        return userRepository.findAll().stream()
                .map(user -> AdminUserDto.builder()
                        .userId(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .phoneNumber(user.getPhoneNumber())
                        .build())
                .collect(Collectors.toList());
    }
}
