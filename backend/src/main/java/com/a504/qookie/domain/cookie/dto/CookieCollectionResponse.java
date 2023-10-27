package com.a504.qookie.domain.cookie.dto;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.entity.CookieCollection;
import java.time.LocalDateTime;

public record CookieCollectionResponse(
        String name,
        String image,
        LocalDateTime startedAt,
        LocalDateTime endedAt
) {
    public CookieCollectionResponse(CookieCollection cookieCollection) {
        this(cookieCollection.getName(), cookieCollection.getImage(),
                cookieCollection.getStarted_at(), cookieCollection.getEnded_at());
    }
}
