package com.a504.qookie.domain.quest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a504.qookie.domain.quest.service.AwsS3Service;
import com.a504.qookie.domain.quest.service.QuestService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

	private final QuestService questService;
	private final AwsS3Service awsS3Service;

	// 기상 퀘스트 완료
	@PostMapping("/wake")
	public ResponseEntity<?> wakeupQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.wakeupQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "기상 퀘스트 완료");
	}

	// 식사 퀘스트 완료
	@PostMapping("/eat")
	public ResponseEntity<?> eatQuest(@AuthenticationPrincipal CustomMemberDetails member,
		@RequestPart MultipartFile image){
		String imageName = awsS3Service.uploadImageToS3(image);
		questService.eatQuest(member.getMember(), imageName);
		return BaseResponse.okWithData(HttpStatus.OK, "식사 퀘스트 완료", imageName);
	}

	// 산책 퀘스트 완료
	@PostMapping("/walk")
	public ResponseEntity<?> walkQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.walkQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "산책 퀘스트 완료");
	}

	// 스쿼트 퀘스트 완료
	@PostMapping("/squat")
	public ResponseEntity<?> squatQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.squatQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "스쿼트 퀘스트 완료");
	}

	// 친구와 약속 퀘스트 완료
	@PostMapping("/promise")
	public ResponseEntity<?> promiseQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.promiseQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "친구와 약속 퀘스트 완료");
	}

	// 하늘사진 찍기 퀘스트 완료
	@PostMapping("/photo")
	public ResponseEntity<?> photoQuest(@AuthenticationPrincipal CustomMemberDetails member,
		@RequestPart MultipartFile image){
		String imageName = awsS3Service.uploadImageToS3(image);
		questService.photoQuest(member.getMember(), imageName);
		return BaseResponse.okWithData(HttpStatus.OK, "식사 퀘스트 완료", imageName);
	}

	// 명상 퀘스트 완료
	@PostMapping("/meditation")
	public ResponseEntity<?> meditationQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.meditationQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "친구와 약속 퀘스트 완료");
	}

	// 물마시기 퀘스트 완료
	@PostMapping("/water")
	public ResponseEntity<?> waterQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.waterQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "친구와 약속 퀘스트 완료");
	}

}
