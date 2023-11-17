package com.a504.qookie.domain.cookie.repository;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CookieRepository extends JpaRepository<Cookie, Long> {
    Optional<Cookie> findByMember(Member member);

    boolean existsByMember(Member member);
}
