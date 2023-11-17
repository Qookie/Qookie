package com.a504.qookie.domain.member.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.member.entity.History;
import com.a504.qookie.domain.member.entity.Member;

public interface HistoryRepository extends JpaRepository<History, Long> {
	List<History> findAllByCreatedAtBetweenAndMemberOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end, Member member);
}
