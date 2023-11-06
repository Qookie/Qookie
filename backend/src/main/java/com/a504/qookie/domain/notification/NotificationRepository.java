package com.a504.qookie.domain.notification;

import com.a504.qookie.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByMemberOrderByCreatedAtDesc(Member member);
}
