package com.a504.qookie.domain.cookie.entity;

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
public class Cookie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cookie_id")
	private Long id;

	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;

	@Column(name = "name")
	private String name;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "style")
	private Long style;

	@Column(name = "active")
	private int active;

	@Column(name = "exp")
	private int exp;

	@Column(name = "level")
	private int level;

	@JoinColumn(name = "body_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Body body;

	@JoinColumn(name = "eye_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Eye eye;

	@JoinColumn(name = "mouth_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Mouth mouth;

	@Column(name = "hat")
	private Long hat;

	@Column(name = "top")
	private Long top;

	@Column(name = "bottom")
	private Long bottom;

	@Column(name = "shoe")
	private Long shoe;

	@Column(name = "background")
	private Long background;

	public static Cookie createCookie(Member member, String name, Body body, Eye eye, Mouth mouth) {
		Cookie cookie = Cookie.builder()
				.member(member)
				.name(name)
				.createdAt(LocalDateTime.now())
				.active(1)
				.exp(0)
				.level(1)
				.body(body)
				.eye(eye)
				.mouth(mouth)
				.build();
		return cookie;
	}

	public void changeName(String cookieName) {
		this.name = cookieName;
	}

	public void updateExp(int exp){
		this.exp += exp;
	}

	public void updateLevel(int level){
		this.level += level;
	}

}
