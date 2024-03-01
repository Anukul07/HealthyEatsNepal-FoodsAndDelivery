package com.healthyeats.Healthyeatsbackend.Service.Impl;
import com.healthyeats.Healthyeatsbackend.dto.RegisterDto;
import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    private UserServiceImpl userServiceUnderTest;

    @BeforeEach
    void setUp() {
        userServiceUnderTest = new UserServiceImpl(userRepository,null,null);
    }


    //passing tests

    //testing if findByEmail method was invoked in service layer
    @Test
    void canGetUsername() {
        //when
        userServiceUnderTest.getUsername("email");
        //then
        verify(userRepository).findByEmail("email");
    }

    @Test
    void getRoleFromEmail() {
        // Given
        String email = "test@gmail.com";
        Role expectedRole = Role.USER;

        // When
        when(userRepository.getUserRole(email)).thenReturn(expectedRole);
        String role = userServiceUnderTest.getRoleFromEmail(email);

        // Then
        assertEquals(expectedRole.name(), role);
        verify(userRepository).getUserRole(email);
    }

    @Test
    void countRows() {
        // Given
        long expectedRowCount = 10;

        // When
        when(userRepository.count()).thenReturn(expectedRowCount);
        long count = userServiceUnderTest.countRows();

        // Then
        assertEquals(expectedRowCount, count);
        verify(userRepository).count();


    }


}