package com.healthyeats.Healthyeatsbackend.Service.Impl;
import com.healthyeats.Healthyeatsbackend.dto.FoodDto;
import com.healthyeats.Healthyeatsbackend.entity.Food;
import com.healthyeats.Healthyeatsbackend.repository.FoodRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FoodServiceImplTest {
    @Mock
    private FoodRepository foodRepository;

    private FoodServiceImpl foodServiceUnderTest;

    @BeforeEach
    void setUp() {
        foodServiceUnderTest = new FoodServiceImpl(foodRepository);
    }
    @AfterEach
    void tearDown() {
        foodRepository.deleteAll();
    }

    //following are the passing tests
    @Test
    void checkIfFindsALl() {
        // Given
        Food food1 = new Food(1, "Pizza", 150, "Delicious pizza", "pizza.jpg", "Italian");
        Food food2 = new Food(2, "Burger", 180, "Juicy burger", "burger.jpg", "American");
        when(foodRepository.findAll()).thenReturn(Arrays.asList(food1, food2));

        // When
        List<Food> allFoods = foodServiceUnderTest.findALl();

        // Then
        assertThat(allFoods).containsExactly(food1, food2);
    }

    @Test
    void checkIfDeletedById() {
        // Given
        int foodId = 1;

        // When
        String result = foodServiceUnderTest.deleteById(foodId);

        // Then
        assertThat(result).isEqualTo("food deleted successfully");
        verify(foodRepository, times(1)).deleteById(foodId);
    }

    //failing tests
    @Test
    void DoesNotfindALl() {
        // Given
        Food food1 = new Food(1, "Pizza", 150, "Delicious pizza", "pizza.jpg", "Italian");
        Food food2 = new Food(2, "Burger", 180, "Juicy burger", "burger.jpg", "American");
        when(foodRepository.findAll()).thenReturn(Arrays.asList(food1, food2));

        // When
        List<Food> allFoods = foodServiceUnderTest.findALl();

        // Then
        assertThat(allFoods).isNull();
        assertThat(allFoods).hasSize(2);
    }

    @Test
    void checksIfDoesntDeleteById() {
        // Given
        int foodId = 1;

        // When
        String result = foodServiceUnderTest.deleteById(foodId);

        // Then
        assertThat(result).isEqualTo("food deleted successfully");
        verify(foodRepository, times(2)).deleteById(foodId);
    }


}

