package com.a504.qookie.domain.heart.entity;

import com.a504.qookie.domain.heart.dto.HeartRequest;
import java.time.LocalDateTime;

import com.a504.qookie.domain.member.entity.Member;

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
public class Heart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "heart_id")
	private Long id;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;

	@Column(name = "content")
	private String content;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "category")
	private String category;

	@Column(name = "reply")
	private String reply;

	public Heart(Member member, HeartRequest heartRequest) {
		this.member = member;
		this.createdAt = LocalDateTime.now();
		this.category = heartRequest.category();
		this.content = heartRequest.content();
	}
}
