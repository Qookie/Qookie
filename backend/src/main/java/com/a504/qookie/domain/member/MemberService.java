package com.a504.qookie.domain.member;

import com.a504.qookie.domain.member.dto.LoginRequest;
import com.a504.qookie.domain.member.entity.Member;
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

}
