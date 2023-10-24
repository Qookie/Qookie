package com.a504.qookie.domain.cookie.repository;

import com.a504.qookie.domain.cookie.entity.Body;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BodyRepository extends JpaRepository<Body, Long> {

    Optional<Body> findByStage(int stage);
}
