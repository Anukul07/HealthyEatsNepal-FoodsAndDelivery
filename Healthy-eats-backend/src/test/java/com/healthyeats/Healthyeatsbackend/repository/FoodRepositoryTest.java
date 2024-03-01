package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Food;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class FoodRepositoryTest {

    private final FoodRepository foodRepositoryUnderTest;

    @Autowired
    FoodRepositoryTest(FoodRepository foodRepositoryUnderTest) {
        this.foodRepositoryUnderTest = foodRepositoryUnderTest;
    }

    @AfterEach
    void tearDown() {
        foodRepositoryUnderTest.deleteAll();
    }


    //passing tests are as follows
    @Test
    void checksIfSavesFood() {
        // Given
        Food food = new Food();
        food.setFoodName("Pizza");
        food.setFoodPrice(150);
        food.setFoodDescription("Delicious pizza");
        food.setFoodImage("pizza.jpg");
        food.setFoodType("Italian");

        // When
        foodRepositoryUnderTest.save(food);

        // Then
        assertThat(food.getFoodId()).isNotNull();
    }

    @Test
    void checksIfUpdatesFood() {
        // Given
        Food food = new Food();
        food.setFoodName("Pizza");
        food.setFoodPrice(150);
        food.setFoodDescription("Delicious pizza");
        food.setFoodImage("pizza.jpg");
        food.setFoodType("Italian");

        // Save food
        foodRepositoryUnderTest.save(food);

        // Update food's description
        String newDescription = "Delicious and cheesy pizza";
        food.setFoodDescription(newDescription);

        // When
        foodRepositoryUnderTest.save(food);

        // Then
        Food updatedFood = foodRepositoryUnderTest.findById(food.getFoodId()).orElse(null);
        assertThat(updatedFood).isNotNull();
        assertThat(updatedFood.getFoodDescription()).isEqualTo(newDescription);
    }
    @Test
    void checkIffindsByFoodId() {
        // Given
        Food food = new Food(1, "Pizza", 150, "Delicious pizza", "pizza.jpg", "Italian");
        foodRepositoryUnderTest.save(food);

        // When
        Food foundFood = foodRepositoryUnderTest.findByFoodId(1);

        // Then
        assertThat(foundFood).isNotNull();
        assertThat(foundFood.getFoodName()).isEqualTo("Pizza");
    }

    @Test
    void checkIfGetsAllByFoodType() {
        // Given
        Food food1 = new Food(1, "Pasta", 200, "Authentic Italian pasta", "pasta.jpg", "Italian");
        Food food2 = new Food(2, "Sushi", 250, "Fresh sushi", "sushi.jpg", "Japanese");
        foodRepositoryUnderTest.save(food1);
        foodRepositoryUnderTest.save(food2);

        // When
        List<Food> foodsByType = foodRepositoryUnderTest.getAllByFoodType("Italian");

        // Then
        assertThat(foodsByType).isNotNull();
        assertThat(foodsByType).hasSize(1);
        assertThat(foodsByType.get(0).getFoodName()).isEqualTo("Pasta");
    }

    @Test
    void checkIffindsAllFood() {
        // Given
        Food food1 = new Food(1, "Burger", 180, "Nice burger", "burger.jpg", "American");
        Food food2 = new Food(2, "Tacos", 170, "Spicy mexican tacos", "tacos.jpg", "Mexican");
        foodRepositoryUnderTest.save(food1);
        foodRepositoryUnderTest.save(food2);

        // When
        List<Food> allFoods = foodRepositoryUnderTest.findAll();

        // Then
        assertThat(allFoods).isNotNull();
        assertThat(allFoods).hasSize(2);
    }

    //failing tests are as follows
    @Test
    void doesNotFindByFoodId() {
        // Given
        Food food = new Food(1, "Pizza", 150, "Delicious pizza", "pizza.jpg", "Italian");
        foodRepositoryUnderTest.save(food);

        // When
        Food foundFood = foodRepositoryUnderTest.findByFoodId(10);

        // Then
        assertThat(foundFood).isNotNull();
    }

    @Test
    void doesNotGetsAllByFoodType() {
        // Given
        Food food1 = new Food(1, "Pasta", 200, "Authentic Italian pasta ", "pasta.jpg", "Italian");
        Food food2 = new Food(2, "Sushi", 250, "Fresh sushi", "sushi.jpg", "Japanese");
        foodRepositoryUnderTest.save(food1);
        foodRepositoryUnderTest.save(food2);

        // When
        List<Food> foodsByType = foodRepositoryUnderTest.getAllByFoodType("Italian");

        // Then
        assertThat(foodsByType).isNotNull();
        assertThat(foodsByType).isEmpty();
    }

    @Test
    void doesNotFindAll() {
        // Given
        Food food1 = new Food(1, "Burger", 180, "Juicy beef burger with lettuce and cheese", "burger.jpg", "American");
        Food food2 = new Food(2, "Tacos", 170, "Spicy Mexican tacos with salsa and guacamole", "tacos.jpg", "Mexican");
        foodRepositoryUnderTest.save(food1);
        foodRepositoryUnderTest.save(food2);

        // When
        List<Food> allFoods = foodRepositoryUnderTest.findAll();

        // Then
        assertThat(allFoods).hasSize(3);
    }
}
