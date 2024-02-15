package com.healthyeats.Healthyeatsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_food")
public class OrderFood {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JoinColumn(name = "order_id")
    @ManyToOne
    private Order order;

    @JoinColumn(name = "food_id")
    @ManyToOne
    private Food food;

    @Column(name = "quantity")
    private int quantity;

}
