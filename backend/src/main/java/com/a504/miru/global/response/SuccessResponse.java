package com.a504.miru.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
