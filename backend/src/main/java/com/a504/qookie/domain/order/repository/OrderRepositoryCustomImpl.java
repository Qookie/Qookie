package com.a504.qookie.domain.order.repository;

import com.a504.qookie.domain.item.entity.QItem;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.QMemberItem;
import com.a504.qookie.domain.order.dto.OrderResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QMemberItem memberItem = QMemberItem.memberItem;
    QItem item = QItem.item;

    @Override
    public List<OrderResponse> findMemberItemByMonthAndMember(String yearAndMonth, Member member) {
        return jpaQueryFactory.select(
                        Projections.constructor(OrderResponse.class, item.name, item.price, memberItem.createdAt))
                .from(memberItem)
                .join(memberItem.item, item)
                .where(
                        Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", memberItem.createdAt)
                                .eq(yearAndMonth),
                        memberItem.member.eq(member)
                )
                .orderBy(memberItem.createdAt.desc())
                .fetch();
    }
}
