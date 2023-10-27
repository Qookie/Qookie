package com.a504.qookie.domain.cookie.controller;

import com.a504.qookie.domain.cookie.dto.CookieCreateRequest;
import com.a504.qookie.domain.cookie.dto.CookieResponse;
import com.a504.qookie.domain.cookie.dto.FaceResponse;
import com.a504.qookie.domain.cookie.service.CookieService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cookie")
public class CookieController {

    private final CookieService cookieService;

    @PostMapping("/create")
    public ResponseEntity<?> create(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody CookieCreateRequest cookieCreateRequest) {

        CookieResponse cookieResponse = cookieService.create(customMemberDetails.getMember(), cookieCreateRequest.cookieName(), cookieCreateRequest.eyeId(), cookieCreateRequest.mouthId());

        return BaseResponse.okWithData(HttpStatus.OK, "cookie create OK", cookieResponse);
    }

    @GetMapping("/list")
    public ResponseEntity<?> cookieList(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        List<CookieResponse> cookieResponses = cookieService.cookieList(customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "cookie list OK", cookieResponses);
    }

    @PostMapping("/uploadBody/{stage}")
    public ResponseEntity<?> uploadBody(
            @RequestPart MultipartFile image,
            @PathVariable int stage) {

        String url = cookieService.uploadBody(image, stage);

        return BaseResponse.okWithData(HttpStatus.OK, "cookie body upload OK", url);
    }

    @PostMapping("/uploadEye")
    public ResponseEntity<?> uploadEye(
            @RequestPart MultipartFile image) {

        String url = cookieService.uploadEye(image);

        return BaseResponse.okWithData(HttpStatus.OK, "cookie eye upload OK", url);
    }

    @PostMapping("/uploadMouth")
    public ResponseEntity<?> uploadMouth(
            @RequestPart MultipartFile image) {

        String url = cookieService.uploadMouth(image);

        return BaseResponse.okWithData(HttpStatus.OK, "cookie mouth upload OK", url);
    }

    @GetMapping("/face/list")
    public ResponseEntity<?> eyeAndMouthList() {

        FaceResponse faceResponse = cookieService.eyeAndMouthList();

        return BaseResponse.okWithData(HttpStatus.OK, "cookie face list OK", faceResponse);
    }
}
