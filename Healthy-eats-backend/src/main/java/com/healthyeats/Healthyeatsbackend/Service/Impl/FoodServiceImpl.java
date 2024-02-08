package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.FoodService;
import com.healthyeats.Healthyeatsbackend.dto.FoodDto;
import com.healthyeats.Healthyeatsbackend.entity.Food;
import com.healthyeats.Healthyeatsbackend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Autowired
    public FoodServiceImpl(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }
    @Value("${upload.path}")
    private String uploadPath;


    @Override
    public Optional<Food> findFoodById(FoodDto foodDto) {
        return foodRepository.findById(foodDto.getFoodId());
    }

    @Override
    public List<Food> findALl() {
        return foodRepository.findAll();
    }

    @Override
    public String deleteById(FoodDto foodDto) {
        foodRepository.deleteById(foodDto.getFoodId());
        return "food deleted successfully";
    }

    @Override
    public void saveFood(FoodDto foodDto) {
        Food food = new Food();
        food.setFoodName(foodDto.getFoodName());
        String fileName = UUID.randomUUID().toString()+"_"+ foodDto.getFoodImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(foodDto.getFoodImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        food.setFoodImage(fileName);
        food.setFoodDescription(foodDto.getFoodDescription());
        foodRepository.save(food);
    }

    @Override
    public String updateFood(FoodDto foodDto) {
        Food existingFood = foodRepository.findByFoodId(foodDto.getFoodId());
        existingFood.setFoodName(foodDto.getFoodName());
        existingFood.setFoodDescription(foodDto.getFoodDescription());
        String fileName = UUID.randomUUID().toString()+"_"+ foodDto.getFoodImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(foodDto.getFoodImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingFood.setFoodImage(fileName);
        foodRepository.save(existingFood);
        return "Food updated";
    }

    @Override
    public String updateFoodWithoutImage(FoodDto foodDto) {
        Food existingFood = foodRepository.findByFoodId(foodDto.getFoodId());
        existingFood.setFoodDescription(foodDto.getFoodDescription());
        existingFood.setFoodName(foodDto.getFoodName());
        foodRepository.save(existingFood);
        return "Food updated";
    }
}
