package com.healthyeats.Healthyeatsbackend.Service.Impl;

import com.healthyeats.Healthyeatsbackend.Service.Impl.OrderServiceImpl;
import com.healthyeats.Healthyeatsbackend.dto.OrderDto;
import com.healthyeats.Healthyeatsbackend.entity.Order;
import com.healthyeats.Healthyeatsbackend.repository.OrderFoodRepository;
import com.healthyeats.Healthyeatsbackend.repository.OrderRepository;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderFoodRepository orderFoodRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    void countRows() {
        // Given
        long expectedRowCount = 5;
        when(orderRepository.count()).thenReturn(expectedRowCount);

        // When
        long rowCount = orderService.countRows();

        // Then
        assertThat(rowCount).isEqualTo(expectedRowCount);
    }
}
