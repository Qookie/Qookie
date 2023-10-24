package com.a504.qookie.domain.cookie.repository;

import com.a504.qookie.domain.cookie.entity.Cookie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CookieRepository extends JpaRepository<Cookie, Long> {

}
