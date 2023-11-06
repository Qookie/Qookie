package com.a504.qookie.domain.quest.service;

import com.a504.qookie.domain.quest.dto.AttendanceCalendarResponse;
import com.a504.qookie.domain.quest.dto.CalenderRequest;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
import com.a504.qookie.domain.quest.dto.CheckQuestResponse;
// import com.a504.qookie.domain.quest.dto.QuestStatus;
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

	public CheckQuestResponse checkQuest(Member member, String questName) { // 오늘 날짜의 questName 퀘스트를 완료했는지
		LocalDateTime now = LocalDateTime.now();
		LocalDateTime start = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 0, 0);
		LocalDateTime end = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 23, 59, 59);
		QuestType questType = QuestType.valueOf(questName);
		Long idx = questType.getIdx();
		List<MemberQuest> list = memberQuestRepository.findAllByCreatedAtBetween(start, end);
		System.out.println(" = " + idx);
		System.out.println("questName = " + questName);

		for (MemberQuest memberQuest : list){
			if (Objects.equals(memberQuest.getQuest().getId(), idx) && Objects.equals(memberQuest.getMember().getId(),
				member.getId())){
				System.out.println("memberQuest = " + memberQuest);
				if (questName.equals("EAT") || questName.equals("PHOTO")) return new CheckQuestResponse(true, memberQuest.getImage());
				return new CheckQuestResponse(true, null);
			}
		}
		return new CheckQuestResponse(false, null);
	}

	public void completeQuest(Member member, String questName) {
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자 입니다."));
		if (!questName.equals("ATTENDANCE")) { // 출석체크는 멤버퀘스트나 히스토리에 저장하면 안됨
			memberQuestRepository.save(
					MemberQuest.builder()
							.member(member)
							.quest(questRepository.findByName(questName)
									.orElseThrow(
											() -> new IllegalArgumentException("존재하지 앟는 퀘스트 입니다.")))
							.build());
			historyRepository.save(
					History.builder()
							.member(member)
							.message(questType.getMessage() + " 퀘스트 달성 보상")
							.cost(10)
							.build());
		}
		pointUpdate(member, 10);
		updateExp(member);
		if (questName.equals("ATTENDANCE")) {
			checkAttendance(member);
		}
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

	public void checkAttendance(Member member) {
		int cur_month = LocalDateTime.now().getMonth().getValue();
		int cur_year = LocalDateTime.now().getYear();
		int cur_day = LocalDateTime.now().getDayOfMonth();
		String checkAttendanceKey =
				member.getId() + ":" + cur_year + ":" + cur_month + ":" + "ATTENDANCE"; // (유저PK):(년도):(이번달):(ATTENDANCE)
		template.opsForSet().add(checkAttendanceKey, cur_day + "");
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
			cookie.updateExp(0); // 경험치 초기화
		} else if (cur_level < 10) {
			if (cur_exp + 10 >= 12) { // 레벨업 시켜야함
				if (cur_level == 9) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(cur_exp + 10 - 12); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.plusExp(10);
			}
		} else if (cur_level < 20) { // 업당 필요 경험치 : 20
			if (cur_exp == 10) { // 레벨업 시켜야함
				if (cur_level == 19) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(0); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.plusExp(10);
			}
		} else if (cur_level < 30) {
			if (cur_exp == 20) {
				if (cur_level == 29) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(0); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.plusExp(10);
			}
		} else if (cur_level < 40) {
			if (cur_exp == 30) {
				if (cur_level == 39) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(0); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.plusExp(10);
			}
		} else {
			if (cur_exp == 40) {
				if (cur_level == 49) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				cookie.updateLevel(); // 레벨업시키고
				cookie.updateExp(0); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.plusExp(10);
			}
		}
	}

	public void checkChallenge(Member member, String questName) {
		member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
		int cur_month = LocalDateTime.now().getMonth().getValue();
		int cur_year = LocalDateTime.now().getYear();
		int cur_day = LocalDateTime.now().getDayOfMonth();
		QuestType questType = QuestType.valueOf(questName.toUpperCase());
		if (questName.equals("WAKE") || questName.equals("EAT") || questName.equals("WALK")) { // 기상, 식사, 산책은 월간도 있어서
			// 월간 챌린지 업데이트 및 알림 해주는 부분
			String monthly_challenge_key =
				member.getId() + ":" + cur_year + ":" + cur_month + ":" + questName; // (유저PK):(년도):(이번달):(퀘스트이름)
			template.opsForSet().add(monthly_challenge_key, cur_day + ""); // 날짜
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
		String badge_challenge_key = member.getId() +":"+ questName + ":badge"; // (유저PK):(퀘스트이름)
		template.opsForSet().add(badge_challenge_key, cur_day + "");
		if (questName.equals("PHOTO")) { // 하늘사진 찍기라면
			// 위에서 업데이트 했기 때문에 null이 될 수 없음이 보장됨
			Long size = template.opsForSet().size(badge_challenge_key);
			if (size == 5) {
				member.setPoint(30);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("1단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 10) {
				member.setPoint(50);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("2단계 " + questType.getMessage() +" 뱃지 챌린지 달성 보상")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 15) {
				member.setPoint(100);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("3단계 " + questType.getMessage() +" 뱃지 챌린지 달성 보상")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		} else if (questName.equals("SQUAT") || questName.equals("EAT") || questName.equals("WAKE") || questName.equals("MEDITATION")) {
			Long size = template.opsForSet().size(badge_challenge_key);
			if (size == 10) {
				member.setPoint(30);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("1단계 " + questType.getMessage() +" 뱃지 챌린지 달성 보상")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 50) {
				member.setPoint(50);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("2단계 " + questType.getMessage() +" 뱃지 챌린지 달성 보상")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 100) {
				member.setPoint(100);
				historyRepository.save(
					History.builder()
						.member(member)
						.message("3단계 " + questType.getMessage() +" 뱃지 챌린지 달성 보상")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		}

	}

	public AttendanceCalendarResponse getAttendanceInfo(Member member, CalenderRequest calenderRequest) {
		String checkAttendanceKey = member.getId() + ":" + calenderRequest.year() + ":" + calenderRequest.month() + ":" + "ATTENDANCE";
		Boolean todayComplete = template.opsForSet().isMember(checkAttendanceKey, LocalDateTime.now().getDayOfMonth() + "");
		List<Integer> list = template.opsForSet().members(checkAttendanceKey).stream().map(Integer::valueOf).toList();
		return new AttendanceCalendarResponse(todayComplete, list);
	}

	// public Map<Integer, QuestStatus> getMonthlyQuest(Member member, Integer year, Month month){
	// 	Map<Integer, QuestStatus> map = new HashMap<>();
	// 	LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
	// 	LocalDateTime end = LocalDateTime.of(year, month, month.maxLength(),23, 59, 59);
	// 	List<MemberQuest> list = memberQuestRepository.findAllByCreatedAtBetween(start, end);
	// 	for (MemberQuest memberQuest: list){
	// 		if (Objects.equals(memberQuest.getMember().getId(), member.getId())){
	//
	// 		}
	// 	}
	//
	// 	return map;
	// }
}
