package com.healthyeats.Healthyeatsbackend.dto;

import lombok.Data;

@Data
public class RegisterDto {

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String phoneNumber;

}
