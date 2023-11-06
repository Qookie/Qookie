package com.a504.qookie.domain.item.dto;

public record ItemWearRequest(
        Long hatId,
        Long topId,
        Long bottomId,
        Long shoeId,
        Long backgroundId
) {

}
