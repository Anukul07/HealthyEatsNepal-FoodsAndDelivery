package com.healthyeats.Healthyeatsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Column(name = "order_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "subscription_week")
    private String subscriptionWeek;

    @Column(name = "delivery_time")
    private String deliveryTime;

    @Column(name = "delivery_type")
    private String deliveryType;

    @Column(name = "delivery_address")
    private String deliveryAddress;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "order_confirmation")
    private String orderConfirmation;

    @Column(name = "special_request")
    private String specialRequest;

    @Column(name = "food_ready_confirmation")
    private String foodReadyConfirmation;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
