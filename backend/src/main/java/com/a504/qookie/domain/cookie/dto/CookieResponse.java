package com.a504.qookie.domain.cookie.dto;

import com.a504.qookie.domain.cookie.entity.Cookie;
import java.time.LocalDateTime;

public record CookieResponse(
        Long id,
        String name,
        LocalDateTime createdAt,
        Long style,
        int exp,
        int level,
        String body,
        String eye,
        String mouth,
        String hat,
        String top,
        String bottom,
        String shoe,
        String background
) {

    public CookieResponse(Cookie cookie) {
        this(cookie.getId(), cookie.getName(), cookie.getCreatedAt(), cookie.getStyle(), cookie.getExp(), cookie.getLevel(), cookie.getBody().getImage(),
                cookie.getEye().getImage(), cookie.getMouth().getImage(), cookie.getHat().getMedia(), cookie.getTop().getMedia(),
                cookie.getBottom().getMedia(), cookie. getShoe().getMedia(), cookie.getBackground().getMedia());
    }
}
