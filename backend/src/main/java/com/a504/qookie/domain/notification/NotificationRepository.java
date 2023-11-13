package com.a504.qookie.domain.notification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.member.entity.Member;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	List<Notification> findAllByMemberOrderByCreatedAtDesc(Member member);
}
