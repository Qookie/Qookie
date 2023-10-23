package com.a504.qookie.domain.member;

import com.a504.qookie.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepositoryImpl extends JpaRepository<Member, Long> {

    Optional<Member> findByUid(String uid);
}
