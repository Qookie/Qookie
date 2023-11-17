package com.a504.qookie.domain.cookie.dto;

public record CookieCreateRequest(
        String cookieName,
        Long eyeId,
        Long mouthId) {

}
