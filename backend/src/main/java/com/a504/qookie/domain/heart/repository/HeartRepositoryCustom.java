package com.a504.qookie.domain.heart.repository;

import com.a504.qookie.domain.heart.dto.HeartResponse;
import com.a504.qookie.domain.member.entity.Member;
import java.util.List;

public interface HeartRepositoryCustom {
    List<HeartResponse> findHeartByMonthAndMember(String yearAndMonth, Member member);
}
