package com.a504.qookie.domain.cookie.dto;

import com.a504.qookie.domain.cookie.entity.Eye;
import com.a504.qookie.domain.cookie.entity.Mouth;
import java.util.List;

public record FaceResponse(
    List<Eye> eyes,
    List<Mouth> mouths
) {

    public FaceResponse(List<Eye> eyes, List<Mouth> mouths) {
        this.eyes = eyes;
        this.mouths = mouths;
    }
}
