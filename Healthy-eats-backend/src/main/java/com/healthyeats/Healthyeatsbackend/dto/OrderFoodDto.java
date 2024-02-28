package com.healthyeats.Healthyeatsbackend.dto;

import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderFoodDto {

   private int foodId;

   private int quantity;

   private String foodName;

   private String subscriptionWeek;

   private String deliveryTime;

   private String deliveryType;
}
