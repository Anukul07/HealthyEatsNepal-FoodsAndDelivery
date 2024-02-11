package com.healthyeats.Healthyeatsbackend.controller;

import com.healthyeats.Healthyeatsbackend.Service.OrderService;
import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.entity.Order;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import com.healthyeats.Healthyeatsbackend.security.JWTGenerator;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@PermitAll
@CrossOrigin
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService, JWTGenerator jwtGenerator) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    @PermitAll
    public ResponseEntity<String> placeOrder(@RequestBody OrderDto orderDto) {
        orderService.placeOrder(orderDto);
        return ResponseEntity.ok("Order placed successfully.");
    }

    @PostMapping("/retrieve")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@RequestBody OrderDto orderDto) {
        List<OrderDto> orders = orderService.getOrdersByUserId(orderDto);
        return ResponseEntity.ok(orders);
    }

}
