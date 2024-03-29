package com.healthyeats.Healthyeatsbackend.controller;

import com.healthyeats.Healthyeatsbackend.Service.UserService;
import com.healthyeats.Healthyeatsbackend.dto.AdminUserDto;
import com.healthyeats.Healthyeatsbackend.dto.AuthResponseDTO;
import com.healthyeats.Healthyeatsbackend.dto.LoginDto;
import com.healthyeats.Healthyeatsbackend.dto.RegisterDto;
import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import com.healthyeats.Healthyeatsbackend.response.OtpResponse;
import com.healthyeats.Healthyeatsbackend.security.JWTGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthAndUserController {

    private AuthenticationManager authenticationManager;
    private JWTGenerator jwtGenerator;
    private UserService userService;

    @Autowired
    public AuthAndUserController(AuthenticationManager authenticationManager, UserService userService,
                                 PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(),
                loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }
    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (userService.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }
        userService.saveUser(registerDto);
        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }

    @GetMapping("username")
    public String getUsername(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        String userEmail = null;
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            userEmail = jwtGenerator.getUsernameFromJWT(jwtToken);
        }
        return userService.getUsername(userEmail);
    }
    @GetMapping("userId")
    public int getUserId(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        String userEmail = null;
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            userEmail = jwtGenerator.getUsernameFromJWT(jwtToken);
        }
        return userService.getUserIdByEmail(userEmail);
    }

    @GetMapping("getRole/{email}")
    public String getRole(@PathVariable String email){
        return userService.getRoleFromEmail(email);
    }

    @GetMapping("get-all-users")
    public List<AdminUserDto> getAllUsers(){
        return userService.getAdminUsers();
    }

    @PostMapping("delete-user/{userId}")
    public String deleteUser(@PathVariable int userId){
        return userService.deleteUserById(userId);
    }

    @GetMapping("count-rows")
    public long countRows(){
        return userService.countRows();
    }
    @PostMapping("/send-otp/{email}")
    public ResponseEntity<?> sendOtp(@PathVariable String email){
        OtpResponse otpResponse = userService.generateOtpToEmail(email);
        return ResponseEntity.ok(otpResponse);
    }
    @PostMapping("/validate-otp/{email}/{otp}")
    public ResponseEntity<?> validateOtp(@PathVariable String email, @PathVariable String otp){
        OtpResponse otpResponse = userService.validateOtp(email,otp);
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/password-reset/{password}/{email}")
    public String resetPassword(@PathVariable String password, @PathVariable String email){
        userService.updatePassword(password,email);
        return "success";
    }

}
