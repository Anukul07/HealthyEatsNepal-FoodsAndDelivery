package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.OrderService;
import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.dto.OrderFoodDto;
import com.healthyeats.Healthyeatsbackend.entity.Food;
import com.healthyeats.Healthyeatsbackend.entity.Order;
import com.healthyeats.Healthyeatsbackend.entity.OrderFood;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.FoodRepository;
import com.healthyeats.Healthyeatsbackend.repository.OrderFoodRepository;
import com.healthyeats.Healthyeatsbackend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderFoodRepository orderFoodRepository;

    @Autowired
    private FoodRepository foodRepository;


    @Override
    @Transactional
    public void placeOrder(OrderDto orderDto) {
        Order order = new Order();
        User user = new User();
        order.setOrderDate(orderDto.getOrderDate());
        order.setOrderConfirmation(orderDto.getOrderConfirmation());
        order.setDeliveryTime(orderDto.getDeliveryTime());
        user.setId(orderDto.getUserId());
        order.setUser(user);
        order.setPaymentType(orderDto.getPaymentType());
        order.setSubscriptionWeek(orderDto.getSubscriptionWeek());
        order.setSpecialRequest(orderDto.getSpecialRequest());
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setFoodReadyConfirmation(orderDto.getFoodReadyConfirmation());
        order.setTotalPrice(orderDto.getTotalPrice());
        orderRepository.save(order);
        System.out.println(order);

        for (OrderFoodDto orderFoodDto : orderDto.getOrderItems()) {
            Optional<Food> optionalFood = foodRepository.findById(orderFoodDto.getFoodId());
            if (optionalFood.isPresent()) {
                Food food =optionalFood.get();
                OrderFood orderFood = new OrderFood();
                orderFood.setOrder(order);
                orderFood.setFood(food);
                orderFood.setQuantity(orderFoodDto.getQuantity());
                orderFoodRepository.save(orderFood);
            }
        }
    }

    @Override
    public List<OrderDto> getOrdersByUserId(OrderDto orderDto) {
        List<Order> orders = orderRepository.findAllByUserId(orderDto.getUserId());
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setOrderId(order.getOrderId());
        orderDto.setDeliveryAddress(order.getDeliveryAddress());
        orderDto.setPaymentType(order.getPaymentType());
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setSubscriptionWeek(order.getSubscriptionWeek());
        orderDto.setDeliveryTime(order.getDeliveryTime());
        orderDto.setSpecialRequest(order.getSpecialRequest());
        orderDto.setUserId(order.getUser().getId());
        orderDto.setOrderDate(order.getOrderDate());
        orderDto.setOrderConfirmation(order.getOrderConfirmation());
        orderDto.setFoodReadyConfirmation(order.getFoodReadyConfirmation());

        List<OrderFood> orderFoods = orderFoodRepository.findAllByOrder(order);
        List<OrderFoodDto> orderItems = new ArrayList<>();

        for (OrderFood orderFood: orderFoods) {
            OrderFoodDto orderFoodDto = new OrderFoodDto();
            orderFoodDto.setFoodId(orderFood.getFood().getFoodId());
            orderFoodDto.setFoodName(orderFood.getFood().getFoodName());
            orderFoodDto.setQuantity(orderFood.getQuantity());
            orderItems.add(orderFoodDto);
        }

        orderDto.setOrderItems(orderItems);

        return orderDto;
    }

}
