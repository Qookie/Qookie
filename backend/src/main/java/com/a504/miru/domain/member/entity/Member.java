package com.a504.miru.domain.member.entity;

import java.time.LocalTime;

import com.a504.miru.global.jwt.dto.JwtObject;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
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
}
