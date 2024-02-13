package com.healthyeats.Healthyeatsbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDto {

    private int orderId;

    private int userId;

    private int totalPrice;

    private List<OrderFoodDto> orderItems;

    private String subscriptionWeek;

    private String deliveryTime;

    private String deliveryType;

    private String specialRequest;

    private String deliveryAddress;

    private String paymentType;

    private String orderDate;

    private String orderConfirmation;

    private String foodReadyConfirmation;


}
