package com.a504.qookie.domain.cookie.controller;

import com.a504.qookie.domain.cookie.dto.CookieCreateRequest;
import com.a504.qookie.domain.cookie.dto.CookieModifyRequest;
import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.service.CookieService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cookie")
public class CookieController {

    private final CookieService cookieService;

    @PostMapping("/create")
    public ResponseEntity<?> create(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody CookieCreateRequest cookieCreateRequest) {

        Cookie cookie = cookieService.create(customMemberDetails.getMember(), cookieCreateRequest.cookieName(), cookieCreateRequest.eyeId(), cookieCreateRequest.mouthId());

        return BaseResponse.okWithData(HttpStatus.OK, "cookie create OK", cookie);
    }

    @PatchMapping("/modify")
    public ResponseEntity<?> modify(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody CookieModifyRequest cookieModifyRequest) {

        if (!cookieService.checkMember(customMemberDetails.getMember(), cookieModifyRequest.cookieId())) {
            return BaseResponse.fail(HttpStatus.BAD_REQUEST, "허용되지 않은 접근입니다");
        }

        Cookie cookie = cookieService.modify(customMemberDetails.getMember(), cookieModifyRequest.cookieId(), cookieModifyRequest.cookieName());

        return BaseResponse.okWithData(HttpStatus.OK, "cookie modify OK", cookie);
    }
}
