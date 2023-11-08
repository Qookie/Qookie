package com.a504.qookie.domain.badge.dto;

public record BadgeDetailResponse(
        int condition,
        String url
) {

    public BadgeDetailResponse(int condition, String url) {
        this.condition = condition;
        this.url = url;
    }
}
