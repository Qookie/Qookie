package com.a504.miru.domain.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepositoryImpl extends JpaRepository<Member, Long> {

    Optional<Member> findByUid(String uid);
}
