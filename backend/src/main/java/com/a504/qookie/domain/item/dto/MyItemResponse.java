package com.a504.qookie.domain.item.dto;

import com.a504.qookie.domain.item.entity.Item;

public record MyItemResponse(
        Long id,
        String name,
        String media,
        Boolean isWear
) {
    public MyItemResponse(Item item, Boolean isWear) {
        this(item.getId(), item.getName(), item.getMedia(), isWear);
    }
}
