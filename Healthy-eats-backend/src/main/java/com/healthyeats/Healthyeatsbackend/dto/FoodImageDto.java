package com.healthyeats.Healthyeatsbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodImageDto {

    private int foodId;

    private String foodImage;

    private String foodName;

    private int foodPrice;
}
