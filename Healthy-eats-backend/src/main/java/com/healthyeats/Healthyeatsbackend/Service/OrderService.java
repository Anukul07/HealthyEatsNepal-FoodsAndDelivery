package com.healthyeats.Healthyeatsbackend.Service;

import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.entity.Order;

import java.util.List;

public interface OrderService {
    void placeOrder(OrderDto orderDto);

    List<OrderDto> getAllOrders();

    OrderDto convertToDto(Order order);

    String deleteOrderByOrderId(int orderId);

    String updateFoodReadyConfirmation(String foodReadyConfirmation, int orderId);

    long countRows();
}
