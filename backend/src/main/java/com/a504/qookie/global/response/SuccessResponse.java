package com.a504.qookie.global.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessResponse {
    private String msg;
    private Object payload;
    public SuccessResponse(String m, Object p) {
        msg = m;
        payload = p;
    }

    public SuccessResponse(String m) {
        msg = m;
    }
}
