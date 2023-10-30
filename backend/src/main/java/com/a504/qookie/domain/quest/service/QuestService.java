package com.a504.qookie.domain.quest.service;

import org.springframework.stereotype.Service;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberQuest;
import com.a504.qookie.domain.member.repository.MemberQuestRepository;
import com.a504.qookie.domain.member.repository.MemberRepository;
import com.a504.qookie.domain.quest.repository.QuestRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestService {

	private final MemberQuestRepository memberQuestRepository;
	private final QuestRepository questRepository;
	private final MemberRepository memberRepository;
	private final CookieRepository cookieRepository;

	public void completeQuest(Member member, String questName){
		memberQuestRepository.save(
			MemberQuest.builder()
				.member(member)
				.quest(questRepository.findByName(questName)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 앟는 퀘스트 입니다.")))
				.build());
		pointUpdate(member, 10);
		updateExp(member);
	}

	public void completeQuest(Member member, String questName, String imageName){
		memberQuestRepository.save(
			MemberQuest.builder()
				.member(member)
				.quest(questRepository.findByName(questName)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
				.image(imageName)
				.build());
		pointUpdate(member, 10);
		updateExp(member);
	}

	public void pointUpdate(Member member, int point){
		member = memberRepository.findById(member.getId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		member.setPoint(point);
	}

	public void updateExp(Member member){
		Cookie cookie = cookieRepository.findByMember(member);
		int cur_level = cookie.getLevel();
		int cur_exp = cookie.getExp();
		if (cur_level < 5){ // 그냥 경험치 받을때마다 레벨업함
			if (cur_level + 1 == 5){ // 외형 바뀌는 레벨업
				/* TODO : 여기 알림 해주는 로직 */
			}
			cookie.updateLevel(); // 레벨업시키고
			cookie.updateExp(); // 경험치 초기화
		}else if (cur_level < 10){
			if (cur_exp == 10){ // 레벨업 시켜야함
				if (cur_level == 9) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			}else{
				// 경험치만 증가
				cookie.updateExp(10);
			}
		}else if (cur_level < 20){ // 업당 필요 경험치 : 20
			if (cur_exp == 10){ // 레벨업 시켜야함
				if (cur_level == 19) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			}else{
				// 경험치만 증가
				cookie.updateExp(10);
			}
		}else if (cur_level < 30){
			if (cur_exp == 20){
				if (cur_level == 29) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			}else{
				// 경험치만 증가
				cookie.updateExp(10);
			}
		}else if (cur_level < 40){
			if (cur_exp == 30){
				if (cur_level == 39) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			}else{
				// 경험치만 증가
				cookie.updateExp(10);
			}
		}else{
			if (cur_exp == 40){
				if (cur_level == 49) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			}else{
				// 경험치만 증가
				cookie.updateExp(10);
			}
		}
	}
}
