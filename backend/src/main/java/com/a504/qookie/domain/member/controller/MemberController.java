package com.a504.qookie.domain.member.controller;

import com.a504.qookie.domain.member.dto.*;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.service.MemberService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import com.google.api.Http;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<?> oidcLogin(
            @RequestHeader("Authorization") String idToken,
            @RequestBody LoginRequest loginRequest,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        boolean isNew = customMemberDetails.getMember().getId() == null;
        Member member = memberService.createMember(loginRequest, customMemberDetails.getMember());
        return BaseResponse.okWithData(HttpStatus.OK, "LOGIN OK", new LoginResponse(member, isNew));
    }

    @PostMapping("/time")
    public ResponseEntity<?> setTime(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody WakeTimeRequest wakeTimeRequest) {

        memberService.setTime(customMemberDetails.getMember(), wakeTimeRequest.wakeTime());

        return BaseResponse.ok(HttpStatus.OK, "Set Time OK");
    }

    @GetMapping
    public ResponseEntity<?> getInfo(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        MemberResponse memberResponse = memberService.getInfo(customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "member getInfo OK", memberResponse);
    }

    @PatchMapping("/modify")
    public ResponseEntity<?> modifyInfo(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody MemberRequest memberRequest) {

        memberService.modifyInfo(customMemberDetails.getMember().getId(), memberRequest);

        return BaseResponse.ok(HttpStatus.OK, "member modifyInfo OK");
    }

    @PatchMapping("/delete")
    public ResponseEntity<?> delete(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        try {
            memberService.delete(customMemberDetails.getMember().getUid());
            return BaseResponse.ok(HttpStatus.OK, "member delete OK");
        } catch (NoSuchAlgorithmException | IllegalArgumentException e) {
            e.printStackTrace();
            return BaseResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "member delete FAILURE " + e.getMessage());
        }
    }
}
