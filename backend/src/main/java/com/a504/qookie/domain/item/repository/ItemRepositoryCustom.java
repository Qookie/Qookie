package com.a504.qookie.domain.item.repository;

import com.a504.qookie.domain.item.dto.OrderResponse;
import com.a504.qookie.domain.member.entity.Member;
import java.util.List;

public interface ItemRepositoryCustom {
    List<OrderResponse> findMemberItemByMonthAndMember(String yearAndMonth, Member member);
}
