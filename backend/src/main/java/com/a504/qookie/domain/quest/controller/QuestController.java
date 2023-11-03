package com.a504.qookie.domain.quest.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a504.qookie.domain.quest.dto.QuestType;
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

	// 완료 했는지 안했는지만
	@GetMapping("/{questName}")
	public ResponseEntity<?> checkQuest(@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable String questName){
		return BaseResponse.okWithData(HttpStatus.OK, "쿼스트 완료 여부 확인", questService.checkQuest(member.getMember(), questName.toUpperCase()));
	}



	// 사진 안쓰는 퀘스트
	@PostMapping("/{questName}")
	public ResponseEntity<?> completeQuest(@AuthenticationPrincipal CustomMemberDetails member
		, @PathVariable String questName){
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		questService.completeQuest(member.getMember(), questName.toUpperCase());
		return BaseResponse.ok(HttpStatus.OK, questType.getMessage() + " 퀘스트 완료");
	}

	// 사진 쓰는 퀘스트
	@PostMapping("/photo/{questName}")
	public ResponseEntity<?> completeQuest(@AuthenticationPrincipal CustomMemberDetails member
		, @PathVariable String questName
		, @RequestPart MultipartFile image){
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		String imageName = awsS3Service.uploadImageToS3(image);
		questService.completeQuest(member.getMember(), questName.toUpperCase(), imageName);
		return BaseResponse.okWithData(HttpStatus.OK, questType.getMessage() + " 퀘스트 완료", imageName);
	}

	// 월별 완료퀘스트 캘린더
	@GetMapping("/monthly/{year}/{month}")
	public ResponseEntity<?> getMonthlyQuest(@AuthenticationPrincipal CustomMemberDetails member,
		@PathVariable Integer year,
		@PathVariable Integer month){
		return null;
	}
}
