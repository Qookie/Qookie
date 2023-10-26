package com.a504.qookie.domain.heart.dto;

import com.a504.qookie.domain.cookie.entity.Eye;
import com.a504.qookie.domain.cookie.entity.Mouth;
import java.util.List;

public record HeartRequest(
    int category,
    String content
) {

}
