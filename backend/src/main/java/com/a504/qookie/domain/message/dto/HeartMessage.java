package com.a504.qookie.domain.message.dto;

import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.member.entity.Member;

public record HeartMessage(
        Heart heart,
        Member member
) {
}
