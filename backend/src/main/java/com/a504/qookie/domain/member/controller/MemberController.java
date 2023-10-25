package com.a504.qookie.domain.member.controller;

import com.a504.qookie.domain.member.service.MemberService;
import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
        // 새 친구면(getMember().getId()==null) DB에 저장
        memberService.createMember(loginRequest, customMemberDetails.getMember());

        // loginrequest에서 displayName, email 꺼내서 저장해야댐
        // kakao면 name, email null임 카카오에서 안보내주는데 설정해야할듯.

        return BaseResponse.okWithData(HttpStatus.OK, "LOGIN OK", null);
    }
}
