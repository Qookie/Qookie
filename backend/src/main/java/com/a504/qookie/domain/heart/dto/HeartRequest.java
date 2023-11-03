package com.a504.qookie.domain.heart.dto;

public record HeartRequest(
    String username,
    HeartCategory category,
    String content
) {

}
