package com.a504.qookie.domain.quest.service;

import java.time.LocalDateTime;

import org.springframework.data.redis.core.RedisTemplate;
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
	private final RedisTemplate<String, String> template;

	public void completeQuest(Member member, String questName){
		memberQuestRepository.save(
			MemberQuest.builder()
				.member(member)
				.quest(questRepository.findByName(questName)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 앟는 퀘스트 입니다.")))
				.build());
		pointUpdate(member, 10);
		updateExp(member);
		checkChallenge(member, questName);
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
		checkChallenge(member, questName);
	}

	public void pointUpdate(Member member, int point){
		member = memberRepository.findById(member.getId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		member.setPoint(point);
	}

	public void updateExp(Member member){
		Cookie cookie = cookieRepository.findByMember(member)
				.orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));
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

	public void checkChallenge(Member member, String questName){
		if (questName.equals("WAKE") || questName.equals("EAT") || questName.equals("WALK")){ // 기상, 식사, 산책은 월간도 있어서
			// 월간 챌린지 업데이트 및 알림 해주는 부분
			 String cur_month = LocalDateTime.now().getMonth().toString();
			 String monthly_challenge_key = member.getId() + ":" + cur_month + ":" +questName; // (유저PK):(이번달):(퀘스트이름)
			 String monthly_challenge_value = template.opsForValue().get(monthly_challenge_key); // 클리어 횟수
			 if (monthly_challenge_value == null){
				template.opsForValue().set(monthly_challenge_key, "1");
			 }else{
				template.opsForValue().set(monthly_challenge_key, Long.parseLong(monthly_challenge_value) + 1L + "");
			 }
			 if (questName.equals("WAKE") || questName.equals("EAT")){
				 if (Long.parseLong(template.opsForValue().get(monthly_challenge_key)) == 15){
					 /* TODO : 알림 해주기 */
				 }
			 }else{
				 if (Long.parseLong(template.opsForValue().get(monthly_challenge_key)) == 10){
					 /* TODO : 알림 해주기 */
				 }
			 }
		}

		// 뱃지 챌린지 업데이트 및 알림해주는 기능
		String badge_challenge_key = member.getId() + ":" + questName; // (유저PK):(퀘스트이름)
		String badge_challenge_value = template.opsForValue().get(badge_challenge_key);
		if (badge_challenge_value == null){
			template.opsForValue().set(badge_challenge_key, "1");
		}else{
			template.opsForValue().set(badge_challenge_key, Long.parseLong(badge_challenge_value) + 1L + "");
		}

		if (questName.equals("PHOTO")){ // 하늘사진 찍기라면
			// 위에서 업데이트 했기 때문에 null이 될 수 없음이 보장됨
			Long cnt = Long.parseLong(template.opsForValue().get(badge_challenge_key));
			if (cnt == 5){
				/* TODO : 알림 해주기 */
			}
			if (cnt == 10){
				/* TODO : 알림 해주기 */
			}
			if (cnt == 15){
				/* TODO : 알림 해주기 */
			}
		}else{
			Long cnt = Long.parseLong(template.opsForValue().get(badge_challenge_key));
			if (cnt == 10){
				/* TODO : 알림 해주기 */
			}
			if (cnt == 50){
				/* TODO : 알림 해주기 */
			}
			if (cnt == 100){
				/* TODO : 알림 해주기 */
			}
		}

	}
}
