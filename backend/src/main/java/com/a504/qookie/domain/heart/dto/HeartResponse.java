package com.a504.qookie.domain.heart.dto;

import java.time.LocalDateTime;

public record HeartResponse(
    LocalDateTime createdAt,
    String category,
    String content,
    String reply
) {

}
