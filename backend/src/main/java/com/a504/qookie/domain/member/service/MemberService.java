package com.a504.qookie.domain.member.service;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.member.dto.HistoryResponse;
import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.domain.member.dto.MemberRequest;
import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.entity.History;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.repository.HistoryRepository;
import com.a504.qookie.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CookieRepository cookieRepository;
    private final HistoryRepository historyRepository;

    public Member findByUid(String uid) throws NoSuchElementException{
        return memberRepository.findByUid(uid).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public Member createMember(LoginRequest loginRequest, Member member) {
        // check if member is new & loginRequest has valid uid
        if (member.getId() == null && loginRequest.getUid().equals(member.getUid())) {
            member.addInfo(loginRequest);
            return memberRepository.save(member);
        } else {
            // if not new member, just update message token
            return member.updateMessageToken(loginRequest.getMessageToken());
        }
    }

    public void setTime(Member member, String wakeTime) {

        member.setTime(LocalTime.parse(wakeTime));
        memberRepository.save(member);
    }

    public MemberResponse getInfo(Member member) {

        return memberRepository.findMemberInfoById(member.getId());
    }

    @Transactional
    public void modifyInfo(Long memberId, MemberRequest memberRequest) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("멤버가 없습니다"));

        member.setName(memberRequest.memberName());
        member.setTime(LocalTime.parse(memberRequest.wakeTime()));

        Cookie cookie = cookieRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));

        cookie.changeName(memberRequest.cookieName());

    }

    @Transactional
    public void delete(String uid) throws IllegalArgumentException, NoSuchAlgorithmException {
        memberRepository.findByUid(uid)
                .orElseThrow(() -> new IllegalArgumentException("멤버가 없습니다"))
                .deleteMember();
    }

    public List<HistoryResponse> getHistory(Member member, int year, Month month){
        int totalPoint = member.getPoint();
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(year, month, month.maxLength(), 23, 59, 59);
        List<History> historyList = historyRepository.findAllByCreatedAtBetweenOrderByCreatedAtDesc(start, end);
        List<HistoryResponse> list = new ArrayList<>();
        for (History history: historyList){
            list.add(new HistoryResponse(totalPoint, history.getMessage(), history.getCost(), history.getCreatedAt()));
        }
        return list;
    }
}
