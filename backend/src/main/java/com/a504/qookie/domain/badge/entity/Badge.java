package com.a504.qookie.domain.badge.entity;

import com.a504.qookie.domain.badge.dto.BadgeUploadRequest;
import com.a504.qookie.domain.quest.dto.QuestType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Badge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "badge_id")
	private Long id;

	@Column(name = "quest")
	@Enumerated(value = EnumType.STRING)
	private QuestType quest;

	@Column(name = "requirement")
	private int requirement;

	@Column(name = "title")
	private String title;

	@Column(name = "image")
	private String image;

	public Badge(BadgeUploadRequest badgeUploadRequest, String url) {
		this.quest = badgeUploadRequest.quest();
		this.requirement = badgeUploadRequest.requirement();
		this.image = url;
		this.title = badgeUploadRequest.title();
	}
}
