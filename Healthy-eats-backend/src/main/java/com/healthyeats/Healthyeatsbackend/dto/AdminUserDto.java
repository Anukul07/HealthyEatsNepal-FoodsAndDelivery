package com.healthyeats.Healthyeatsbackend.dto;

import lombok.*;

@ToString
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserDto {

    private int userId;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;
}
