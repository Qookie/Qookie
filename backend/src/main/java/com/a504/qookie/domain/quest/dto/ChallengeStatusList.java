package com.a504.qookie.domain.quest.dto;

import java.util.List;

public record ChallengeStatusList(
	List<ChallengeStatus> monthlyChallenge,
	List<ChallengeStatus> badgeChallenge
) {
}
