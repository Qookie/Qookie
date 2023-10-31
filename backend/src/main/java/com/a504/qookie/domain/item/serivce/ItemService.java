package com.a504.qookie.domain.item.serivce;

import com.a504.qookie.domain.item.dto.ItemResponse;
import com.a504.qookie.domain.item.dto.ItemUploadRequest;
import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.item.repository.ItemRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.repository.MemberItemRepository;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final AwsS3Service awsS3Service;
    private final ItemRepository itemRepository;
    private final MemberItemRepository memberItemRepository;

    public String upload(ItemUploadRequest itemUploadRequest, MultipartFile image) {
        String url = awsS3Service.uploadImageToS3(image);

        itemRepository.save(Item.builder()
                .media(url)
                .name(itemUploadRequest.name())
                .price(itemUploadRequest.price())
                .isNew(true)
                .category(itemUploadRequest.category())
                .build());

        return url;
    }

    public List<ItemResponse>[] list(Member member) {

        List<ItemResponse>[] lists = new ArrayList[7];
        // 0:배경, 1:신상, 2:모자, 3:신발, 4:하의, 5:상의, 6:액세서리

        for (int i = 0; i < 7; i++) {
            lists[i] = new ArrayList<>();
        }
        List<Item> itemList = itemRepository.findAll();

        for (Item item:itemList) {

            if (memberItemRepository.existsByMemberAndItem(member, item)) {
                continue;
            }

            ItemResponse itemResponse = new ItemResponse(item);

            // 신상 넣기
            if (item.getIsNew()) {
                lists[1].add(itemResponse);
            }

            if (item.getCategory().equals("배경")) {
                lists[0].add(itemResponse);
            } else if (item.getCategory().equals("모자")) {
                lists[2].add(itemResponse);
            } else if (item.getCategory().equals("신발")) {
                lists[3].add(itemResponse);
            } else if (item.getCategory().equals("하의")) {
                lists[4].add(itemResponse);
            } else if (item.getCategory().equals("상의")) {
                lists[5].add(itemResponse);
            } else if (item.getCategory().equals("액세서리")) {
                lists[6].add(itemResponse);
            }
        }

        return lists;
    }
}