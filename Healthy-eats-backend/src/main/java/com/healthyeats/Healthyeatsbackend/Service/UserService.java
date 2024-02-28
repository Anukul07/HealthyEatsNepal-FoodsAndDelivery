package com.healthyeats.Healthyeatsbackend.Service;

import com.healthyeats.Healthyeatsbackend.dto.AdminUserDto;
import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.response.OtpResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    String getUsername(String email);

    int getUserIdByEmail(String email);

    String getRoleFromEmail(String email);

    List<AdminUserDto> getAdminUsers();

    String deleteUserById(int userId);

    long countRows();

    OtpResponse generateOtpToEmail(String email);

    OtpResponse validateOtp(String email, String Otp);

    void updatePassword(String password, String email);
}
