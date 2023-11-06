package com.a504.qookie.domain.item.dto;

import java.util.List;

public record ItemWearRequest(
        Long hatId,
        Long topId,
        Long bottomId,
        Long shoeId,
        Long backgroundId,
        List<Long> accessories
) {

}
