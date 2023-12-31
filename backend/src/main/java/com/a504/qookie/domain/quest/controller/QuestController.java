package com.a504.qookie.domain.quest.controller;


import com.a504.qookie.domain.geo.GeoRequest;
import com.a504.qookie.domain.geo.GeolocationService;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.quest.dto.AttendanceCalendarResponse;
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

import com.a504.qookie.domain.quest.dto.AttendanceCalendarResponse;
import com.a504.qookie.domain.quest.dto.ChallengeRequest;
import com.a504.qookie.domain.quest.dto.QuestType;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import com.a504.qookie.domain.quest.service.QuestService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

	private final QuestService questService;
	private final AwsS3Service awsS3Service;
	private final GeolocationService geolocationService;

	@GetMapping("/{questName}")
	public ResponseEntity<?> checkQuest(@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable String questName) {
		return BaseResponse.okWithData(HttpStatus.OK, "쿼스트 완료 여부 확인",
			questService.checkQuest(member.getMember(), questName.toUpperCase()));
	}

	// 사진 안쓰는 퀘스트
	@PostMapping("/{questName}")
	public ResponseEntity<?> completeQuest(@AuthenticationPrincipal CustomMemberDetails member
		, @PathVariable String questName){
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		if (!questService.completeQuest(member.getMember(), questName.toUpperCase())){
			return BaseResponse.okWithData(HttpStatus.OK, questType.getMessage() + " 퀘스트를 완료할 수 없습니다.", false);
		}
		return BaseResponse.okWithData(HttpStatus.OK, questType.getMessage() + " 퀘스트 완료", true);
	}

	// 사진 쓰는 퀘스트
	@PostMapping("/photo/{questName}")
	public ResponseEntity<?> completeQuest(@AuthenticationPrincipal CustomMemberDetails member
		, @PathVariable String questName
		, @RequestPart MultipartFile image) {
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		String imageName = awsS3Service.uploadImageToS3(image);
		questService.completeQuest(member.getMember(), questName.toUpperCase(), imageName);
		return BaseResponse.okWithData(HttpStatus.OK, questType.getMessage() + " 퀘스트 완료", imageName);
	}

	@GetMapping("/calendar/attendance/{year}/{month}")
	public ResponseEntity<?> getAttendanceInfo(
		@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable String year,
		@PathVariable String month) {
		AttendanceCalendarResponse attendanceCalendarResponse = questService.getAttendanceInfo(member.getMember(), year,
			month);
		return BaseResponse.okWithData(HttpStatus.OK, "Attendance Calendar OK", attendanceCalendarResponse);
	}

	@GetMapping("/challenge")
	public ResponseEntity<?> getChallengeStatus(
		@AuthenticationPrincipal CustomMemberDetails member
	) {
		return BaseResponse.okWithData(HttpStatus.OK, "챌린지 현황 조회 완료",
			questService.getChallengeStatus(member.getMember()));
	}

	@PostMapping("/challenge")
	public ResponseEntity<?> completeChallenge(
		@AuthenticationPrincipal CustomMemberDetails member,
		@RequestBody ChallengeRequest request
	) {
		questService.completeChallenge(member.getMember(), request);
		return BaseResponse.ok(HttpStatus.OK, "챌린지 완료하기 성공");
	}
}
