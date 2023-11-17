package com.a504.qookie.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

	Optional<Member> findByUid(String uid);
}
