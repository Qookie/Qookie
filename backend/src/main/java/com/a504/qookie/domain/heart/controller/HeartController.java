package com.a504.qookie.domain.heart.controller;

import com.a504.qookie.domain.heart.dto.HeartRequest;
import com.a504.qookie.domain.heart.dto.HeartResponse;
import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.heart.service.HeartService;
import com.a504.qookie.domain.message.dto.MessageRequest;
import com.a504.qookie.domain.message.service.MessageService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/heart")
public class HeartController {

    private final HeartService heartService;
    private final MessageService messageService;

    @PostMapping("/create")
    public ResponseEntity<?> create(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody HeartRequest heartRequest) {

        Heart createdHeart = heartService.create(customMemberDetails.getMember(), heartRequest);
        messageService.sendMessage(new MessageRequest(createdHeart));

        return BaseResponse.ok(HttpStatus.OK, "heart create OK");
    }

    @GetMapping("/list")
    public ResponseEntity<?> list(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        List<HeartResponse> heartResponses = heartService.list(customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "heart list OK", heartResponses);
    }
}
