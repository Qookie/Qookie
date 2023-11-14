package com.a504.qookie.domain.heart.repository;

import java.util.List;

import com.a504.qookie.domain.heart.dto.HeartResponse;
import com.a504.qookie.domain.member.entity.Member;

public interface HeartRepositoryCustom {
	List<HeartResponse> findHeartByMonthAndMember(String yearAndMonth, Member member);
}
