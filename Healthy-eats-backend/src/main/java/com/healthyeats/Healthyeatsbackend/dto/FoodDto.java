package com.healthyeats.Healthyeatsbackend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Getter
@Setter
@ToString
@Builder
public class FoodDto {

    @Null
    private int foodId;

    @NotNull
    private String foodName;

    @NotNull
    private String foodDescription;

    @NotNull
    private int foodPrice;

    private MultipartFile foodImage;

    private String foodType;

}
