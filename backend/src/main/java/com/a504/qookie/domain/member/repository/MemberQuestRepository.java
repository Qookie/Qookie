package com.a504.qookie.domain.member.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberQuest;

public interface MemberQuestRepository extends JpaRepository<MemberQuest, Long> {
	List<MemberQuest> findAllByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
	List<MemberQuest> findAllByCreatedAtBetweenAndMember(LocalDateTime start, LocalDateTime end, Member member);
}
