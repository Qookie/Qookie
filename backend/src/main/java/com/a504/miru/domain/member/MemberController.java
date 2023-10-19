package com.a504.miru.domain.member;

import com.a504.miru.global.jwt.JwtUtil;
import com.a504.miru.global.response.BaseResponse;
import com.a504.miru.global.security.CustomMemberDetails;
import com.a504.miru.global.security.CustomMemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    @PostMapping("/login")
    public ResponseEntity<?> oidcLogin(
            @RequestHeader("Authorization") String idToken,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        // 새 친구면(getMember().getId()==null) DB에 저장
        // kakao면 name, email null임 카카오에서 안보내주는데 설정해야할듯.

        return BaseResponse.okWithData(HttpStatus.OK, "LOGIN OK", null);
    }
}
