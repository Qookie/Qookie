package com.a504.qookie.domain.heart.dto;

import com.a504.qookie.domain.heart.entity.Heart;
import java.time.LocalDateTime;

public record HeartResponse(
    LocalDateTime createdAt,
    int category,
    String content,
    String reply
) {
    public HeartResponse(Heart heart) {
        this(heart.getCreatedAt(), heart.getCategory(), heart.getContent(), heart.getReply());
    }
}
