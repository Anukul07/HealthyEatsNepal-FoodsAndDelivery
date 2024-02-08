package com.healthyeats.Healthyeatsbackend.dto;

import lombok.Data;

@Data
public class OrderDto {

    private String deliveryAddress;

    private String deliveryTime;

    private String orderDate;
}
