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
	// 산책 퀘스트 완료
	@PostMapping("/walk")
	public ResponseEntity<?> squatQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.walkQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "스쿼트 퀘스트 완료");
	}
}
