package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.UserService;
import com.healthyeats.Healthyeatsbackend.dto.AdminUserDto;
import com.healthyeats.Healthyeatsbackend.dto.RegisterDto;
import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import com.healthyeats.Healthyeatsbackend.response.OtpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JavaMailSender javaMailSender, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void saveUser(RegisterDto registerDto) {
        User user = new User();
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setEmail(registerDto.getEmail());
        user.setPhoneNumber(registerDto.getPhoneNumber());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));
        userRepository.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
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

    @Override
    public String deleteUserById(int userId) {
        try {
            userRepository.deleteAllById(userId);
            return "User deleted successfully";
        }catch (Exception e){
            return "Couldnt not delete the user " + e.getMessage();
        }
    }
    @Override
    public long countRows() {
        return userRepository.countUsersByRoleUser();
    }


    @Override
    public OtpResponse generateOtpToEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        long emailExists = userRepository.emailExists(email);
        if(emailExists==1){
            String otp = generateOtp();
            userRepository.updateOtp(otp,email);
            message.setTo(email);
            message.setSubject("Healthy eats password reset OTP");
            message.setText("Your OTP for password reset is: " + otp +"\n" +"Best wishes from us.");
            javaMailSender.send(message);
            return new OtpResponse("success");
        }else {
            return new OtpResponse("failed");
        }
    }

    @Override
    public OtpResponse validateOtp(String email, String Otp) {
        String otp = userRepository.otp(email);
        if(Objects.equals(Otp,otp)){
            return new OtpResponse("success");
        }else {
            return new OtpResponse("failed");
        }
    }
    @Override
    public void updatePassword(String password, String email) {
        String encodedPassword =this.passwordEncoder.encode(password);
        userRepository.updatePassword(encodedPassword,email);
    }

    @Override
    public List<User> fetchAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }
    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }






}
