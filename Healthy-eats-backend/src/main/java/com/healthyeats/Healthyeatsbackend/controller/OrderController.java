package com.healthyeats.Healthyeatsbackend.controller;

import com.healthyeats.Healthyeatsbackend.Service.OrderService;
import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.entity.Order;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import com.healthyeats.Healthyeatsbackend.security.JWTGenerator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderService orderService;
    private final JWTGenerator jwtGenerator;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    public OrderController(OrderService orderService, JWTGenerator jwtGenerator, UserRepository userRepository) {
        this.orderService = orderService;
        this.jwtGenerator = jwtGenerator;
        this.userRepository = userRepository;
    }

    @PostMapping("/save-order")
    public void saveOrder(@RequestBody OrderDto orderDto, HttpServletRequest request){
        String token = request.getHeader("Authorization");
        String userEmail = null;
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            userEmail = jwtGenerator.getUsernameFromJWT(jwtToken);
        }
        Order order = new Order();
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        User user = optionalUser.get();
        int userId = user.getId();
        User user1 = new User();
        order.setOrderDate(orderDto.getOrderDate());
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setDeliveryTime(orderDto.getDeliveryTime());
        user1.setId(userId);
        order.setUser(user1);
        orderService.saveOrder(order);
    }
}
