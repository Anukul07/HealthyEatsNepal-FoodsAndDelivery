package com.healthyeats.Healthyeatsbackend.repository;

import com.healthyeats.Healthyeatsbackend.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    List<Order> findAllByUserId(int userId);

    @Query(value = "select order_id from orders where user_id = ?1" , nativeQuery = true)
    int getOrderIdByUserId(int userId);

    @Transactional
    @Modifying
    int deleteAllByOrderId(int orderId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE orders SET food_ready_confirmation=?1 where order_id =?2 ", nativeQuery = true)
    void updateReadyConfirmation(String foodConfirmation, int orderId);

    @Query(value = "SELECT user_id from orders where order_id = ?1", nativeQuery = true)
    int getUserId(int orderId);
}
