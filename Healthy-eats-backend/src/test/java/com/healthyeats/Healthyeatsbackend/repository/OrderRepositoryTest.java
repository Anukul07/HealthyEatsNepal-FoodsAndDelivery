package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Order;
import com.healthyeats.Healthyeatsbackend.entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class OrderRepositoryTest {

    private final OrderRepository orderRepositoryUnderTest;
    private final UserRepository userRepository;

    @Autowired
    OrderRepositoryTest(OrderRepository orderRepositoryUnderTest, UserRepository userRepository) {
        this.orderRepositoryUnderTest = orderRepositoryUnderTest;
        this.userRepository = userRepository;
    }

    @AfterEach
    void tearDown() {
        orderRepositoryUnderTest.deleteAll();
    }

    //passing tests are as follows
    @Test
    void canFindAllOrdersByUserId() {
        //given
        User user = new User();
        user.setId(1);
        user.setEmail("tester@gmail.com");
        userRepository.save(user);
        Order order = new Order(1,"2022-03-04",290,"random","random","random","random","random",user,null);
        orderRepositoryUnderTest.save(order);
        //when
        List<Order> expectedOrders = orderRepositoryUnderTest.findAllByUserId(1);
        //then
        assertThat(expectedOrders)
                .isNotNull()
                .hasSize(1);

    }
    @Test
    void checkOrdersAreDeletedAllByOrderId() {
        //given
        User user = new User();
        user.setId(1);
        user.setEmail("tester@gmail.com");
        userRepository.save(user);
        Order order = new Order(1,"2022-03-04",290,"random","random","random","random","random",user,null);
        orderRepositoryUnderTest.save(order);
        //when
        orderRepositoryUnderTest.deleteAllByOrderId(1);
        //then
        List<Order> deletedOrders = orderRepositoryUnderTest.findAllByUserId(1);
        assertThat(deletedOrders).isEmpty();
    }


    //failing tests
    @Test
    void cannotFindAllOrdersByUserId() {
        //given
        User user = new User();
        user.setId(2);
        user.setEmail("tester@gmail.com");
        userRepository.save(user);
        Order order = new Order(1,"2022-03-04",290,"random","random","random","random","random",user,null);
        //when
        orderRepositoryUnderTest.save(order);
        List<Order> expectedOrders = orderRepositoryUnderTest.findAllByUserId(4);
        //then
        assertThat(expectedOrders)
                .isNotNull()
                .hasSize(1);

    }
    @Test
    void checkOrdersAreNotDeletedAllByOrderId() {
        //given
        User user = new User();
        user.setId(1);
        user.setEmail("tester@gmail.com");
        userRepository.save(user);
        Order order = new Order(1,"2022-03-04",290,"random","random","random","random","random",user,null);
        orderRepositoryUnderTest.save(order);
        //when
        orderRepositoryUnderTest.deleteAllByOrderId(3);
        //then
        List<Order> deletedOrders = orderRepositoryUnderTest.findAllByUserId(1);
        assertThat(deletedOrders).isEmpty();
    }


}