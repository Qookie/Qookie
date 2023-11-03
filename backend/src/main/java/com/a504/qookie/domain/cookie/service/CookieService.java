package com.a504.qookie.domain.cookie.service;

import com.a504.qookie.domain.cookie.dto.CookieCollectionResponse;
import com.a504.qookie.domain.cookie.dto.CookieResponse;
import com.a504.qookie.domain.cookie.dto.FaceResponse;
import com.a504.qookie.domain.cookie.entity.Body;
import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.entity.CookieCollection;
import com.a504.qookie.domain.cookie.entity.Eye;
import com.a504.qookie.domain.cookie.entity.Mouth;
import com.a504.qookie.domain.cookie.repository.BodyRepository;
import com.a504.qookie.domain.cookie.repository.CookieCollectionRepository;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.cookie.repository.EyeRepository;
import com.a504.qookie.domain.cookie.repository.MouthRepository;
import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.item.repository.ItemRepository;
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
    private final CookieCollectionRepository cookieCollectionRepository;
    private final BodyRepository bodyRepository;
    private final EyeRepository eyeRepository;
    private final MouthRepository mouthRepository;
    private final AwsS3Service awsS3Service;
    private final ItemRepository itemRepository;

    private static final Long BASE_BACKGROUND_ID = 2L;

    @Transactional
    public CookieResponse create(Member member, String cookieName, Long eyeId, Long mouthId) throws IllegalArgumentException {

        if (cookieRepository.existsByMember(member)) {
            throw new IllegalArgumentException("쿠키가 이미 있습니다");
        }

        Body body = bodyRepository.findByStage(1)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 몸이 없습니다"));

        Eye eye = eyeRepository.findById(eyeId)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 눈이 없습니다"));

        Mouth mouth = mouthRepository.findById(mouthId)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 입이 없습니다"));

        Item background = itemRepository.findById(BASE_BACKGROUND_ID)
                .orElseThrow(() -> new IllegalArgumentException("기본 배경이 없습니다"));

        Item noItem = itemRepository.findById(1L)
                .orElseThrow(() -> new IllegalArgumentException("\"착용하지 않음\" 아이템이 없습니다"));

        Cookie cookie = Cookie.createCookie(member, cookieName, body, eye, mouth, background, noItem);

        cookieRepository.save(cookie);

        return new CookieResponse(cookie, cookie.getBody().getImage(), null);
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
    public List<CookieCollectionResponse> cookieCollectionList(Member member) {

        List<CookieCollection> cookieCollections = cookieCollectionRepository.findAllByMember(member);

        List<CookieCollectionResponse> cookieCollectionResponses = new ArrayList<>();
        for (CookieCollection cookieCollection:cookieCollections) {
            System.out.println("cookieCollection :  " + cookieCollection);
            CookieCollectionResponse cookieCollectionResponse = new CookieCollectionResponse(cookieCollection);
            cookieCollectionResponses.add(cookieCollectionResponse);
        }

        return cookieCollectionResponses;
    }

    @Transactional
    public FaceResponse eyeAndMouthList() {
        List<Eye> eyes = eyeRepository.findAll();
        List<Mouth> mouths = mouthRepository.findAll();

        return new FaceResponse(eyes, mouths);
    }

    @Transactional
    public CookieResponse getInfo(Member member) throws IllegalArgumentException{

        Cookie cookie = cookieRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));

        if (cookie.getBackground().getId() == 1L)
            cookie.setBackground(itemRepository.findById(BASE_BACKGROUND_ID)
                    .orElseThrow(() -> new IllegalArgumentException("기본 배경이 없습니다")));

        if (5 <= cookie.getLevel() && cookie.getLevel() <= 9) {
            String stage1BodyImage = bodyRepository.findByStage(1)
                    .orElseThrow(() -> new IllegalArgumentException("몸통이 없습니다"))
                    .getImage();

            return new CookieResponse(cookie, stage1BodyImage, cookie.getBody().getImage());

        }
        return new CookieResponse(cookie, cookie.getBody().getImage(), null);
    }

    @Transactional
    public void bake(MultipartFile image, Member member) {

        String url = awsS3Service.uploadImageToS3(image);

        Cookie cookie = cookieRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));

        cookieCollectionRepository.save(new CookieCollection(member, cookie, url));

        cookieRepository.delete(cookie);
    }
}