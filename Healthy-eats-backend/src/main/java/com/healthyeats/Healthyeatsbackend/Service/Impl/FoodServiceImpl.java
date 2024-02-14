package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.FoodService;
import com.healthyeats.Healthyeatsbackend.dto.FoodDto;
import com.healthyeats.Healthyeatsbackend.dto.FoodImageDto;
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
import java.util.ArrayList;
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
        food.setFoodPrice(foodDto.getFoodPrice());
        food.setFoodType(foodDto.getFoodType());
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
        existingFood.setFoodPrice(foodDto.getFoodPrice());
        existingFood.setFoodType(foodDto.getFoodType());
        foodRepository.save(existingFood);
        return "Food updated";
    }

    @Override
    public String updateFoodWithoutImage(FoodDto foodDto) {
        Food existingFood = foodRepository.findByFoodId(foodDto.getFoodId());
        existingFood.setFoodDescription(foodDto.getFoodDescription());
        existingFood.setFoodName(foodDto.getFoodName());
        existingFood.setFoodType(foodDto.getFoodType());
        existingFood.setFoodPrice(foodDto.getFoodPrice());
        foodRepository.save(existingFood);
        return "Food updated";
    }

    @Override
    public List<Food> findAllVegNonVeg(String foodType) {
        return foodRepository.getAllByFoodType(foodType);
    }

    @Override
    public List<FoodImageDto> getFoodImages(List<Integer> foodIds) {
        List<Food> foods = foodRepository.findAllById(foodIds);
        List<FoodImageDto> foodDtos = new ArrayList<>();

        for (Food food : foods) {
            FoodImageDto foodDto = FoodImageDto.builder()
                    .foodId(food.getFoodId())
                    .foodName(food.getFoodName())
                    .foodImage(food.getFoodImage())
                    .foodPrice(food.getFoodPrice())
                    .build();
            foodDtos.add(foodDto);
        }
        return foodDtos;
    }


}
