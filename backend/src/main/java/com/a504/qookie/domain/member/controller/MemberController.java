package com.a504.qookie.domain.member.controller;

import java.security.NoSuchAlgorithmException;
import java.time.Month;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.domain.member.dto.LoginResponse;
import com.a504.qookie.domain.member.dto.MemberRequest;
import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.dto.WakeTimeRequest;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.service.MemberService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;

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

	@GetMapping("/history/{year}/{month}")
	public ResponseEntity<?> getCoinList(
		@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable
			Integer year,
		@PathVariable
			Integer month) {
		return BaseResponse.okWithData(HttpStatus.OK,
			"코인 사용 히스토리 갖고오기 완료",
			memberService.getHistory(member.getMember(), year, Month.of(month)));
	}

	@GetMapping("/calender/{year}/{month}")
	public ResponseEntity<?> getCalender(
		@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable Integer year,
		@PathVariable Integer month
	) {
		return BaseResponse.okWithData(HttpStatus.OK, "월간 퀘스트 목록 불러오기 완료",
			memberService.getCalender(member.getMember(), year, Month.of(month)));
	}
}
