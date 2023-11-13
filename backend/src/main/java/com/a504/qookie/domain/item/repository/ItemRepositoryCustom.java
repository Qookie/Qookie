package com.a504.qookie.domain.item.repository;

import java.util.List;

import com.a504.qookie.domain.item.dto.OrderResponse;
import com.a504.qookie.domain.member.entity.Member;

public interface ItemRepositoryCustom {
	List<OrderResponse> findMemberItemByMonthAndMember(String yearAndMonth, Member member);
}
