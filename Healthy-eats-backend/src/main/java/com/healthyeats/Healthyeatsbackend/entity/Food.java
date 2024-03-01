package com.healthyeats.Healthyeatsbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "foods")
public class Food {

    @Column(name = "food_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int foodId;

    @Column(name = "food_name",nullable = false)
    private String foodName;

    @Column(name = "food_price", nullable = false)
    private int foodPrice;

    @Column(name = "food_description",nullable = false)
    private String foodDescription;

    @Column(name = "food_image", nullable = true)
    private String foodImage;

    @Column(name = "food_type", nullable = false)
    private String foodType;
}
