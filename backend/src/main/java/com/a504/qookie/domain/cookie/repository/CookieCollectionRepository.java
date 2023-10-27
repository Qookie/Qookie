package com.a504.qookie.domain.cookie.repository;

import com.a504.qookie.domain.cookie.entity.CookieCollection;
import com.a504.qookie.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CookieCollectionRepository extends JpaRepository<CookieCollection, Long> {
    List<CookieCollection> findAllByMember(Member member);
}
