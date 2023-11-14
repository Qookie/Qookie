package com.a504.qookie.domain.member.service;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.member.dto.HistoryResponse;
import com.a504.qookie.domain.member.dto.HistoryResponseList;
import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.domain.member.dto.MemberRequest;
import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.dto.QuestStatus;
import com.a504.qookie.domain.member.entity.History;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberQuest;
import com.a504.qookie.domain.member.repository.HistoryRepository;
import com.a504.qookie.domain.member.repository.MemberQuestRepository;
import com.a504.qookie.domain.member.repository.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberRepository memberRepository;
	private final CookieRepository cookieRepository;
	private final HistoryRepository historyRepository;
	private final MemberQuestRepository memberQuestRepository;

	public Member findByUid(String uid) throws NoSuchElementException {
		return memberRepository.findByUid(uid).orElseThrow(NoSuchElementException::new);
	}

	public Member createMember(LoginRequest loginRequest, Member member) {
		// check if member is new & loginRequest has valid uid
		if (member.getId() == null && loginRequest.getUid().equals(member.getUid())) {
			member.addInfo(loginRequest);
		} else {
			// if not new member, just update message token
			member.updateMessageToken(loginRequest.getMessageToken());
		}
		return memberRepository.save(member);
	}

	public void setTime(Member member, String wakeTime) {

		member.setTime(LocalTime.parse(wakeTime));
		memberRepository.save(member);
	}

	public MemberResponse getInfo(Member member) {

		Optional<Cookie> cookie = cookieRepository.findByMember(member);

		String cookieName = null;
		if (cookie.isPresent()) {
			cookieName = cookie.get().getName();
		}

		return new MemberResponse(member.getName(), member.getWakeUp(), cookieName);
	}

	@Transactional
	public void modifyInfo(Long memberId, MemberRequest memberRequest) {

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new IllegalArgumentException("멤버가 없습니다"));

		member.setName(memberRequest.memberName());
		member.setTime(LocalTime.parse(memberRequest.wakeTime()));

		Optional<Cookie> cookie = cookieRepository.findByMember(member);

		if (cookie.isPresent()) {
			cookie.get().changeName(memberRequest.cookieName());
		}
	}

	@Transactional
	public void delete(String uid) throws IllegalArgumentException, NoSuchAlgorithmException {
		memberRepository.findByUid(uid)
			.orElseThrow(() -> new IllegalArgumentException("멤버가 없습니다"))
			.deleteMember();
	}

	public HistoryResponseList getHistory(Member member, int year, Month month) {
		int totalPoint = member.getPoint();
		LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
		LocalDateTime end;
		if (year % 4 == 0 && year%100 != 0 || year%400 == 0){
			if (month.getValue() == 2){
				end = LocalDateTime.of(year, month, 29, 23, 59, 59);
			}else{
				end = LocalDateTime.of(year, month, 28, 23, 59, 59);
			}
		}else{
			end = LocalDateTime.of(year, month, month.maxLength(), 23, 59, 59);
		}

		List<History> historyList = historyRepository.findAllByCreatedAtBetweenAndMemberOrderByCreatedAtDesc(start, end, member);
		List<HistoryResponse> list = new ArrayList<>();
		for (History history : historyList) {
			list.add(new HistoryResponse(history.getMessage(), history.getCost(), history.getCreatedAt()));
		}
		return new HistoryResponseList(totalPoint, list);
	}

	public Map<Integer, QuestStatus[]> getCalender(Member member, int year, Month month) {
		// 2, 6만 사진 담음
		// 키 == 날짜, value == 완료여부
		Map<Integer, QuestStatus[]> monthQuestList = new HashMap<>();
		LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
		LocalDateTime end = LocalDateTime.of(year, month, month.maxLength(), 23, 59, 59);
		List<MemberQuest> questList = memberQuestRepository.findAllByCreatedAtBetweenAndMember(start, end, member);
		for (MemberQuest quest : questList) {
			int day = quest.getCreatedAt().getDayOfMonth();
			Long qId = quest.getQuest().getId();
			if (!monthQuestList.containsKey(day)) { // 키가 없는 경우
				QuestStatus[] status = new QuestStatus[10];
				if (qId.equals(2L) || qId.equals(6L)) { // 사진 쓰는거
					status[qId.intValue()] = new QuestStatus(true, quest.getImage());
					monthQuestList.put(day, status);
				} else {
					status[qId.intValue()] = new QuestStatus(true, null);
					monthQuestList.put(day, status);
				}
			} else {
				QuestStatus[] status = monthQuestList.get(day);
				if (qId.equals(2L) || qId.equals(6L)) { // 사진 쓰는거
					status[qId.intValue()] = new QuestStatus(true, quest.getImage());
				} else {
					status[qId.intValue()] = new QuestStatus(true, null);
				}
			}
		}
		return monthQuestList;
	}
}
