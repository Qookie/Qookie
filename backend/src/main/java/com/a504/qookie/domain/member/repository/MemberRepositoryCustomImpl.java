package com.a504.qookie.domain.member.repository;

import org.springframework.stereotype.Repository;

import com.a504.qookie.domain.cookie.entity.QCookie;
import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.entity.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	QMember member = QMember.member;
	QCookie cookie = QCookie.cookie;

	@Override
	public MemberResponse findMemberInfoById(Long memberId) {
		return jpaQueryFactory.select(
				Projections.constructor(MemberResponse.class, member.name, member.wakeUp, cookie.name))
			.from(cookie)
			.join(cookie.member, member).on(member.id.eq(memberId))
			.fetchOne();
	}
}
