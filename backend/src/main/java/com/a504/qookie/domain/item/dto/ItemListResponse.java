package com.a504.qookie.domain.item.dto;

import java.util.List;

public record ItemListResponse(
        List<ItemResponse> background,
        List<ItemResponse> hat,
        List<ItemResponse> shoe,
        List<ItemResponse> bottom,
        List<ItemResponse> top,
        List<ItemResponse> accessories
) {

}
