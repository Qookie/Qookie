package com.a504.qookie.domain.cookie.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a504.qookie.domain.cookie.dto.CookieCollectionResponse;
import com.a504.qookie.domain.cookie.dto.CookieCreateRequest;
import com.a504.qookie.domain.cookie.dto.CookieResponse;
import com.a504.qookie.domain.cookie.dto.FaceResponse;
import com.a504.qookie.domain.cookie.dto.LastBodyResponse;
import com.a504.qookie.domain.cookie.service.CookieService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cookie")
public class CookieController {

	private final CookieService cookieService;

	@PostMapping("/create")
	public ResponseEntity<?> create(
		@AuthenticationPrincipal CustomMemberDetails customMemberDetails,
		@RequestBody CookieCreateRequest cookieCreateRequest) {

		try {
			CookieResponse cookieResponse = cookieService.create(customMemberDetails.getMember(),
				cookieCreateRequest.cookieName(), cookieCreateRequest.eyeId(),
				cookieCreateRequest.mouthId());

			return BaseResponse.okWithData(HttpStatus.OK, "cookie create OK", cookieResponse);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return BaseResponse.okWithData(HttpStatus.OK, "cookie already EXIST!!!", null);
		}
	}

	@GetMapping("/getInfo")
	public ResponseEntity<?> getInfo(
		@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

		try {
			CookieResponse cookieResponse = cookieService.getInfo(customMemberDetails.getMember());

			return BaseResponse.okWithData(HttpStatus.OK, "cookie getInfo OK", cookieResponse);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return BaseResponse.ok(HttpStatus.BAD_REQUEST, "cookie create first!!");
		}

	}

	@GetMapping("/list")
	public ResponseEntity<?> cookieCollectionList(
		@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

		List<CookieCollectionResponse> cookieCollectionResponses = cookieService.cookieCollectionList(
			customMemberDetails.getMember());

		return BaseResponse.okWithData(HttpStatus.OK, "cookie list OK", cookieCollectionResponses);
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

	@PostMapping("/bake")
	public ResponseEntity<?> bake(
		@AuthenticationPrincipal CustomMemberDetails customMemberDetails,
		@RequestPart(value = "image") MultipartFile image) {

		cookieService.bake(image, customMemberDetails.getMember());

		return BaseResponse.ok(HttpStatus.OK, "cookie bake OK");
	}

	@GetMapping("/lastBody")
	public ResponseEntity<?> getLastBody() {
		LastBodyResponse lastBodyResponse = cookieService.getLastBody();

		return BaseResponse.okWithData(HttpStatus.OK, "last body OK", lastBodyResponse);
	}
}
