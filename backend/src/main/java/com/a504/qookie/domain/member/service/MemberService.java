package com.a504.qookie.domain.member.service;

import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.domain.member.dto.MemberResponse;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.repository.MemberRepository;
import java.time.LocalTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

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
}
