package com.healthyeats.Healthyeatsbackend.Service;

import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.entity.Order;

import java.util.List;

public interface OrderService {
    void placeOrder(OrderDto orderDto);

    List<OrderDto> getOrdersByUserId(OrderDto orderDto);

    OrderDto convertToDto(Order order);
}
