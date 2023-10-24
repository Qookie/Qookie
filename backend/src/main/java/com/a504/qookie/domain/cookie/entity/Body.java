package com.a504.qookie.domain.cookie.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Body {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "body_id")
	private Long id;

	@Column(name = "stage")
	private int stage;

	@Column(name = "image")
	private String image;

}
