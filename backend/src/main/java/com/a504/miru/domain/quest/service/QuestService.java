package com.a504.miru.domain.quest.service;

import org.springframework.stereotype.Service;

import com.a504.miru.domain.member.entity.Member;
import com.a504.miru.domain.member.entity.MemberQuest;
import com.a504.miru.domain.member.repository.MemberQuestRepository;
import com.a504.miru.domain.quest.repository.QuestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestService {

	private final MemberQuestRepository memberQuestRepository;
	private final QuestRepository questRepository;

	public void wakeupQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(1L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}
}
