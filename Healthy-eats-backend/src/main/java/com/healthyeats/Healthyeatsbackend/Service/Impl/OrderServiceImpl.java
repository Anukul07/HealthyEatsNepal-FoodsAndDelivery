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
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private final JavaMailSender javaMailSender;

    public OrderServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    @Override
    @Transactional
    public void placeOrder(OrderDto orderDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        Order order = new Order();
        User user = new User();
        order.setOrderDate(orderDto.getOrderDate());
        order.setOrderConfirmation(orderDto.getOrderConfirmation());
        user.setId(orderDto.getUserId());
        order.setUser(user);
        order.setPaymentType(orderDto.getPaymentType());
        order.setSpecialRequest(orderDto.getSpecialRequest());
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setFoodReadyConfirmation(orderDto.getFoodReadyConfirmation());
        order.setTotalPrice(orderDto.getTotalPrice());
        orderRepository.save(order);
        for (OrderFoodDto orderFoodDto : orderDto.getOrderItems()) {
            Optional<Food> optionalFood = foodRepository.findById(orderFoodDto.getFoodId());
            if (optionalFood.isPresent()) {
                Food food =optionalFood.get();
                OrderFood orderFood = new OrderFood();
                orderFood.setOrder(order);
                orderFood.setFood(food);
                orderFood.setQuantity(orderFoodDto.getQuantity());
                orderFood.setDeliveryType(orderFoodDto.getDeliveryType());
                orderFood.setDeliveryTime(orderFoodDto.getDeliveryTime());
                orderFood.setSubscriptionWeek(orderFoodDto.getSubscriptionWeek());
                orderFoodRepository.save(orderFood);
            }
        }
        String email = userRepository.emailFromId(user.getId());
        message.setTo(email);
        message.setSubject("Healthy Eats Nepal : Order Confirmed");
        message.setText("Thanks for your order. We will inform you once the food is all set to deliver at your disposal!" + "\n" +"Best wishes from us." );
        javaMailSender.send(message);
    }

    @Override
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
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
        orderDto.setSpecialRequest(order.getSpecialRequest());
        orderDto.setCustomerName(order.getUser().getFirstName()+" "+order.getUser().getLastName());
        orderDto.setContactNumber(order.getUser().getPhoneNumber());
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
            orderFoodDto.setDeliveryType(orderFood.getDeliveryType());
            orderFoodDto.setDeliveryTime(orderFood.getDeliveryTime());
            orderFoodDto.setSubscriptionWeek(orderFood.getSubscriptionWeek());
            orderFoodDto.setQuantity(orderFood.getQuantity());
            orderItems.add(orderFoodDto);
        }
        orderDto.setOrderItems(orderItems);
        return orderDto;
    }

    @Override
    public String deleteOrderByOrderId(int orderId) {
         orderRepository.deleteAllByOrderId(orderId);
         return "Order deleted";
    }

    @Override
    public String updateFoodReadyConfirmation(String foodReadyConfirmation, int orderId) {
        orderRepository.updateReadyConfirmation(foodReadyConfirmation,orderId);
        int userId = orderRepository.getUserId(orderId);
        String email = userRepository.getEmail(userId);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Healthy Eats Nepal : Food Confirmation");
        message.setText("Order Id - " +orderId +" Thanks you for trusting us. We will deliver your foods as per your requirement!!"+"\n"+ "Best Wishes from us." );
        javaMailSender.send(message);
        return "Status updated";
    }

    @Override
    public long countRows() {
        return orderRepository.count();
    }

}
