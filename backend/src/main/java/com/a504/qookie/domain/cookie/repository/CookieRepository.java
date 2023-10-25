package com.a504.qookie.domain.cookie.repository;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CookieRepository extends JpaRepository<Cookie, Long> {
    List<Cookie> findAllByMemberAndActive(Member member, int active);
}
