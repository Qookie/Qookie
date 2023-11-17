package com.a504.qookie.domain.badge.dto;

import com.a504.qookie.domain.quest.dto.QuestType;

public record BadgeUploadRequest(
        QuestType quest,
        int requirement,
        String title
) {

}
