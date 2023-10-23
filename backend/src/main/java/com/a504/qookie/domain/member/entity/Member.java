package com.a504.qookie.domain.member.entity;

import java.time.LocalTime;

import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.global.jwt.dto.JwtObject;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(
		indexes = {
				@Index(name = "idx_uid", columnList = "uid")
		}
)
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(name = "uid")
	private String uid;

	@Column(name = "email")
	private String email;

	@Column(name = "name")
	private String name;

	@Column(name = "wakeup")
	private LocalTime wakeUp;

	@Column(name = "point")
	private int point;

	public Member(JwtObject token) {
		email = token.getJwtPayload().getEmail();
		name = token.getJwtPayload().getName();
		uid = token.getJwtPayload().getUid();
	}

	public void addInfo(LoginRequest loginRequest) {
		email = loginRequest.getEmail();
		name = loginRequest.getDisplayName();
		uid = loginRequest.getUid();
	}
}
