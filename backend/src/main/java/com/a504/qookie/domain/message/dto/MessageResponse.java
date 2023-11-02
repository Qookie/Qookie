package com.a504.qookie.domain.message.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    private String content;
    private LocalDateTime createdAt;
    private Long heartId;
}
