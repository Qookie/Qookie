package com.a504.qookie.domain.order.repository;

import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.order.dto.OrderResponse;
import java.util.List;

public interface OrderRepositoryCustom {
    List<OrderResponse> findMemberItemByMonthAndMember(String yearAndMonth, Member member);
}
