package com.a504.qookie.domain.member.service;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.domain.member.dto.MemberRequest;
import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.repository.MemberRepository;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CookieRepository cookieRepository;

    public Member findByUid(String uid) throws NoSuchElementException{
        return memberRepository.findByUid(uid).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public void createMember(LoginRequest loginRequest, Member member) {
        // check if loginRequest has valid uid
        if (loginRequest.getUid().equals(member.getUid())) {
            member.addInfo(loginRequest);
            memberRepository.save(member);
        }
    }

    public void setTime(Member member, String wakeTime) {

        member.setTime(LocalTime.parse(wakeTime));
        memberRepository.save(member);
    }

    public MemberResponse getInfo(Member member) {

        MemberResponse memberResponse = memberRepository.findMemberIfoById(member.getId());

        return memberResponse;
    }

    @Transactional
    public void modifyInfo(Long memberId, MemberRequest memberRequest) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("멤버가 없습니다"));

        member.setName(memberRequest.memberName());
        member.setTime(LocalTime.parse(memberRequest.wakeTime()));

        List<Cookie> cookies = cookieRepository.findAllByMemberAndActive(member, 1);

        if (!cookies.isEmpty()) {
            cookies.get(0).changeName(memberRequest.cookieName());
        }

    }
}
