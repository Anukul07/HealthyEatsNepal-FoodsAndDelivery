package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findAllByUserId(int userId);
}
