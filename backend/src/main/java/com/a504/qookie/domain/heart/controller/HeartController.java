package com.a504.qookie.domain.heart.controller;

import com.a504.qookie.domain.heart.dto.HeartRequest;
import com.a504.qookie.domain.heart.service.HeartService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heart")
public class HeartController {

    private final HeartService heartService;

    @PostMapping("/create")
    public ResponseEntity<?> create(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody HeartRequest heartRequest) {

        heartService.create(customMemberDetails.getMember(), heartRequest);

        return BaseResponse.ok(HttpStatus.OK, "heart create OK");
    }
}
