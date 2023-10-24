package com.a504.qookie.domain.cookie.dto;

import com.a504.qookie.domain.cookie.entity.Body;
import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.entity.Eye;
import com.a504.qookie.domain.cookie.entity.Mouth;
import java.time.LocalDateTime;

public record CookieResponse(
        Long id,
        String name,
        LocalDateTime createdAt,
        Long style,
        int active,
        int exp,
        int level,
        String body,
        String eye,
        String mouth,
        Long hat,
        Long top,
        Long bottom,
        Long shoe,
        Long background
) {

    public CookieResponse(Cookie cookie) {
        this(cookie.getId(), cookie.getName(), cookie.getCreatedAt(), cookie.getStyle(),
                cookie.getActive(), cookie.getExp(), cookie.getLevel(), cookie.getBody().getImage(),
                cookie.getEye().getImage(), cookie.getMouth().getImage(), cookie.getHat(), cookie.getTop(),
                cookie.getBottom(), cookie. getShoe(), cookie.getBackground());
    }
}
