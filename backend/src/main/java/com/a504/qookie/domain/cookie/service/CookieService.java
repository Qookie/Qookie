package com.a504.qookie.domain.cookie.service;

import com.a504.qookie.domain.cookie.dto.CookieResponse;
import com.a504.qookie.domain.cookie.entity.Body;
import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.entity.Eye;
import com.a504.qookie.domain.cookie.entity.Mouth;
import com.a504.qookie.domain.cookie.repository.BodyRepository;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.cookie.repository.EyeRepository;
import com.a504.qookie.domain.cookie.repository.MouthRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CookieService {

    private final CookieRepository cookieRepository;
    private final BodyRepository bodyRepository;
    private final EyeRepository eyeRepository;
    private final MouthRepository mouthRepository;
    private final AwsS3Service awsS3Service;

    public Cookie create(Member member, String cookieName, Long eyeId, Long mouthId) {

        Body body = bodyRepository.findByStage(1)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 몸이 없습니다"));

        Eye eye = eyeRepository.findById(eyeId)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 눈이 없습니다"));

        Mouth mouth = mouthRepository.findById(mouthId)
                        .orElseThrow(() -> new IllegalArgumentException("일치하는 입이 없습니다"));

        Cookie cookie = Cookie.createCookie(member, cookieName, body, eye, mouth);

        cookieRepository.save(cookie);

        return cookie;
    }

    @Transactional
    public void modify(Long cookieId, String cookieName) {

        Cookie cookie = cookieRepository.findById(cookieId)
                .orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));

        cookie.changeName(cookieName);
    }

    public boolean checkMember(Member member, Long cookieId) {
        Cookie cookie = null;
        cookie = cookieRepository.findByIdAndMember(cookieId, member);

        if (cookie == null) {
            return false;
        }

        return true;
    }

    public String uploadBody(MultipartFile image, int stage) {
        String url = awsS3Service.uploadImageToS3(image);

        bodyRepository.save(Body.builder()
                        .stage(stage)
                        .image(url)
                        .build());

        return url;
    }

    public String uploadEye(MultipartFile image) {
        String url = awsS3Service.uploadImageToS3(image);

        eyeRepository.save(Eye.builder()
                .image(url)
                .build());

        return url;
    }

    public String uploadMouth(MultipartFile image) {
        String url = awsS3Service.uploadImageToS3(image);

        mouthRepository.save(Mouth.builder()
                .image(url)
                .build());

        return url;
    }

    @Transactional
    public List<CookieResponse> cookieList(Member member) {

        List<Cookie> cookies = cookieRepository.findAllByMemberAndActive(member, 0);

        List<CookieResponse> cookieResponses = new ArrayList<>();
        for (Cookie cookie:cookies) {
            System.out.println("3 " + cookie);
            CookieResponse cookieResponse = new CookieResponse(cookie);
            cookieResponses.add(cookieResponse);
        }

        return cookieResponses;
    }
}