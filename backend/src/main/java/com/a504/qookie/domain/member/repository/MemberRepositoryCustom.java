package com.a504.qookie.domain.member.repository;

import com.a504.qookie.domain.member.dto.MemberResponse;

public interface MemberRepositoryCustom {

    MemberResponse findMemberInfoById(Long memberId);

}
