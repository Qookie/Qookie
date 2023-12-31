package com.a504.qookie.domain.item.controller;

import com.a504.qookie.domain.item.dto.ItemListResponse;
import com.a504.qookie.domain.item.dto.ItemUploadRequest;
import com.a504.qookie.domain.item.dto.ItemWearRequest;
import com.a504.qookie.domain.item.dto.MyItemListResponse;
import com.a504.qookie.domain.item.dto.OrderRequest;
import com.a504.qookie.domain.item.dto.OrderResponse;
import com.a504.qookie.domain.item.serivce.ItemService;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            ItemUploadRequest itemUploadRequest,
            @RequestPart(value = "image") MultipartFile image,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail) {

        String url = itemService.upload(itemUploadRequest, image, thumbnail);

        return BaseResponse.okWithData(HttpStatus.OK, "item upload OK", url);
    }

    @GetMapping("/list")
    public ResponseEntity<?> list(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails
    ) {

        ItemListResponse list = itemService.list(customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "item list OK", list);
    }

    @GetMapping("/myItem")
    public ResponseEntity<?> myItem(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails
    ) {

        MyItemListResponse list = itemService.myItem(customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "my item list OK", list);
    }

    @PostMapping("/order")
    public ResponseEntity<?> buy(
            @RequestBody OrderRequest orderRequest,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        if (!itemService.buy(orderRequest, customMemberDetails.getMember())) {
            return BaseResponse.fail(HttpStatus.BAD_REQUEST, "no money");
        }

        return BaseResponse.ok(HttpStatus.OK, "item order OK");
    }

    @GetMapping("/order/list/{year}/{month}")
    public ResponseEntity<?> orderList(
            @PathVariable String year,
            @PathVariable String month,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        List<OrderResponse> orderResponses = itemService.orderList(year, month, customMemberDetails.getMember());

        return BaseResponse.okWithData(HttpStatus.OK, "item order list OK", orderResponses);
    }

    @PatchMapping("/wear")
    public ResponseEntity<?> wear(
            @RequestBody ItemWearRequest itemWearRequest,
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails) {

        itemService.wear(itemWearRequest, customMemberDetails.getMember());

        return BaseResponse.ok(HttpStatus.OK, "item wear OK");
    }
    @GetMapping("/coin")
    public ResponseEntity<?> getCoin(
        @AuthenticationPrincipal CustomMemberDetails customMemberDetails
    ){
        return BaseResponse.okWithData(HttpStatus.OK, "현재 코인", customMemberDetails.getMember().getPoint());
    }
 }
