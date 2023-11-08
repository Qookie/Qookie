package com.a504.qookie.domain.item.dto;

import com.a504.qookie.domain.item.entity.Item;

public record ItemResponse(
        Long id,
        String name,
        String media,
        String thumbnail,
        int price,
        Boolean isNew
) {
    public ItemResponse(Item item) {
        this(item.getId(), item.getName(), item.getMedia(), item.getThumbnail(), item.getPrice(), item.getIsNew());
    }
}
