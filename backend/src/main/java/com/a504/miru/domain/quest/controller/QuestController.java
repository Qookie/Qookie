package com.a504.miru.domain.quest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a504.miru.domain.quest.service.QuestService;
import com.a504.miru.global.response.BaseResponse;
import com.a504.miru.global.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

	private final QuestService questService;

	// 기상 퀘스트 완료
	@PostMapping("/wake")
	public ResponseEntity<?> wakeupQuest(@AuthenticationPrincipal CustomMemberDetails member){
		questService.wakeupQuest(member.getMember());
		return BaseResponse.ok(HttpStatus.OK, "기상 퀘스트 완료");
	}


}
