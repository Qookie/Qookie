package com.a504.qookie.domain.heart.repository;

import java.util.List;

import com.a504.qookie.domain.cookie.entity.QCookie;
import com.a504.qookie.domain.member.entity.QMember;
import com.a504.qookie.domain.message.dto.HeartMessage;
import org.springframework.stereotype.Repository;

import com.a504.qookie.domain.heart.dto.HeartResponse;
import com.a504.qookie.domain.heart.entity.QHeart;
import com.a504.qookie.domain.member.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class HeartRepositoryCustomImpl implements HeartRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QHeart heart = QHeart.heart;
    QMember member = QMember.member;

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

    @Override
    public HeartMessage makeHeartMessageFromHeartId(Long heartId) {
        return jpaQueryFactory.select(
                        Projections.constructor(HeartMessage.class, heart, member))
                .from(heart)
                .join(heart.member, member)
                .where(heart.id.eq(heartId))
                .fetchOne();
    }
}
