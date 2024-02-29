package com.healthyeats.Healthyeatsbackend.controller;

import com.healthyeats.Healthyeatsbackend.Service.FoodService;
import com.healthyeats.Healthyeatsbackend.dto.FoodDto;
import com.healthyeats.Healthyeatsbackend.dto.FoodImageDto;
import com.healthyeats.Healthyeatsbackend.entity.Food;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {
    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/get-all")
    public List<Food> getAllFood(){
        return foodService.findALl();
    }

    @GetMapping("/get-all-admin")
    public List<Food> getAllFoodAdmin(){
        return foodService.findALl();
    }

    @PostMapping("/save-food")
    public void saveFood(@ModelAttribute FoodDto foodDto){
        foodService.saveFood(foodDto);
    }

    @PostMapping("/update-food-img")
    public void updateFood(@ModelAttribute FoodDto foodDto){
        foodService.updateFood(foodDto);
    }
    @PostMapping("/update-food")
    public void updateFoodWithoutImage(@ModelAttribute FoodDto foodDto){
        foodService.updateFoodWithoutImage(foodDto);
    }

    @PostMapping("/delete-food/{foodId}")
    public void deleteFood(@PathVariable int foodId){
        foodService.deleteById(foodId);
    }

    @GetMapping("/get-all/filter/{foodType}")
    public List<Food> getAllFoodFilter(@PathVariable String foodType) {
        return foodService.findAllVegNonVeg(foodType);
    }

    @GetMapping("/get-food-image/{foodIds}")
    public List<FoodImageDto> getFoodImage(@PathVariable List<Integer> foodIds){
        return foodService.getFoodImages(foodIds);
    }
    @GetMapping("count-rows")
    public long countRows(){
        return foodService.countRows();
    }
}
