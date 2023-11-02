package com.a504.qookie.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.member.entity.MemberQuest;

public interface MemberQuestRepository extends JpaRepository<MemberQuest, Long> {
}
