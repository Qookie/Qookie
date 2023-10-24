package com.a504.qookie.domain.quest.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AwsS3Service {
	private final AmazonS3 s3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	@Value("${cloud.aws.prefix.url}")
	private String prefix;

	public String uploadImageToS3(MultipartFile cover){ // 이미지를 S3에 업로드
		String fileName = uploadImage(cover);
		return prefix + fileName;
	}

	public String uploadImage(MultipartFile cover){
		String fileExtension = getFileExtension(cover.getOriginalFilename());
		// 업로드된 파일의 MIME 타입
		String mimeType = cover.getContentType();

		// 이미지 파일인지 확인
		if (!isImageFile(fileExtension, mimeType)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미지 파일만 업로드 가능합니다.");
		}
		String fileName = createFileName(cover.getOriginalFilename());
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(cover.getSize());
		objectMetadata.setContentType(cover.getContentType());

		try (InputStream inputStream = cover.getInputStream()) {
			s3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "사진 업로드에 실패했습니다.");
		}
		return fileName;
	}

	// 파일의 확장자 갖고오기, 확장자가 없는 파일이면 Exception
	private String getFileExtension(String fileName) {
		try {
			return fileName.substring(fileName.lastIndexOf("."));
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}

	/// 랜덤파일이름으로 바꾸기
	private String createFileName(String fileName) {
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}

	// 이미지 파일인지 확인하는 메서드
	private boolean isImageFile(String fileExtension, String mimeType) {
		List<String> allowedExtensions = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".bmp", "tiff", ".tif", "webp",
			"svg");
		List<String> allowedMimeTypes = Arrays.asList("image/jpeg", "image/png", "image/gif");
		return allowedExtensions.contains(fileExtension.toLowerCase()) && allowedMimeTypes.contains(mimeType);
	}

}
