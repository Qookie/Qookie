package com.a504.qookie.domain.member.entity;

import java.time.LocalDateTime;

import com.a504.qookie.domain.badge.entity.Badge;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class MemberBadge {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_badge_id")
	private Long id;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;

	@JoinColumn(name = "badge_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Badge badge;

	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
