package com.a504.qookie.domain.heart.service;

import com.a504.qookie.domain.heart.dto.HeartListRequest;
import com.a504.qookie.domain.heart.dto.HeartRequest;
import com.a504.qookie.domain.heart.dto.HeartResponse;
import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.heart.repository.HeartRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.message.dto.MessageResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeartService {

    private final HeartRepository heartRepository;

    @Transactional
    public Heart create(Member member, HeartRequest heartRequest) {

        Heart heart = new Heart(member, heartRequest);

        return heartRepository.save(heart);
    }

    @Transactional
    public List<HeartResponse> list(HeartListRequest heartListRequest, Member member) {

        return  heartRepository.findHeartByMonthAndMember(heartListRequest.time(), member);

    }
}