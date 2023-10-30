package com.a504.qookie.domain.item.controller;

import com.a504.qookie.domain.item.dto.ItemResponse;
import com.a504.qookie.domain.item.dto.ItemUploadRequest;
import com.a504.qookie.domain.item.serivce.ItemService;
import com.a504.qookie.global.response.BaseResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
            @RequestPart(value = "image") MultipartFile image) {

        String url = itemService.upload(itemUploadRequest, image);

        return BaseResponse.okWithData(HttpStatus.OK, "item upload OK", url);
    }

    @GetMapping("/list")
    public ResponseEntity<?> list() {

        List<ItemResponse>[] list = itemService.list();

        return BaseResponse.okWithData(HttpStatus.OK, "item list OK", list);
    }
}
