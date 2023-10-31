package com.a504.qookie.domain.order.dto;

import java.util.List;

public record OrderRequest(
        List<OrderItemRequest> items
) {

}
