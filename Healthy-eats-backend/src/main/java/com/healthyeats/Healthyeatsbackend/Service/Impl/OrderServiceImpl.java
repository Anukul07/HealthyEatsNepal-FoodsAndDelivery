package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.OrderService;
import com.healthyeats.Healthyeatsbackend.entity.Order;
import com.healthyeats.Healthyeatsbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }
}
