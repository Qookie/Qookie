package com.a504.qookie.domain.item.dto;

import java.util.List;

public record OrderRequest(
        List<OrderItemRequest> items
) {

}
