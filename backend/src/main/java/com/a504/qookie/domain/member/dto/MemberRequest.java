package com.a504.qookie.domain.member.dto;

public record MemberRequest(
	String memberName,
	String wakeTime,
	String cookieName) {

}
