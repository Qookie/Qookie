package com.a504.qookie.domain.item.serivce;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.item.dto.ItemResponse;
import com.a504.qookie.domain.item.dto.ItemUploadRequest;
import com.a504.qookie.domain.item.dto.ItemWearRequest;
import com.a504.qookie.domain.item.dto.MyItemResponse;
import com.a504.qookie.domain.item.dto.OrderItemRequest;
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
import org.springframework.data.redis.core.RedisTemplate;
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
    private final CookieRepository cookieRepository;
    private final RedisTemplate<String, String> template;

    private static final Long BASE_BACKGROUND_ID = 2L;
    private static final Long NO_WEAR_ITEM_ID = 1L;

    @Transactional
    public String upload(ItemUploadRequest itemUploadRequest, MultipartFile image, MultipartFile thumbnail) {
        String imageUrl = awsS3Service.uploadImageToS3(image);
        String thumbnailUrl = imageUrl;
        if (thumbnail != null) {
            thumbnailUrl = awsS3Service.uploadImageToS3(thumbnail);
        }

        itemRepository.save(Item.builder()
                .media(imageUrl)
                .thumbnail(thumbnailUrl)
                .name(itemUploadRequest.name())
                .price(itemUploadRequest.price())
                .isNew(true)
                .category(itemUploadRequest.category())
                .build());

        return imageUrl;
    }

    public List<ItemResponse>[] list(Member member) {

        List<ItemResponse>[] lists = new ArrayList[6];
        // 0:배경, 1:모자, 2:신발, 3:하의, 4:상의, 5:액세서리

        for (int i = 0; i < 6; i++) {
            lists[i] = new ArrayList<>();
        }
        List<Item> itemList = itemRepository.findAll();

        for (Item item:itemList) {

            //기본 배경화면은 빼기
            if (item.getId().equals(BASE_BACKGROUND_ID))
                continue;

            // 이미 구매한 상품이라면 리스트에서 빼기
            if (memberItemRepository.existsByMemberAndItem(member, item)) {
                continue;
            }

            ItemResponse itemResponse = new ItemResponse(item);

            if (item.getCategory().equals("배경")) {
                lists[0].add(itemResponse);
            } else if (item.getCategory().equals("모자")) {
                lists[1].add(itemResponse);
            } else if (item.getCategory().equals("신발")) {
                lists[2].add(itemResponse);
            } else if (item.getCategory().equals("하의")) {
                lists[3].add(itemResponse);
            } else if (item.getCategory().equals("상의")) {
                lists[4].add(itemResponse);
            } else if (item.getCategory().equals("액세서리")) {
                lists[5].add(itemResponse);
            }
        }

        return lists;
    }

    public List<MyItemResponse>[] myItem(Member member) {

        Cookie cookie = cookieRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));

        List<MyItemResponse>[] lists = new ArrayList[6];
        // 0:배경, 1:모자, 2:신발, 3:하의, 4:상의, 5:액세서리

        for (int i = 0; i < 6; i++) {
            lists[i] = new ArrayList<>();
        }

        // 액세서리 List 찾아놓기
        String accessories_key =
                member.getId() + ":accessories"; // (유저PK):accessories
        List<Long> accessoriesList = template.opsForList().range(accessories_key, 0, -1)
                .stream().map(Long::valueOf).toList();

        if (accessoriesList.isEmpty()) {
            System.out.println("isEmpty");
        }

        Item baseBackground = itemRepository.findById(BASE_BACKGROUND_ID)
                .orElseThrow(() -> new IllegalArgumentException("기본 배경이 없습니다"));

        boolean isWear = false;
        if (baseBackground.getId().equals(cookie.getBackground().getId())) {
            System.out.println("기본배경과 같음");
            isWear = true;
        }

        lists[0].add(new MyItemResponse(baseBackground, isWear));

        // "착용하지 않음" 아이템을 착용했는지 알아보기
        Item noWearItem = itemRepository.findById(NO_WEAR_ITEM_ID)
                .orElseThrow(() -> new IllegalArgumentException("기본 배경이 없습니다"));

        for (int i = 1; i < 6; i++) {
            isWear = false;
            switch (i) {
                case 1:
                    if (noWearItem.getId().equals(cookie.getHat().getId())) {
                        isWear = true;
                    }
                    break;
                case 2:
                    if (noWearItem.getId().equals(cookie.getShoe().getId())) {
                        isWear = true;
                    }
                    break;
                case 3:
                    if (noWearItem.getId().equals(cookie.getBottom().getId())) {
                        isWear = true;
                    }
                    break;
                case 4:
                    if (noWearItem.getId().equals(cookie.getTop().getId())) {
                        isWear = true;
                    }
                    break;
                case 5:
                    if (accessoriesList.isEmpty()) {
                        isWear = true;
                    }
                    break;
            }
            lists[i].add(new MyItemResponse(noWearItem, isWear));
        }

        List<MemberItem> memberItemList = memberItemRepository.findByMember(member);

        for (MemberItem memberItem:memberItemList) {
            Item item = itemRepository.findById(memberItem.getItem().getId())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 없습니다"));

            if (item.getCategory().equals("배경")) {
                if (item.getId().equals(cookie.getBackground().getId())) {
                    lists[0].add(new MyItemResponse(item, true));
                    continue;
                }
                lists[0].add(new MyItemResponse(item, false));
            } else if (item.getCategory().equals("모자")) {
                if (item.getId().equals(cookie.getHat().getId())) {
                    lists[1].add(new MyItemResponse(item, true));
                    continue;
                }
                lists[1].add(new MyItemResponse(item, false));
            } else if (item.getCategory().equals("신발")) {
                if (item.getId().equals(cookie.getShoe().getId())) {
                    lists[2].add(new MyItemResponse(item, true));
                    continue;
                }
                lists[2].add(new MyItemResponse(item, false));
            } else if (item.getCategory().equals("하의")) {
                if (item.getId().equals(cookie.getBottom().getId())) {
                    lists[3].add(new MyItemResponse(item, true));
                    continue;
                }
                lists[3].add(new MyItemResponse(item, false));
            } else if (item.getCategory().equals("상의")) {
                if (item.getId().equals(cookie.getTop().getId())) {
                    lists[4].add(new MyItemResponse(item, true));
                    continue;
                }
                lists[4].add(new MyItemResponse(item, false));
            } else if (item.getCategory().equals("액세서리")) {
                boolean find = false;
                for (Long accId:accessoriesList) {
                    if (item.getId().equals(accId)) {
                        find = true;
                        break;
                    }
                }
                lists[5].add(new MyItemResponse(item, find));
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

    public List<OrderResponse> orderList(String year, String month, Member member) {

        return itemRepository.findMemberItemByMonthAndMember(year + "-" + month, member);
    }

    @Transactional
    public void wear(ItemWearRequest itemWearRequest, Member member) {
        
        Cookie cookie = cookieRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("쿠키가 없습니다"));

        Item hat = itemRepository.findById(itemWearRequest.hatId())
                .orElseThrow(() -> new IllegalArgumentException("맞는 모자가 없습니다"));

        Item top = itemRepository.findById(itemWearRequest.topId())
                .orElseThrow(() -> new IllegalArgumentException("맞는 상의가 없습니다"));

        Item bottom = itemRepository.findById(itemWearRequest.bottomId())
                .orElseThrow(() -> new IllegalArgumentException("맞는 하의가 없습니다"));

        Item shoe = itemRepository.findById(itemWearRequest.shoeId())
                .orElseThrow(() -> new IllegalArgumentException("맞는 신발이 없습니다"));

        Item background = itemRepository.findById(itemWearRequest.backgroundId())
                .orElseThrow(() -> new IllegalArgumentException("맞는 배경이 없습니다"));

        cookie.setItem(hat, top, bottom, shoe, background);

        String accessories_key =
                member.getId() + ":accessories"; // (유저PK):accessories

        template.delete(accessories_key);
        template.opsForList().rightPushAll(accessories_key,
                itemWearRequest.accessories().stream().map(String::valueOf).toList());

    }
}