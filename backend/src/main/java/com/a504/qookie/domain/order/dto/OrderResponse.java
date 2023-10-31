package com.a504.qookie.domain.order.dto;

import java.time.LocalDateTime;

public record OrderResponse(
        String name,
        int price,
        LocalDateTime createdAt
) {

}
