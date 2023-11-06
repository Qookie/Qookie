package com.a504.qookie.domain.item.serivce;

import com.a504.qookie.domain.item.dto.ItemResponse;
import com.a504.qookie.domain.item.dto.ItemUploadRequest;
import com.a504.qookie.domain.item.dto.MyItemResponse;
import com.a504.qookie.domain.item.dto.OrderItemRequest;
import com.a504.qookie.domain.item.dto.OrderListRequest;
import com.a504.qookie.domain.item.dto.OrderRequest;
import com.a504.qookie.domain.item.dto.OrderResponse;
import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.item.repository.ItemRepository;
import com.a504.qookie.domain.member.entity.History;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberItem;
import com.a504.qookie.domain.member.repository.HistoryRepository;
import com.a504.qookie.domain.member.repository.MemberItemRepository;
import com.a504.qookie.domain.member.repository.MemberRepository;
import com.a504.qookie.domain.quest.service.AwsS3Service;
import com.a504.qookie.domain.quest.service.QuestService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
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
    private final MemberRepository memberRepository;
    private final QuestService questService;
    private final HistoryRepository historyRepository;

    private static final Long BASE_BACKGROUND_ID = 2L;
    private static final Long NO_WEAR_ITEM_ID = 1L;

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

            // 이미 구매한 상품이라면 리스트에서 빼기
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

    public List<MyItemResponse>[] myItem(Member member) {

        List<MyItemResponse>[] lists = new ArrayList[6];
        // 0:배경, 1:모자, 2:신발, 3:하의, 4:상의, 5:액세서리

        for (int i = 0; i < 6; i++) {
            lists[i] = new ArrayList<>();
        }

        Item background = itemRepository.findById(BASE_BACKGROUND_ID)
                .orElseThrow(() -> new IllegalArgumentException("기본 배경이 없습니다"));

        lists[0].add(new MyItemResponse(background));

        Item noWearItem = itemRepository.findById(NO_WEAR_ITEM_ID)
                .orElseThrow(() -> new IllegalArgumentException("기본 배경이 없습니다"));

        for (int i = 1; i < 6; i++) {
            lists[i].add(new MyItemResponse(noWearItem));
        }

        List<MemberItem> memberItemList = memberItemRepository.findByMember(member);

        for (MemberItem memberItem:memberItemList) {
            Item item = itemRepository.findById(memberItem.getItem().getId())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 없습니다"));

            if (item.getCategory().equals("배경")) {
                lists[0].add(new MyItemResponse(item));
            } else if (item.getCategory().equals("모자")) {
                lists[1].add(new MyItemResponse(item));
            } else if (item.getCategory().equals("신발")) {
                lists[2].add(new MyItemResponse(item));
            } else if (item.getCategory().equals("하의")) {
                lists[3].add(new MyItemResponse(item));
            } else if (item.getCategory().equals("상의")) {
                lists[4].add(new MyItemResponse(item));
            } else if (item.getCategory().equals("액세서리")) {
                lists[5].add(new MyItemResponse(item));
            }
        }

        return lists;
    }

    @Transactional
    public boolean buy(OrderRequest orderRequest, Member member) {

        // 가격 검증
        int total = 0;
        for (OrderItemRequest orderItemRequest:orderRequest.items()) {
            Item item = itemRepository.findById(orderItemRequest.itemId())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 없습니다"));
            total += item.getPrice();
        }

        if (member.getPoint() < total) {
            return false;
        }

        for (OrderItemRequest orderItemRequest:orderRequest.items()) {
            Item item = itemRepository.findById(orderItemRequest.itemId())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 없습니다"));

            if (item.getIsNew()) {
                questService.checkChallenge(member, "BUY_NEW");
            }

            memberItemRepository.save(MemberItem.builder()
                    .member(member)
                    .item(item)
                    .createdAt(LocalDateTime.now())
                    .build());
            historyRepository.save(
                History.builder()
                    .member(member)
                    .message("아이템 구매")
                    .cost(-item.getPrice())
                    .build());
        }

        member.buy(total);
        memberRepository.save(member);

        return true;
    }

    public List<OrderResponse> orderList(OrderListRequest orderListRequest, Member member) {

        return itemRepository.findMemberItemByMonthAndMember(orderListRequest.time(), member);
    }
}