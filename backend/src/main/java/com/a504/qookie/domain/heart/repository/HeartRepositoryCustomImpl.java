package com.a504.qookie.domain.heart.repository;

import com.a504.qookie.domain.heart.dto.HeartResponse;
import com.a504.qookie.domain.heart.entity.QHeart;
import com.a504.qookie.domain.item.entity.QItem;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.QMemberItem;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HeartRepositoryCustomImpl implements HeartRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QHeart heart = QHeart.heart;

    @Override
    public List<HeartResponse> findHeartByMonthAndMember(String yearAndMonth, Member member) {
        return jpaQueryFactory.select(
                        Projections.constructor(HeartResponse.class, heart.createdAt, heart.category, heart.content, heart.reply))
                .from(heart)
                .where(
                        Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", heart.createdAt)
                                .eq(yearAndMonth),
                        heart.member.eq(member)
                )
                .orderBy(heart.createdAt.desc())
                .fetch();
    }
}
