package com.a504.qookie.domain.badge.service;

import com.a504.qookie.domain.badge.dto.BadgeUploadRequest;
import com.a504.qookie.domain.badge.entity.Badge;
import com.a504.qookie.domain.badge.repository.BadgeRepository;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final AwsS3Service awsS3Service;

    public void upload(BadgeUploadRequest badgeUploadRequest, MultipartFile image) {

        String url = awsS3Service.uploadImageToS3(image);

        badgeRepository.save(new Badge(badgeUploadRequest, url));
    }
}