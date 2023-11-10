package com.a504.qookie.domain.item.dto;

import java.util.List;

public record MyItemListResponse(
        List<MyItemResponse> background,
        List<MyItemResponse> hat,
        List<MyItemResponse> shoe,
        List<MyItemResponse> bottom,
        List<MyItemResponse> top,
        List<MyItemResponse> accessaries
) {

}
