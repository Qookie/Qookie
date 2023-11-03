package com.a504.qookie.domain.heart.dto;

import java.time.LocalDateTime;

public record HeartResponse(
    LocalDateTime createdAt,
    HeartCategory category,
    String content,
    String reply
) {

}
