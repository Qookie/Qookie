package com.a504.qookie.domain.member.dto;

import java.time.LocalTime;

public record MemberResponse(
        String memberName,
        LocalTime wakeTime,
        String cookieName) {

}
