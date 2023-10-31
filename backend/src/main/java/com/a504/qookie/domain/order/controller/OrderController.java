package com.a504.qookie.domain.order.controller;

import com.a504.qookie.domain.order.dto.OrderRequest;
import com.a504.qookie.domain.order.service.OrderService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/item")
    public ResponseEntity<?> buy(
            @RequestBody OrderRequest orderRequest,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        if (!orderService.buy(orderRequest, customMemberDetails.getMember())) {
            return BaseResponse.fail(HttpStatus.BAD_REQUEST, "no money");
        }

        return BaseResponse.ok(HttpStatus.OK, "order OK");
    }
}
