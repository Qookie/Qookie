package com.a504.qookie.domain.quest.service;

import com.a504.qookie.domain.badge.entity.Badge;
import com.a504.qookie.domain.badge.repository.BadgeRepository;
import com.a504.qookie.domain.cookie.entity.Body;
import com.a504.qookie.domain.cookie.repository.BodyRepository;
import com.a504.qookie.domain.member.entity.MemberBadge;
import com.a504.qookie.domain.member.repository.MemberBadgeRepository;
import com.a504.qookie.domain.quest.dto.AttendanceCalendarResponse;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
import com.a504.qookie.domain.quest.dto.ChallengeRequest;
import com.a504.qookie.domain.quest.dto.ChallengeStatus;
import com.a504.qookie.domain.quest.dto.ChallengeStatusList;
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
	private final BodyRepository bodyRepository;
	private final MemberBadgeRepository memberBadgeRepository;
	private final BadgeRepository badgeRepository;

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
											() -> new IllegalArgumentException("존재하지 않는 퀘스트 입니다.")))
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
			updateLevel(cookie); // 레벨업시키고
			cookie.updateExp(0); // 경험치 초기화
		} else if (cur_level < 10) {
			if (cur_exp + 10 >= 12) { // 레벨업 시켜야함
				if (cur_level == 9) {
					/* TODO : 여기 알림 해주는 로직 */
				}
				updateLevel(cookie); // 레벨업시키고
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
				updateLevel(cookie); // 레벨업시키고
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
				updateLevel(cookie); // 레벨업시키고
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
				updateLevel(cookie); // 레벨업시키고
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
				updateLevel(cookie); // 레벨업시키고
				cookie.updateExp(0); // 경험치 초기화
			} else {
				// 경험치만 증가
				cookie.plusExp(10);
			}
		}
	}

	public void updateLevel(Cookie cookie) {

		cookie.updateLevel();

		int cur_level = cookie.getLevel();
		Body body = null;

		switch (cur_level) {
			case 5:
				body = bodyRepository.findByStage(2)
						.orElseThrow(() -> new IllegalArgumentException("맞는 몸이 없습니다"));
				break;
			case 10:
				body = bodyRepository.findByStage(3)
						.orElseThrow(() -> new IllegalArgumentException("맞는 몸이 없습니다"));
				break;
			case 20:
				body = bodyRepository.findByStage(4)
						.orElseThrow(() -> new IllegalArgumentException("맞는 몸이 없습니다"));
				break;
			case 30:
				body = bodyRepository.findByStage(5)
						.orElseThrow(() -> new IllegalArgumentException("맞는 몸이 없습니다"));
				break;
			case 40:
				body = bodyRepository.findByStage(6)
						.orElseThrow(() -> new IllegalArgumentException("맞는 몸이 없습니다"));
				break;
		}

		if (body != null) {
			cookie.changeBody(body);
			cookieRepository.save(cookie);
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
		String badgeCnt = template.opsForValue().get(badge_challenge_key);
		if (badgeCnt == null){
			template.opsForValue().set(badge_challenge_key, "1");
		}else{
			template.opsForValue().set(badge_challenge_key, Long.parseLong(badgeCnt) + 1L + "");
		}
		Long size = Long.parseLong(template.opsForValue().get(badge_challenge_key));
		if (questName.equals("PHOTO")) { // 하늘사진 찍기라면
			// 위에서 업데이트 했기 때문에 null이 될 수 없음이 보장됨
			if (size == 5) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("1단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 10) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("2단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 15) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("3단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		} else if (questName.equals("SQUAT") || questName.equals("EAT") || questName.equals("WAKE") || questName.equals("MEDITATION") || questName.equals("ATTENDANCE")) {
			if (size == 10) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("1단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 50) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("2단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 100) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("3단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		}else if(questName.equals("BUT_NEW")){
			if (size == 3) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("1단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(30)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 5) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("2단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(50)
						.build());
				/* TODO : 알림 해주기 */
			}
			if (size == 10) {
				historyRepository.save(
					History.builder()
						.member(member)
						.message("3단계 " + questType.getMessage() +" 퀘스트 뱃지 챌린지 달성 보상 을 받아보세요")
						.cost(100)
						.build());
				/* TODO : 알림 해주기 */
			}
		}

	}

	public AttendanceCalendarResponse getAttendanceInfo(Member member,
			String year, String month) {
		String checkAttendanceKey = member.getId() + ":" + year + ":" + month + ":" + "ATTENDANCE";
		Boolean todayComplete = template.opsForSet().isMember(checkAttendanceKey, LocalDateTime.now().getDayOfMonth() + "");
		List<Integer> list = template.opsForSet().members(checkAttendanceKey).stream().map(Integer::valueOf).toList();
		return new AttendanceCalendarResponse(todayComplete, list);
	}

	public ChallengeStatusList getChallengeStatus(Member member){
		List<ChallengeStatus> monthlist = new ArrayList<>();
		List<ChallengeStatus> badgelist = new ArrayList<>();
		LocalDateTime now = LocalDateTime.now();
		int year = now.getYear();
		int month = now.getMonthValue();
		// 월간 챌린지
		checkMonthlyChallenge("WAKE", member, year, month, monthlist, "규칙적인 기상", 15);
		checkMonthlyChallenge("EAT", member, year, month, monthlist, "규칙적인 식사", 15);
		checkMonthlyChallenge("WALK", member, year, month, monthlist, "만보기", 10);
		//한국인의 밥 상 10 - 50 - 100
		checkBadgeChallenge(19L, member, badgelist, "한국인의 밥 상", 10, 50, 100, "EAT");
		//시간맞춰 기 상 10 - 50- 100
		checkBadgeChallenge(16L, member, badgelist, "시간맞춰 기 상", 10, 50, 100, "WAKE");
		// 나 쿠키를 항 상
		checkBadgeChallenge(1L, member, badgelist, "나 쿠키를 항 상", 10, 50, 100, "ATTENDANCE");
		// 반가사유 상 10 - 50 - 100
		checkBadgeChallenge(7L, member, badgelist, " 반가사유 상", 10, 50, 100, "MEDITATION");
		// 사진 속 세 상 5 - 10 - 15
		checkBadgeChallenge(10L, member, badgelist, "사진속 세 상", 5, 10, 15, "PHOTO");
		// 내 사랑 신 상 3 - 5 - 10
		checkBadgeChallenge(4L, member, badgelist, "내 사랑 신 상", 3, 5, 10, "BUY_NEW");
		// 스쿼트 실력 향 상 3 - 5 - 10
		checkBadgeChallenge(13L, member, badgelist, "스쿼트 실력 향 상", 10, 50, 100, "SQUAT");
		return new ChallengeStatusList(monthlist, badgelist);
	}

	void checkBadgeChallenge(Long badgeId, Member member, List<ChallengeStatus> list, String sentence, int targetCnt1, int targetCnt2, int targetCnt3 , String questName){
		Long memberId = member.getId();
		String badgeKey = getBadgeChallengeKey(memberId, questName);
		String tmp = template.opsForValue().get(badgeKey);
		Long cnt = tmp == null ? 0 : Long.parseLong(tmp);
		int flag = 0;
		for (int i = 0 ; i < 3; i++){  // 뱃지 아이디는 연속적으로 있으니까.
			badgeId += i;
			String key = badgeId + ":badge";
			if (!template.opsForSet().isMember(key, memberId + "")) {  // 이번 뱃지 획득못함
				flag = 1;
				if (i == 0){
					list.add(new ChallengeStatus(30, sentence, cnt, targetCnt1, questName, "incomplete", badgeId));
				}else if (i == 1){
					list.add(new ChallengeStatus(50, sentence, cnt, targetCnt2, questName, "incomplete", badgeId));
				}else{
					list.add(new ChallengeStatus(100, sentence, cnt, targetCnt3, questName, "incomplete", badgeId));
				}
				break;
			}
		}
		// 마지막 뱃지까지 획득한 상태
		if (flag == 0) list.add(new ChallengeStatus(100, sentence, cnt, targetCnt3, questName, "complete", badgeId));
	}

	void checkMonthlyChallenge(String questName, Member member, int year, int month, List<ChallengeStatus> list, String sentence, int targetCnt){
		String key = getMonthChallengeKey(member.getId(), year, month, questName);
		Long cnt = getCount(key);
		String monthlyChallengeKey =  questName + ":" + year + ":" + month;
		// key가 있다 == 완료한 챌린지
		if(template.opsForSet().isMember(monthlyChallengeKey, member.getId() + "")){
			list.add(new ChallengeStatus(100, sentence, cnt, targetCnt, questName, "complete", 0L));
		}else{ // key가 없다.
			list.add(new ChallengeStatus(100, sentence, cnt, targetCnt, questName, "incomplete", 0L));
		}
	}

	Long getCount(String key){
		return template.opsForSet().size(key);
	}

	String getMonthChallengeKey(Long id, int year, int month, String questName){
		return id + ":" + year + ":" + month + ":" + questName;
	}

	String getBadgeChallengeKey(Long id, String questName){
		return id + ":" + questName + ":badge";
	}

	public void completeChallenge(Member member, ChallengeRequest request){
		// Member coin 업데이트 때리고
		member.setPoint(request.coin());
		memberRepository.save(member);
		// Redis에 넣기
		if (request.badgeId() != 0L) {
			String key = request.badgeId() + ":" + request.questName() +":"+ ((request.badgeId() - 1L) % 3 + 1) +":badge";
			template.opsForSet().add(key, member.getId() + "");

			Badge badge = badgeRepository.findById(request.badgeId())
					.orElseThrow(() -> new IllegalArgumentException("뱃지가 없습니다"));

			memberBadgeRepository.save(new MemberBadge(member, badge));
		}else{
			LocalDateTime now = LocalDateTime.now();
			int year = now.getYear();
			int month = now.getDayOfMonth();
			String monthlyChallengeKey =  request.questName() + ":" + year + ":" + month;
			template.opsForSet().add(monthlyChallengeKey, member.getId() + "");
		}
	}
}
