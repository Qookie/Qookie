package com.a504.miru.global.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FailResponse {
    private String msg;

    public FailResponse(String reason, String m) {
        msg = reason + ": " + m;
    }
}
