package com.a504.qookie.domain.cookie.repository;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CookieRepository extends JpaRepository<Cookie, Long> {
    Cookie findByIdAndMember(Long Id, Member member);
}
