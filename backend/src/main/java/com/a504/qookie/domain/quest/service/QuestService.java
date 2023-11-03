package com.a504.qookie.domain.quest.service;

import java.time.LocalDateTime;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.member.entity.History;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberQuest;
import com.a504.qookie.domain.member.repository.HistoryRepository;
import com.a504.qookie.domain.member.repository.MemberQuestRepository;
import com.a504.qookie.domain.member.repository.MemberRepository;
import com.a504.qookie.domain.quest.dto.QuestType;
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
	private final HistoryRepository historyRepository;
	private final RedisTemplate<String, String> template;

	public Boolean checkQuest(Member member, String questName) { // 오늘 날짜의 questName 퀘스트를 완료했는지
		LocalDateTime now = LocalDateTime.now();
		String key =
			member.getId() + ":" + now.getYear() + ":" + now.getMonth() + ":" + questName; // (유저PK):(년도):(이번달):(퀘스트이름)
		Long size = template.opsForSet().size(key);
		if (size == 0) return false;
		return template.opsForSet().isMember(key, now.getDayOfMonth() + "");
	}

	public void completeQuest(Member member, String questName) {
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 입니다."));
		memberQuestRepository.save(
			MemberQuest.builder()
				.member(member)
				.quest(questRepository.findByName(questName)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 앟는 퀘스트 입니다.")))
				.build());
		historyRepository.save(
			History.builder()
				.member(member)
				.message(questType.getMessage() + " 퀘스트 달성 보상")
				.cost(10)
				.build());
		pointUpdate(member, 10);
		updateExp(member);
		checkChallenge(member, questName);
	}

	public void completeQuest(Member member, String questName, String imageName) {
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 입니다."));
		memberQuestRepository.save(
			MemberQuest.builder()
				.member(member)
				.quest(questRepository.findByName(questName)
					.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 퀘스트입니다.")))
				.image(imageName)
				.build());
		historyRepository.save(
			History.builder()
				.member(member)
				.message(questType.getMessage() + " 퀘스트 달성 보상")
				.cost(10)
				.build());
		pointUpdate(member, 10);
		updateExp(member);
		checkChallenge(member, questName);
	}

	public void pointUpdate(Member member, int point) {
		member = memberRepository.findById(member.getId())
			.orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		member.setPoint(point);
	}

	public void updateExp(Member member) {
		Cookie cookie = cookieRepository.findByMember(member)
			.orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));
		int cur_level = cookie.getLevel();
		int cur_exp = cookie.getExp();
		if (cur_level < 5) { // 그냥 경험치 받을때마다 레벨업함
			if (cur_level + 1 == 5) { // 외형 바뀌는 레벨업
				/* TODO : 여기 알림 해주는 로직 */
			}
			cookie.updateLevel(); // 레벨업시키고
			cookie.updateExp(); // 경험치 초기화
		} else if (cur_level < 10) {
			if (cur_exp == 10) { // 레벨업 시켜야함
				if (cur_level == 9) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.updateExp(10);
			}
		} else if (cur_level < 20) { // 업당 필요 경험치 : 20
			if (cur_exp == 10) { // 레벨업 시켜야함
				if (cur_level == 19) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.updateExp(10);
			}
		} else if (cur_level < 30) {
			if (cur_exp == 20) {
				if (cur_level == 29) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.updateExp(10);
			}
		} else if (cur_level < 40) {
			if (cur_exp == 30) {
				if (cur_level == 39) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.updateExp(10);
			}
		} else {
			if (cur_exp == 40) {
				if (cur_level == 49) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.updateExp(10);
			}
		}
	}

	public void checkChallenge(Member member, String questName) {
		member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		String cur_month = LocalDateTime.now().getMonth().toString();
		int cur_year = LocalDateTime.now().getYear();
		int cur_day = LocalDateTime.now().getDayOfMonth();
		if (questName.equals("WAKE") || questName.equals("EAT") || questName.equals("WALK")) { // 기상, 식사, 산책은 월간도 있어서
			// 월간 챌린지 업데이트 및 알림 해주는 부분
			String monthly_challenge_key =
				member.getId() + ":" + cur_year + ":" + cur_month + ":" + questName; // (유저PK):(년도):(이번달):(퀘스트이름)
			template.opsForSet().add(monthly_challenge_key, cur_day + ""); // 날짜
			QuestType questType = QuestType.valueOf(questName.toUpperCase());
			if (questName.equals("WAKE") || questName.equals("EAT")) {
				if (template.opsForSet().size(monthly_challenge_key) == 15) {
					member.setPoint(100);
					historyRepository.save(
						History.builder()
							.member(member)
							.message(LocalDateTime.now().getMonthValue() + "월 " + questType.getMessage() + " 챌린지 달성 보상")
							.cost(100)
							.build());
					/* TODO : 알림 해주기 */
				}
			} else {
				if (template.opsForSet().size(monthly_challenge_key) == 10) {
					member.setPoint(100);
					historyRepository.save(
						History.builder()
							.member(member)
							.message(LocalDateTime.now().getMonthValue() + "월 " + questType.getMessage() + " 챌린지 달성 보상")
							.cost(100)
							.build());
					/* TODO : 알림 해주기 */
				}
			}
		}
		// 뱃지 챌린지 업데이트 및 알림해주는 기능
		String badge_challenge_key = member.getId()+ ":" + cur_year + ":" + cur_month +":"+ questName + ":badge"; // (유저PK):(퀘스트이름)
		// String badge_challenge_value = template.opsForValue().get(badge_challenge_key);
		template.opsForSet().add(badge_challenge_key, cur_day + "");
		if (questName.equals("PHOTO")) { // 하늘사진 찍기라면
			// 위에서 업데이트 했기 때문에 null이 될 수 없음이 보장됨
			Long size = template.opsForSet().size(badge_challenge_key);
			if (size == 5) {
				member.setPoint(30);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("뱃지 챌린지 달성 보상")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 10) {
				member.setPoint(50);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("뱃지 챌린지 달성 보상")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 15) {
				member.setPoint(100);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("뱃지 챌린지 달성 보상")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		} else {
			Long size = template.opsForSet().size(badge_challenge_key);
			if (size == 10) {
				member.setPoint(30);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("뱃지 챌린지 달성 보상")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 50) {
				member.setPoint(50);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("뱃지 챌린지 달성 보상")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 100) {
				member.setPoint(30);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("뱃지 챌린지 달성 보상")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		}
	}
}
