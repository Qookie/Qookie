package com.a504.qookie.domain.badge.dto;

public record BadgeResponse(
        BadgeDetailResponse firstBadge,
        BadgeDetailResponse secondBadge,
        BadgeDetailResponse thirdBadge
) {
    public BadgeResponse(BadgeDetailResponse firstBadge, BadgeDetailResponse secondBadge, BadgeDetailResponse thirdBadge) {
        this.firstBadge = firstBadge;
        this.secondBadge = secondBadge;
        this.thirdBadge = thirdBadge;
    }
}
