package com.a504.qookie.domain.item.dto;

import com.a504.qookie.domain.item.entity.Item;

public record MyItemResponse(
        Long id,
        String name,
        String media
) {
    public MyItemResponse(Item item) {
        this(item.getId(), item.getName(), item.getMedia());
    }
}
