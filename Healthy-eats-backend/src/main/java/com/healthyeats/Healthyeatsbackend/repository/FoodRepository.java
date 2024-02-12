package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food,Integer> {

    @Query(value = "select * from foods where food_id = ?1",nativeQuery = true)
    Food findByFoodId(int foodId);

    List<Food> getAllByFoodType(String foodType);

}
