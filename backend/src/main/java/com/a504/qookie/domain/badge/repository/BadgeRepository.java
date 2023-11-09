package com.a504.qookie.domain.badge.repository;

import com.a504.qookie.domain.badge.entity.Badge;
import com.a504.qookie.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
