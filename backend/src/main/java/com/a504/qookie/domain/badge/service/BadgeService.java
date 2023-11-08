package com.a504.qookie.domain.badge.service;

import com.a504.qookie.domain.badge.dto.BadgeDetailResponse;
import com.a504.qookie.domain.badge.dto.BadgeResponse;
import com.a504.qookie.domain.badge.dto.BadgeUploadRequest;
import com.a504.qookie.domain.badge.entity.Badge;
import com.a504.qookie.domain.badge.repository.BadgeRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.repository.MemberBadgeRepository;
import com.a504.qookie.domain.quest.dto.QuestType;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final AwsS3Service awsS3Service;
    private final MemberBadgeRepository memberBadgeRepository;
    private final RedisTemplate<String, String> template;

    public void upload(BadgeUploadRequest badgeUploadRequest, MultipartFile image) {

        String url = awsS3Service.uploadImageToS3(image);

        badgeRepository.save(new Badge(badgeUploadRequest, url));
    }

    public Map<String, BadgeResponse> getBadge(Member member) {

        Map<String, BadgeResponse> map = new HashMap<>();

        for (int i = 1; i <= 7; i++) {
            BadgeResponse badgeResponse;
            BadgeDetailResponse firstBadge = null;
            BadgeDetailResponse secondBadge = null;
            BadgeDetailResponse thirdBadge = null;
            QuestType quest = null;
            for (int j = 1; j <= 3; j++) {

                int badgeId = (i - 1) * 3 + j;

                Badge badge = badgeRepository.findById(Long.valueOf(badgeId))
                        .orElseThrow(() -> new IllegalArgumentException("뱃지가 없습니다"));

                String key = badgeId + ":" + badge.getQuest().toString() +":"+ ((badgeId - 1L) % 3 + 1) +":badge";
                boolean isCompleted = Boolean.TRUE.equals(
                        template.opsForSet().isMember(key, member.getId() + ""));

                int requirement = badge.getRequirement();

                String url = null;
                if (isCompleted) {
                    url = badge.getImage();
                }

                quest = badge.getQuest();
                
                switch (j) {
                    case 1:
                        firstBadge = new BadgeDetailResponse(requirement, url);
                        break;
                    case 2:
                        secondBadge = new BadgeDetailResponse(requirement, url);
                        break;
                    case 3:
                        thirdBadge = new BadgeDetailResponse(requirement, url);
                        break;
                }
            }
            map.put(quest.toString().toLowerCase(), new BadgeResponse(firstBadge, secondBadge, thirdBadge));
        }

        return map;
    }
}