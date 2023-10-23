package com.a504.qookie.global.response;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseResponse {
    public static ResponseEntity<?> ok(HttpStatus status, String msg) {
        return ResponseEntity.status(status).body(new SuccessResponse(msg));
    }

    public static ResponseEntity<?> okWithHeadersAndData(
            HttpStatus status, String msg, HttpHeaders httpHeaders, Object payload) {
        return ResponseEntity.status(status).headers(httpHeaders)
                .body(new SuccessResponse(msg, payload));
    }
    public static ResponseEntity<?> okWithHeaders(
            HttpStatus status, String msg, HttpHeaders httpHeaders) {
        return ResponseEntity.status(status).headers(httpHeaders)
                .body(new SuccessResponse(msg));
    }

    public static ResponseEntity<?> okWithData(HttpStatus status, String msg, Object payload) {
        return ResponseEntity.status(status).body(new SuccessResponse(msg, payload));
    }

    public static ResponseEntity<?> fail(HttpStatus status, String msg) {
        return ResponseEntity.status(status).body(new FailResponse(status.getReasonPhrase(), msg));
    }
}
