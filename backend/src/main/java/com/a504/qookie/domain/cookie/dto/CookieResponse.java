package com.a504.qookie.domain.cookie.dto;

import com.a504.qookie.domain.cookie.entity.Cookie;
import java.time.LocalDateTime;
import java.util.List;

public record CookieResponse(
        Long id,
        String name,
        LocalDateTime createdAt,
        int exp,
        int level,
        String body,
        String extraBody,
        String eye,
        String mouth,
        CookieItemResponse hat,
        CookieItemResponse top,
        CookieItemResponse bottom,
        CookieItemResponse shoe,
        CookieItemResponse background,
        List<CookieItemResponse > accessories
) {

    public CookieResponse(Cookie cookie, String body, String extraBody,
            CookieItemResponse hat, CookieItemResponse top, CookieItemResponse bottom, CookieItemResponse shoe, CookieItemResponse background,
            List<CookieItemResponse> accessories) {
        this(cookie.getId(), cookie.getName(), cookie.getCreatedAt(), cookie.getExp(), cookie.getLevel(), body, extraBody,
                cookie.getEye().getImage(), cookie.getMouth().getImage(),
                hat, top, bottom, shoe, background,
                accessories);
    }
}
