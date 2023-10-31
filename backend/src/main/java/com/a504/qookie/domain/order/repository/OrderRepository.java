package com.a504.qookie.domain.order.repository;

import com.a504.qookie.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
