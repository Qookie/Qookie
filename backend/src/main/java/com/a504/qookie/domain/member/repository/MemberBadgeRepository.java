package com.a504.qookie.domain.member.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberBadge;

public interface MemberBadgeRepository extends JpaRepository<MemberBadge, Long> {

	List<MemberBadge> findAllByMember(Member member);

}
