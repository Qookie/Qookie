package com.a504.qookie.domain.item.serivce;

import com.a504.qookie.domain.item.dto.ItemUploadRequest;
import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.item.repository.ItemRepository;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final AwsS3Service awsS3Service;
    private final ItemRepository itemRepository;

    public String upload(ItemUploadRequest itemUploadRequest, MultipartFile image) {
        String url = awsS3Service.uploadImageToS3(image);

        itemRepository.save(Item.builder()
                .media(url)
                .name(itemUploadRequest.name())
                .price(itemUploadRequest.price())
                .build());

        return url;
    }
}