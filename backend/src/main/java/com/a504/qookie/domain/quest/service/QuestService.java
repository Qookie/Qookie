package com.a504.qookie.domain.quest.service;

import org.springframework.stereotype.Service;

import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberQuest;
import com.a504.qookie.domain.member.repository.MemberQuestRepository;
import com.a504.qookie.domain.quest.repository.QuestRepository;

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

	public void eatQuest(Member member, String imageName){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(2L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.image(imageName)
			.build());
	}

	public void walkQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(3L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}
	public void squatQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(4L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}

	public void promiseQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(5L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}
	public void photoQuest(Member member, String imageName){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(6L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.image(imageName)
			.build());
	}

	public void meditationQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(7L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}

	public void waterQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(8L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}

	public void stretchQuest(Member member){
		memberQuestRepository.save(MemberQuest.builder()
			.member(member)
			.quest(questRepository.findById(9L)
				.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
			.build());
	}

}
