package com.a504.qookie.domain.quest.dto;

public record ChallengeStatus(int coin,
							  String challengeName,
							  Long curCnt,
							  int totalCnt,
							  String questName,
							  String status,
							  Long badgeId) {
}
