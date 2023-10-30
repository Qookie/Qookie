package com.a504.qookie.domain.member.dto;

import java.time.LocalTime;

public record MemberRequest(
        String memberName,
        String wakeTime,
        String cookieName) {

}
