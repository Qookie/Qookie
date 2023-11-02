package com.a504.qookie.domain.message.dto;

import com.a504.qookie.domain.heart.entity.Heart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {
    private String username;
    private String category;
    private String content;
    private Long heartId;

    public MessageRequest(Heart heart) {
        username = heart.getMember().getName();
        category = String.valueOf(heart.getCategory());
        content = heart.getContent();
        heartId = heart.getId();
    }
}
