package com.a504.qookie.domain.order.service;

import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.item.repository.ItemRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberItem;
import com.a504.qookie.domain.member.repository.MemberItemRepository;
import com.a504.qookie.domain.order.dto.OrderItemRequest;
import com.a504.qookie.domain.order.dto.OrderRequest;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ItemRepository itemRepository;
    private final MemberItemRepository memberItemRepository;

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

            memberItemRepository.save(MemberItem.builder()
                    .member(member)
                    .item(item)
                    .price(item.getPrice())
                    .createdAt(LocalDateTime.now())
                    .build());
        }

        return true;
    }
}