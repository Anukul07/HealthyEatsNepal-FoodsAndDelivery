package com.healthyeats.Healthyeatsbackend.Service;

import com.healthyeats.Healthyeatsbackend.dto.FoodDto;
import com.healthyeats.Healthyeatsbackend.entity.Food;

import java.util.List;
import java.util.Optional;

public interface FoodService {

    Optional<Food> findFoodById(FoodDto foodDto);

    List<Food> findALl();

    String deleteById(FoodDto foodDto);

    void saveFood(FoodDto foodDto);

    String updateFood(FoodDto foodDto);

    String updateFoodWithoutImage(FoodDto foodDto);

}
