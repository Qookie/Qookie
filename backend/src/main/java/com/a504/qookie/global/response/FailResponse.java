package com.a504.qookie.global.response;

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
