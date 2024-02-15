package com.healthyeats.Healthyeatsbackend.Service;

import com.healthyeats.Healthyeatsbackend.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    String getUsername(String email);

    int getUserIdByEmail(String email);
}
