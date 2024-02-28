package com.healthyeats.Healthyeatsbackend.controller;

import com.healthyeats.Healthyeatsbackend.Service.OrderService;
import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.security.JWTGenerator;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@PermitAll
@CrossOrigin
public class OrderController {
    private final OrderService orderService;
    private final JWTGenerator jwtGenerator;

    @Autowired
    public OrderController(OrderService orderService, JWTGenerator jwtGenerator, JWTGenerator jwtGenerator1) {
        this.orderService = orderService;
        this.jwtGenerator = jwtGenerator1;
    }

    @PostMapping("/place")
    @PermitAll
    public ResponseEntity<String> placeOrder(@RequestBody OrderDto orderDto) {
        orderService.placeOrder(orderDto);
        return ResponseEntity.ok("Order placed successfully.");
    }

    @GetMapping("/retrieve")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/delete-by-id/{orderId}")
    public String deleteOrderById(@PathVariable int orderId){
        orderService.deleteOrderByOrderId(orderId);
        return "Order deleted successfully";
    }

    @PostMapping("/update-status/{foodReadyConfirmation}/{orderId}")
    public String updateFoodReadyConfirmation(@PathVariable String foodReadyConfirmation, @PathVariable int orderId){
        orderService.updateFoodReadyConfirmation(foodReadyConfirmation,orderId);
        return "Updated status";
    }

    @GetMapping("count-rows")
    public long countRows(){
        return orderService.countRows();
    }
}
