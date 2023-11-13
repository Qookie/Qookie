package com.a504.qookie.domain.badge.controller;

import com.a504.qookie.domain.badge.dto.BadgeResponse;
import com.a504.qookie.domain.badge.dto.BadgeUploadRequest;
import com.a504.qookie.domain.badge.service.BadgeService;
import com.a504.qookie.domain.quest.dto.QuestType;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/badge")
public class BadgeController {

    private final BadgeService badgeService;

    @PostMapping
    public ResponseEntity<?> upload(
            BadgeUploadRequest badgeUploadRequest,
            @RequestPart(value = "image") MultipartFile image) {

        badgeService.upload(badgeUploadRequest, image);

        return BaseResponse.ok(HttpStatus.OK, "badge upload OK");

    }

    @GetMapping
    public ResponseEntity<?> getBadge(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails
    ) {

        Map<String, BadgeResponse> badgeListResponse = badgeService.getBadge(customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "badge list OK", badgeListResponse);
    }
}
