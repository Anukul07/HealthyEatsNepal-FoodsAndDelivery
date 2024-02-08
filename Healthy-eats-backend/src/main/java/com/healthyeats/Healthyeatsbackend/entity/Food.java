package com.healthyeats.Healthyeatsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "foods")
public class Food {

    @Column(name = "food_id",nullable = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int foodId;

    @Column(name = "food_name",nullable = false)
    private String foodName;

    @Column(name = "food_description",nullable = false)
    private String foodDescription;

    @Column(name = "food_image", nullable = false)
    private String foodImage;


}
